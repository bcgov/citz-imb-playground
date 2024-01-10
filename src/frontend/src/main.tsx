import "css/base.css";

import { KeycloakProvider } from "@bcgov/citz-imb-kc-react";
import AppRouter from "AppRouter";
import React from "react";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <KeycloakProvider idpHint={"idir"}>
        <AppRouter />
    </KeycloakProvider>
  </React.StrictMode>
);
