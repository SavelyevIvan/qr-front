import React, { useCallback } from "react";
import { Row, Tabs } from "antd";

import AuthService from "../../Services/AuthService";
import Login from "../../Components/Login";
import Register from "../../Components/Register";

const { TabPane } = Tabs;

export default function Passport() {
  const onLogin = useCallback((values) => {
    AuthService.login(values);
  });
  const onRegister = useCallback((values) => {
    AuthService.register(values);
  });

  return (
    <Row justify="center">
      <Tabs defaultActiveKey="login">
        <TabPane tab="Sing In" key="login">
          <Login onSubmit={onLogin} />
        </TabPane>
        <TabPane tab="Sing Up" key="register">
          <Register onSubmit={onRegister} />
        </TabPane>
      </Tabs>
    </Row>
  );
}
