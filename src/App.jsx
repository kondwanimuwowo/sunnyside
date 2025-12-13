import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { UIProvider } from "./context/UIContext";
import { DonationProvider } from "./context/DonationContext";
import { NotificationProvider } from "./context/NotificationContext";
import ErrorBoundary from "./components/common/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <NotificationProvider>
        <UIProvider>
          <DonationProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </DonationProvider>
        </UIProvider>
      </NotificationProvider>
    </ErrorBoundary>
  );
}

export default App;
