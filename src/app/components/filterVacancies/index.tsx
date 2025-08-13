import { Card, Select } from "antd";
import styles from "./index.module.scss";

export const FilterVacancies = () => {
  return (
    <Card className={styles.card}>
      <Select
        options={["telegram", "phone", "email", "url"].map((item) => ({
          value: item,
          label: item,
        }))}
        placeholder="Контакты"
        mode="multiple"
        // onChange={}
      />
    </Card>
  );
};
