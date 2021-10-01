import React from "react";
import { Switch } from "react-router-dom";
import uuid from "react-uuid";

import RouteWithSubRoutes from "../../Boots/RouteWithSubRoutes";

function Layout({ routes }) {
  return (
    <div>
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={uuid()} {...route} />
        ))}
      </Switch>
    </div>
  );
}

export default Layout;
