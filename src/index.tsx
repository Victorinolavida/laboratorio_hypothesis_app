import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import RouteApp from "./routers/RouteApp";
import { store } from "./state/store";
import "./sass/main.scss";
import "animate.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouteApp />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
