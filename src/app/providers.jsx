"use client";

import { Provider as JotaiProvider, useAtom, useSetAtom } from "jotai";
import { SnackbarProvider } from "notistack";
import { useEffect } from "react";
import { authAtom, storeHydratedAtom, switchDarkModeAtom } from "@/_state";

/**
 * Loads persisted client state (auth, theme) after mount so the server
 * render and the first client render match.
 */
function StoreHydrator() {
  const setAuth = useSetAtom(authAtom);
  const [isDarkMode, setDarkMode] = useAtom(switchDarkModeAtom);
  const [hydrated, setHydrated] = useAtom(storeHydratedAtom);

  useEffect(() => {
    try {
      setAuth(JSON.parse(localStorage.getItem("user")));
    } catch {
      localStorage.removeItem("user");
    }
    const isDark = localStorage.getItem("theme") === "dark";
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
    setHydrated(true);
  }, [setAuth, setDarkMode, setHydrated]);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode, hydrated]);

  return null;
}

export default function Providers({ children }) {
  return (
    <JotaiProvider>
      <StoreHydrator />
      <SnackbarProvider autoHideDuration={1000} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        {children}
      </SnackbarProvider>
    </JotaiProvider>
  );
}
