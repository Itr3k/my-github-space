import React from 'react';
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/blog.css";

// Defer carousel CSS loading - will be imported by components that need it
if (typeof window !== 'undefined') {
  import("slick-carousel/slick/slick.css");
  import("slick-carousel/slick/slick-theme.css");
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);