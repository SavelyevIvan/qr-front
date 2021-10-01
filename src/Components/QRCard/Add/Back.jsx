import React from "react";
import { Button, Form, Input, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import styles from "../QRCard.module.css";

const { Option } = Select;

export default function BackAdding({ onTurn, onEdit, onAdd, name, payload }) {
  const [form] = Form.useForm();

  const onTypeChange = (value) => {
    switch (value) {
      case "app":
        form.setFieldsValue({
          note: "App",
        });
        return;

      case "webApp":
        form.setFieldsValue({
          note: "webApp",
        });
        return;

      default:
        form.setFieldsValue({
          note: "App",
        });
    }
  };

  return (
    <div className={styles.flipCardBack}>
      <Button
        className={styles.closeBtn}
        type="text"
        onClick={onTurn}
        icon={<CloseOutlined style={{ color: "#FFFFFF" }} />}
      />
      <Form
        form={form}
        name="qrQard"
        onFinish={onEdit || onAdd}
        layout="vertical"
        initialValues={{ type: "app", name, ...payload }}
      >
        <Form.Item
          label={<span className={styles.formAdd__label}>Name</span>}
          name="name"
          rules={[{ required: true, message: "Please input name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="type"
          label={<span className={styles.formAdd__label}>Type</span>}
          rules={[{ required: true }]}
        >
          <Select style={{ width: "100%" }} onChange={onTypeChange}>
            <Option value="app">App</Option>
            <Option value="webApp">WebApp</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label={<span className={styles.formAdd__label}>Google play</span>}
          name="googlePlay"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={<span className={styles.formAdd__label}>App store</span>}
          name="appStore"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={<span className={styles.formAdd__label}>Fallback</span>}
          name="fallback"
          rules={[{ required: true, message: "Please input your fallback!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" style={{ marginTop: "20px" }}>
            {onEdit ? "Edit" : "Generate"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
