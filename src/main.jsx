import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContexts.jsx";
import ModalContextProvider from "./contexts/ModalContexts.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ModalContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ModalContextProvider>
    </AuthProvider>
  </React.StrictMode>
);
