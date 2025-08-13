import { Alert, Button, Form, Input, Modal, type FormProps } from "antd";
import { APPLY_MODAL_INITIAL_VALUES, APPLY_MODAL_TEXT_INFO } from "./constants";
import type { IApplyModalForm } from "./types";
import type { IVacancy } from "../../../entities/vacancy/types";
import styles from "./index.module.scss";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";

export interface ApplyModalProps {
  open: boolean;
  vacancy?: IVacancy | null;
  onCancel: () => void;
}
export const ApplyModal = ({ open, vacancy, onCancel }: ApplyModalProps) => {
  const [form] = useForm<IApplyModalForm>();

  const subjectVal = Form.useWatch("subject", form);
  const bodyVal = Form.useWatch("body", form);

  const subject = encodeURIComponent(subjectVal ?? "");
  const body = encodeURIComponent((bodyVal ?? "").replace(/\n/g, "\r\n"));

  const onFinishFailed: FormProps<IApplyModalForm>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    form.setFieldsValue(
      APPLY_MODAL_INITIAL_VALUES(vacancy?.title ?? "", vacancy?.link ?? "")
    );
  }, [vacancy]);

  return (
    <Modal
      title="Письмо для отклика"
      open={open}
      onCancel={onCancel}
      footer={() => (
        <div className={styles.actions}>
          <Button onClick={() => form.resetFields()}>Сбросить</Button>
          <Button disabled={!vacancy?.contacts?.email}>
            <a
              href={`mailto:${vacancy?.contacts?.email}?subject=${subject}&body=${body}`}
            >
              Откликнуться
            </a>
          </Button>
        </div>
      )}
    >
      <Form
        name="apply-modal"
        form={form}
        initialValues={APPLY_MODAL_INITIAL_VALUES(
          vacancy?.title ?? "",
          vacancy?.link ?? ""
        )}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item name="subject">
          <Input />
        </Form.Item>
        <Form.Item name="body">
          <Input.TextArea autoSize />
        </Form.Item>
      </Form>
      <Alert message={APPLY_MODAL_TEXT_INFO(vacancy?.contacts)} type="info" />
    </Modal>
  );
};
