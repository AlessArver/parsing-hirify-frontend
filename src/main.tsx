import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/index.tsx";
import { ConfigProvider } from "antd";
import { theme } from "./shared/configs/theme";
import "./reset.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider theme={theme}>
      <App />
    </ConfigProvider>
  </StrictMode>
);
