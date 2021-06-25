import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import SearchProvider from "./store/SearchProvider";
import AuthProvider from "./store/AuthProvider";
import register from "./serviceWorkerRegistration";

const component = (
  <React.StrictMode>
    <SearchProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </SearchProvider>
  </React.StrictMode>
);

ReactDOM.render(component, document.getElementById("root"));
register();
