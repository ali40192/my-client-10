import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import router from "./Routes/router.jsx";
import { RouterProvider } from "react-router";
import AuthProvider from "./Contexts/AuthProvider.jsx";
import { Bounce, ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </AuthProvider>
  </StrictMode>
);
