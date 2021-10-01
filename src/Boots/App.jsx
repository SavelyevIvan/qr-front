import React from "react";

import { Layout } from "antd";
import Routes from "./Routes";

import MainHeader from "../Components/Header";
import MainFooter from "../Components/Footer";

const { Content } = Layout;

function App() {
  return (
    <Layout style={{ height: "100vh" }}>
      <MainHeader />
      <Content>
        <Routes />
      </Content>
      <MainFooter />
    </Layout>
  );
}

export default App;
