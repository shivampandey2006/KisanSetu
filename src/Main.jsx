import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./Context/CartContext";

import App from "./App";
import { LanguageProvider } from "./Context/LanguageContext";

import "./index.css";


ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <BrowserRouter>

      <LanguageProvider>
  <CartProvider>
        <App />
</CartProvider>
      </LanguageProvider>

    </BrowserRouter>

  </React.StrictMode>
);