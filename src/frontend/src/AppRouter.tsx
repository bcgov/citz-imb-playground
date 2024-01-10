import { ErrorBoundary, Loading } from "components/common";
import { PageLayout } from "components/layout/PageLayout";
import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Lazy loaded components.
const LandingPage = lazy(() => import("pages/LandingPage"));
const KeycloakPage = lazy(() => import("pages/KeycloakPage"));
const CSSAPIPage = lazy(() => import("pages/CSSAPIPage"));
const RichTextEditorPage = lazy(() => import("pages/RichTextEditorPage"));

const AppRouter = () => {
  // Load config when origin changes.
  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/config`);
      const configuration = await response.json();
      (window as Window).configuration = configuration;
    })();
  }, [window.location.origin]);

  return (
    <Router>
      <ErrorBoundary context="Routes">
        <PageLayout>
          <Routes>
            {/* LANDING PAGE */}
            <Route
              path="/"
              element={
                <Suspense fallback={<Loading />}>
                  <LandingPage />
                </Suspense>
              }
            />
            {/* KEYCLOAK PAGE */}
            <Route
              path="/keycloak"
              element={
                <Suspense fallback={<Loading />}>
                  <KeycloakPage />
                </Suspense>
              }
            />
            {/* CSS API PAGE */}
            <Route
              path="/cssapi"
              element={
                <Suspense fallback={<Loading />}>
                  <CSSAPIPage />
                </Suspense>
              }
            />
            {/* RICH TEXT EDITOR PAGE */}
            <Route
              path="/richtext"
              element={
                <Suspense fallback={<Loading />}>
                  <RichTextEditorPage />
                </Suspense>
              }
            />
          </Routes>
        </PageLayout>
      </ErrorBoundary>
    </Router>
  );
};

export default AppRouter;
