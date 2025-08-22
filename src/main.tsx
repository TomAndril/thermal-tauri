import ReactDOM from "react-dom/client";
import App from "./app";

import { ThemeProvider } from "./providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeProvider defaultTheme="dark">
    <App />
    <Toaster richColors />
  </ThemeProvider>
);
