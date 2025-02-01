import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div style={{ maxWidth: "1280px", margin: "auto" }}>
      <App />
    </div>
  </StrictMode>
);
