import { createRoot } from "react-dom/client";
import React from "react";
//import { StrictMode } from "react";

import "./index.css";
import App from "./components/App/App";

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
