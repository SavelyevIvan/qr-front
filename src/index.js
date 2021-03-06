import React from "react";
import ReactDOM from "react-dom";

import App from "./Boots/App";
import reportWebVitals from "./reportWebVitals";

import "antd/dist/antd.css";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
