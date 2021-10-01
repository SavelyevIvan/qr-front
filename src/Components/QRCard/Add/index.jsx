import React, { useEffect, useState } from "react";

import { Button, Form, Input } from "antd";

import { CloseOutlined } from "@ant-design/icons";
import styles from "../QRCard.module.css";
import useRequest from "../../../Hooks/useRequest";
import QRService from "../../../Services/QRService";

import { ReactComponent as IconAdding } from "../../../Assets/Images/adding128*128.svg";

function AddQRButton({ getShorts }) {
  const [isTurned, turn] = useState(false);

  const {
    fetch: requestAddQR,
    state: { isLoading, payload: newShort },
  } = useRequest(QRService.create);

  const [form] = Form.useForm();
  const onTurn = () => {
    turn((state) => !state);
  };

  const onAddQR = (values) => {
    requestAddQR(values);
    form.resetFields();
    onTurn();
  };
  useEffect(() => {
    newShort && getShorts();
  }, [newShort]);

  return (
    <div className={styles.flipCard}>
      <div
        className={styles.flipCardInner}
        style={
          isTurned
            ? { transform: "rotateY(180deg)" }
            : { transform: "rotateY(360deg)" }
        }
      >
        <div
          className={styles.flipCardFront}
          onClick={onTurn}
          style={{ cursor: "pointer" }}
        >
          <IconAdding />
        </div>
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
            onFinish={onAddQR}
            layout="vertical"
            initialValues={{ type: "app" }}
          >
            <Form.Item
              label={<span className={styles.formAdd__label}>Name</span>}
              name="name"
              rules={[{ required: true, message: "Please input name!" }]}
            >
              <Input />
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
              rules={[
                { required: true, message: "Please input your fallback!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="type" hidden />

            <Form.Item>
              <Button htmlType="submit" style={{ marginTop: "20px" }}>
                Generate
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AddQRButton;
