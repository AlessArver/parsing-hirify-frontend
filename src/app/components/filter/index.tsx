import {
  Card,
  Form,
  Select,
  Button,
  type FormProps as AntdFormProps,
} from "antd";
import { useForm } from "antd/es/form/Form";

import {
  WORK_FORMATS,
  REMOTE_TYPES,
  GRAGE_TYPES,
  SPECIALIZATIONS,
  VACANCY_LANGUAGES,
} from "../../constants";
import styles from "./index.module.scss";
import type { IHirifyForm } from "./types";
import { HIRIFY_PARSER_FORM_INITIAL_VALUES } from "./constants";
import { useEffect } from "react";

export interface FilterProps {
  pages?: number;
  loading?: boolean;
  onSubmit: (payload: IHirifyForm) => void;
}

export const Filter = ({ pages=1, loading = false, onSubmit }: FilterProps) => {
  const [form] = useForm<IHirifyForm>();

  const onFinishFailed: AntdFormProps<IHirifyForm>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    console.log({ pages });
  }, [pages]);

  return (
    <Card className={styles.card}>
      <Form
        name="search-job-filter"
        form={form}
        initialValues={HIRIFY_PARSER_FORM_INITIAL_VALUES}
        onFinish={onSubmit}
        onFinishFailed={onFinishFailed}
        className={styles.form}
      >
        <div className={styles.formFields}>
          <Form.Item name="work_format" className={styles.formItem}>
            <Select
              options={WORK_FORMATS.map((item) => ({
                value: item,
                label: item,
              }))}
              placeholder="Форматы работы"
              mode="multiple"
            />
          </Form.Item>
          <Form.Item name="remote_type" className={styles.formItem}>
            <Select
              options={REMOTE_TYPES.map((item) => ({
                value: item,
                label: item,
              }))}
              placeholder="Тип удаленки"
              mode="multiple"
            />
          </Form.Item>
          <Form.Item name="grade" className={styles.formItem}>
            <Select
              options={GRAGE_TYPES.map((item) => ({
                value: item,
                label: item,
              }))}
              placeholder="Грейды"
              mode="multiple"
            />
          </Form.Item>
          <Form.Item name="specializations" className={styles.formItem}>
            <Select
              options={SPECIALIZATIONS.map((item) => ({
                value: item,
                label: item,
              }))}
              placeholder="Специализации"
              mode="multiple"
            />
          </Form.Item>
          <Form.Item name="vacancy_language" className={styles.formItem}>
            <Select
              options={VACANCY_LANGUAGES.map((item) => ({
                value: item,
                label: item,
              }))}
              placeholder="Язык вакансии"
              mode="multiple"
            />
          </Form.Item>
          <Form.Item name="page" className={styles.formItem}>
            <Select
              key={pages}
              options={Array.from({ length: pages }, (_, i) => ({
                value: i + 1,
                label: i + 1,
              }))}
            />
          </Form.Item>
        </div>

        <Button htmlType="submit" loading={loading}>
          Получить вакансии
        </Button>
      </Form>
    </Card>
  );
};
