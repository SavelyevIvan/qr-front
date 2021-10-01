import React from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import UnprivateRoute from "./UnprivateRoute";

function getComponent(type) {
  if (type === "private") return PrivateRoute;
  if (type === "unprivate") return UnprivateRoute;
  return Route;
}

function RouteWithSubRoutes({ type, component: Component, path, routes }) {
  const RouteComponent = getComponent(type);

  return (
    <RouteComponent
      path={path}
      component={(props) => <Component {...props} routes={routes} />}
    />
  );
}

export default RouteWithSubRoutes;
