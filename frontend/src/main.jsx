// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import "./utils/i18n.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SocketProvider } from "./redux/context/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <SocketProvider>
          <App />
        </SocketProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </Provider>,
  // </StrictMode>,
);
