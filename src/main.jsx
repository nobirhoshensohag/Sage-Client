import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router/router.jsx";
import AuthProvider from "./contexts/AuthContext/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
import ThemeProvider from "./contexts/AuthContext/ThemeContext/ThemeProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
       <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
      <Toaster />
    </AuthProvider>
  </StrictMode>
);