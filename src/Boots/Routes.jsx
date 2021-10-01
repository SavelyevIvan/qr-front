import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import uuid from "react-uuid";

import RouteWithSubRoutes from "./RouteWithSubRoutes";
import Layout from "../Components/Layout";
import Home from "../Pages/Home";
import Passport from "../Pages/Passport";

const routes = [
  {
    path: "/passport",
    type: "unprivate",
    component: Passport,
  },
  {
    path: "/",
    type: "private",
    component: Layout,
    routes: [
      {
        path: "/",
        exact: true,
        component: Home,
      },
    ],
  },
];

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={uuid()} {...route} />
        ))}
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
