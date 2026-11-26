import React, { useRef } from "react";
import { flushSync } from "react-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { useThemeStore } from "../../../store/useThemeStore";

const DURATION = 1000;
// Width of the soft, blended edge of the reveal circle
const FEATHER = 220;
// Button content: slides out of the top, then the new one rises in from the bottom
const SLIDE_OUT_MS = 180;
const SLIDE_IN_MS = 260;

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useThemeStore();
  const buttonRef = useRef(null);
  const contentRef = useRef(null);
  const busyRef = useRef(false);

  // Page-wide circular reveal starting at the button (falls back to an instant switch)
  const switchTheme = () => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!document.startViewTransition || reduceMotion || !buttonRef.current) {
      flushSync(() => toggleTheme());
      return Promise.resolve();
    }

    // Circle grows from the button's center to the farthest page corner
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Turn off per-element color transitions so the whole page changes in one sweep
    root.classList.add("theme-switching");

    const transition = document.startViewTransition(() => {
      flushSync(() => toggleTheme());
    });

    root.style.setProperty("--reveal-x", `${x}px`);
    root.style.setProperty("--reveal-y", `${y}px`);
    root.style.setProperty("--reveal-feather", `${FEATHER}px`);

    transition.ready.then(() => {
      // Grow a soft-edged circle so the new theme blends in instead of a hard line
      root.animate(
        { "--reveal-r": ["0px", `${radius + FEATHER}px`] },
        {
          duration: DURATION,
          easing: "cubic-bezier(0.45, 0, 0.25, 1)",
          // Hold the fully-revealed state; without this the mask snaps back to 0
          // for a frame before the overlay is removed, flashing the old theme
          fill: "forwards",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });

    transition.finished.finally(() => root.classList.remove("theme-switching"));
    return transition.updateCallbackDone;
  };

  const handleToggle = async () => {
    if (busyRef.current) return;
    const content = contentRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!content?.animate || reduceMotion) {
      switchTheme();
      return;
    }

    busyRef.current = true;
    try {
      await content.animate(
        [
          { transform: "translateY(0)", opacity: 1 },
          { transform: "translateY(-150%)", opacity: 0 },
        ],
        { duration: SLIDE_OUT_MS, easing: "ease-in", fill: "forwards" }
      ).finished;

      // New content starts below the button, hidden, before the theme flips
      content.getAnimations().forEach((a) => a.cancel());
      content.style.transform = "translateY(150%)";
      content.style.opacity = "0";

      await switchTheme();

      content.style.transform = "";
      content.style.opacity = "";
      await content.animate(
        [
          { transform: "translateY(150%)", opacity: 0 },
          { transform: "translateY(0)", opacity: 1 },
        ],
        { duration: SLIDE_IN_MS, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" }
      ).finished;
    } finally {
      busyRef.current = false;
    }
  };

  const Icon = isDark ? FaSun : FaMoon;
  const label = isDark ? "Light" : "Dark";

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleToggle}
      aria-label={`Switch to ${label.toLowerCase()} mode`}
      aria-pressed={isDark}
      title={`${label} mode`}
      className="overflow-hidden shrink-0 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 text-sm w-9 h-9 md:w-auto md:h-auto md:px-4 md:py-2 ml-2 rounded-full md:rounded-3xl flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer">
      <span ref={contentRef} className="flex items-center gap-2">
        <Icon
          aria-hidden="true"
          className={`size-4 ${isDark ? "text-amber-400" : "text-indigo-500"}`}
        />
        {/* Text only on wider screens; small screens show just the icon */}
        <span className="hidden md:inline">{label}</span>
      </span>
    </button>
  );
};

export default ThemeToggle;
