import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Route from "./routes/Route.tsx";

createRoot(document.getElementById("root")!).render(
 
    <GoogleOAuthProvider clientId="472902479167-andhl8f553i9e3dqh01isegcjudfsnfh.apps.googleusercontent.com">
      <Route />
    </GoogleOAuthProvider>
);
