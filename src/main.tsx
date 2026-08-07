import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ResumeAnalytics from "./components/ResumeAnalytics.tsx";

createRoot(document.getElementById("root")!).render(<><App /><ResumeAnalytics /></>);
