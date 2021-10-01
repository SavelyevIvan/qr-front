import React, { useEffect, useState } from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import AuthService from "../../Services/AuthService";
import tokenService from "../../Services/TokenService";

const { Header } = Layout;

function MainHeader() {
  const onLogout = () => {
    AuthService.logout();
  };
  const [isLogged, setIsLogged] = useState(tokenService.isLogged);
  useEffect(() => {
    const listener = (newIsLogged) => {
      setIsLogged(newIsLogged);
    };

    tokenService.subscribe(listener);
    return () => {
      tokenService.unsubscribe(listener);
    };
  }, []);

  return (
    <Header>
      {isLogged && (
        <Button
          type="ghost"
          ghost
          onClick={onLogout}
          shape="circle"
          icon={<LogoutOutlined />}
        />
      )}
    </Header>
  );
}

export default MainHeader;
