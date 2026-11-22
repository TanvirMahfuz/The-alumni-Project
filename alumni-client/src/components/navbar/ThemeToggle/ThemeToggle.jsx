import React from "react";
import { useThemeStore } from "../../../store/useThemeStore";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      aria-pressed={isDark}
      className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 text-sm px-4 py-2 rounded-3xl hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
    >
      {isDark ? "Light" : "Dark"}
    </button>
  );
};

export default ThemeToggle;
