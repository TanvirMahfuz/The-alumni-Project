import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaHome } from "react-icons/fa";

const btnClass =
  "w-9 h-9 shrink-0 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#2992FE] transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-600";

// Back / forward / home buttons shown to the left of the search bar.
const HistoryButtons = () => {
  const navigate = useNavigate();
  useLocation(); // re-render on navigation so the back button's state stays current

  // React Router stores the position in its history stack as `idx`
  const canGoBack = (window.history.state?.idx ?? 0) > 0;

  return (
    <div className="flex items-center gap-1.5 mr-2">
      <button
        type="button"
        className={btnClass}
        onClick={() => navigate(-1)}
        disabled={!canGoBack}
        aria-label="Go back"
        title="Back">
        <FaArrowLeft className="size-3.5" />
      </button>
      <button
        type="button"
        className={btnClass}
        onClick={() => navigate(1)}
        aria-label="Go forward"
        title="Forward">
        <FaArrowRight className="size-3.5" />
      </button>
      <button
        type="button"
        className={btnClass}
        // `home` state tells the homepage to switch back to the feed tab
        onClick={() => navigate("/", { state: { home: Date.now() } })}
        aria-label="Go home"
        title="Home">
        <FaHome className="size-4" />
      </button>
    </div>
  );
};

export default HistoryButtons;
