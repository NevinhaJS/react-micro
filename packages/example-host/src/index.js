import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { connector } from "react-micro-js";

const mountFn = (connect) => (containerId, dependencies) => {
  console.log("### INDEX POINT RE-RENDER", containerId);

  const root = ReactDOM.createRoot(document.getElementById(containerId));

  root.render(<App />);

  reportWebVitals();

  connect(root);
};

const host = connector(mountFn, {
  devRoot: "root",
  name: "MicroCar",
});

console.log(host.unmount);
