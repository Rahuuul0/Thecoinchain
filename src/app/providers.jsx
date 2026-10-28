"use client";

import { Provider as JotaiProvider, useSetAtom } from "jotai";
import { SnackbarProvider } from "notistack";
import { useEffect } from "react";
import { authAtom, storeHydratedAtom, switchDarkModeAtom } from "@/_state";

/**
 * Loads persisted client state (auth, theme) after mount so the server
 * render and the first client render match.
 */
function StoreHydrator() {
  const setAuth = useSetAtom(authAtom);
  const setDarkMode = useSetAtom(switchDarkModeAtom);
  const setHydrated = useSetAtom(storeHydratedAtom);

  useEffect(() => {
    try {
      setAuth(JSON.parse(localStorage.getItem("user")));
    } catch {
      localStorage.removeItem("user");
    }
    setDarkMode(localStorage.getItem("theme") === "dark");
    setHydrated(true);
  }, [setAuth, setDarkMode, setHydrated]);

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
