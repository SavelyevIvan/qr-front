import React from "react";
import { Button, Form, Input } from "antd";

export default function Login({ onSubmit }) {
  return (
    <Form name="auth" onFinish={(values) => onSubmit(values)}>
      <Form.Item
        label="Login"
        name="login"
        rules={[{ required: true, message: "Please input your login!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Go !
        </Button>
      </Form.Item>
    </Form>
  );
}
