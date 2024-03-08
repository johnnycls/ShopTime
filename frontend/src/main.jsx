import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "primereact/resources/primereact.min.css";
import "./theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { Provider } from "react-redux";
import store from "./app/store";
import { BrowserRouter } from "react-router-dom";
import Router from "./app/Router";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

disableReactDevTools();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
