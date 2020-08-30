import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const App = lazy(() => import("./components/App"));

ReactDOM.render(
  <Suspense fallback="Loading...">
    <App />
  </Suspense>,
  document.getElementById("app")
);
