"use client";

import { useEffect } from "react";

export default function BaleInit() {
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.Bale?.WebApp) {
        document.cookie = "isBale=true; path=/";

        clearInterval(interval);
      }

    }, 300);

    return () => clearInterval(interval);
  }, []);

  return null; // No UI needed
}
