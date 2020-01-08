import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { GithubProvider } from "./components/GithubProvider";
import { App } from "./components/App";
import "./index.css";

ReactDOM.render(
  <GithubProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GithubProvider>,
  document.getElementById("root")
);
