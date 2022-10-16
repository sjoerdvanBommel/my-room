import { softShadows } from "@react-three/drei";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

softShadows();

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
