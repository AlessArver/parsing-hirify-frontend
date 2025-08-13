import { Button, Card, Typography } from "antd";

import styles from "./index.module.scss";
import type { IVacancy } from "../../../entities/vacancy/types";
import { ContactField } from "../contactField";

export interface VacancyCardProps extends IVacancy {
  onSetSelectedVacancy: () => void;
}
export const VacancyCard = ({
  link,
  title,
  company,
  contacts,
  salary,
  date,
  parsedAt,
  onSetSelectedVacancy,
}: VacancyCardProps) => {
  return (
    <Card className={styles.vacancy}>
      <Typography.Title level={3} className={styles.title}>
        <a href={link} target="_blank">
          {title}
        </a>
      </Typography.Title>{" "}
      {company && <Typography className={styles.company}>{company}</Typography>}
      {date && <Typography className={styles.date}>{date}</Typography>}
      {parsedAt && (
        <Typography className={styles.date}>
          {new Date(parsedAt).toDateString()}
          {new Date(parsedAt).toLocaleTimeString().replace("2025", "")}
        </Typography>
      )}
      {salary && (
        <Typography className={styles.salary}>
          {salary.amount} {salary.currency}
        </Typography>
      )}
      {contacts &&
        Object.entries(contacts).map(([key, value], index) => (
          <Typography key={`${key}-${value}-${index}`}>
            <ContactField label={key} value={value} />
          </Typography>
        ))}
      <Button onClick={onSetSelectedVacancy} className={styles.buttonApply}>
        Откликнуться
      </Button>
    </Card>
  );
};
