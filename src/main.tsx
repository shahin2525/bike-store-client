import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div style={{ maxWidth: "1280px", margin: "auto" }}>
      <RouterProvider router={router} />
    </div>
  </StrictMode>
);
