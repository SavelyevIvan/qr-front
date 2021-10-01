import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import tokenService from "../Services/TokenService";

function PrivateRoute({ component: Component, ...otherProps }) {
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
    <Route
      {...otherProps}
      render={(props) =>
        isLogged ? <Component {...props} /> : <Redirect to="/passport" />
      }
    />
  );
}

export default PrivateRoute;
