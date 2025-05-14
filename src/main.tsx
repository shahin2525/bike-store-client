import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div
          //  style={{ maxWidth: "1280px", margin: "auto" }}
          style={{
            // paddingLeft: "16px",
            // paddingRight: "16px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <RouterProvider router={router} />
        </div>
      </PersistGate>
    </Provider>
    <Toaster />
  </StrictMode>
);
