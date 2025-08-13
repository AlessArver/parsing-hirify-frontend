import { Select, Typography, type FormProps } from "antd";

import { Filter } from "./components/filter";
import type { IHirifyForm } from "./components/filter/types";

import styles from "./index.module.scss";
import { VacancyCard } from "./components/vacancyCard";
import { useState } from "react";
import { setVacancies, useVacanciesList } from "../entities/vacancy/model";
import { launchHirifyParsing } from "./api";
import { ApplyModal } from "./components/applyModal";
import type { IVacancy } from "../entities/vacancy/types";

function App() {
  const [page, setPage] = useState(1);
  const [pageSize, _] = useState(100);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState<number>(1);

  const [selectContacts, setSelectContacts] = useState<
    Array<keyof NonNullable<IVacancy["contacts"]>>
  >([]);

  const [selectedVacancy, setSelectedVacancy] = useState<IVacancy | null>(null);

  const { total, items: vacancies } = useVacanciesList({
    contactFilter: selectContacts,
    page,
    pageSize,
  });

  const handleSubmit: FormProps<IHirifyForm>["onFinish"] = async (payload) => {
    setLoading(true);
    try {
      const res = await launchHirifyParsing(payload);
      await setVacancies((prev) => [...(prev || []), ...res.vacancies]);
      setPages(res.pages);
      setPage(payload.page ?? 1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <ApplyModal
        open={!!selectedVacancy}
        vacancy={selectedVacancy}
        onCancel={() => setSelectedVacancy(null)}
      />
      <div className={styles.content}>
        <Filter pages={pages} loading={loading} onSubmit={handleSubmit} />
        <div>
          <div>
            <Select
              value={selectContacts}
              options={["telegram", "phone", "email", "url"].map((item) => ({
                value: item,
                label: item,
              }))}
              placeholder="Контакты"
              mode="multiple"
              className={styles.select}
              onChange={(value) => {
                setSelectContacts(value);
                setPage(1);
              }}
            />
          </div>{" "}
          <Typography.Text strong>Найдено: {total}</Typography.Text>
          <div className={styles.vacancies}>
            {vacancies.map((item, index) => (
              <VacancyCard
                key={`${item?.title}-${index}`}
                {...item}
                onSetSelectedVacancy={() => setSelectedVacancy(item)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
