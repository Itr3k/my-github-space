import React from 'react';
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/blog.css";

// Defer non-critical CSS loading for better FCP
if (typeof window !== 'undefined') {
  // Use requestIdleCallback for non-critical resources
  const loadCarouselCSS = () => {
    import("slick-carousel/slick/slick.css");
    import("slick-carousel/slick/slick-theme.css");
  };
  
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(loadCarouselCSS);
  } else {
    setTimeout(loadCarouselCSS, 100);
  }
}


createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);