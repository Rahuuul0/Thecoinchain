import { useAtom } from "jotai";
import { switchDarkModeAtom } from "../_state";

/** Returns [isDarkMode, toggleDarkMode]; keeps <html class="dark"> and localStorage in sync. */
export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useAtom(switchDarkModeAtom);

  const toggleDarkMode = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return [isDarkMode, toggleDarkMode];
}
