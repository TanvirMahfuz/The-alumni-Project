import { create } from "zustand";

const THEME_STORAGE_KEY = "theme";

const getInitialTheme = () => {
  if (typeof window === "undefined") return "light";

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const useThemeStore = create((set, get) => {
  const initialTheme = getInitialTheme();
  const initialIsDark = initialTheme === "dark";

  if (typeof document !== "undefined") {
    document.documentElement.classList.toggle("dark", initialIsDark);
  }

  const setTheme = (theme) => {
    const nextTheme = theme === "dark" ? "dark" : "light";
    const nextIsDark = nextTheme === "dark";

    set({ theme: nextTheme, isDark: nextIsDark });
    document.documentElement.classList.toggle("dark", nextIsDark);
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  };

  return {
    theme: initialTheme,
    isDark: initialIsDark,
    setTheme,
    toggleTheme: () => {
      const { isDark, setTheme } = get();
      setTheme(isDark ? "light" : "dark");
    },
  };
});
