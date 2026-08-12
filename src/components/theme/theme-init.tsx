"use client";

import { useEffect } from "react";

export function ThemeInitializer() {
  useEffect(() => {
    const root = document.documentElement;
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const currentTheme = savedTheme || (systemPrefersDark ? "dark" : "light");

    root.classList.toggle("dark", currentTheme === "dark");
    root.style.colorScheme = currentTheme;
  }, []);

  return null;
}
