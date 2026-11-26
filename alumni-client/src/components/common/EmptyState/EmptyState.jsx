import React from "react";

// Height of the page headers ("Events", "Job Openings"): mt-4 + py-4 + text-3xl line + border.
// Pages without a header pass `offsetForHeader` so their placeholder sits at the same spot.
const HEADER_OFFSET = "mt-[85px]";

// Page wrapper shared with the Events page: same background, padding and scrolling.
export const PAGE_SHELL =
  "h-screen px-6 overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-300";

// Empty-list placeholder. The default (page) size mirrors the Events "No Events Yet" screen
// exactly; `compact` is for sidebars and small panels.
function EmptyState({
  icon: Icon,
  title,
  message,
  compact = false,
  offsetForHeader = false,
  className = "",
}) {
  if (compact) {
    return (
      <div
        className={`flex flex-col justify-center items-center text-center py-10 px-4 text-gray-600 dark:text-gray-200 ${className}`}>
        {Icon && <Icon aria-hidden="true" className="w-10 h-10 mb-3 text-[#2992FE] opacity-80" />}
        <h2 className="text-base font-semibold mb-2">{title}</h2>
        {message && <p className="text-sm max-w-md text-gray-500 dark:text-gray-400">{message}</p>}
      </div>
    );
  }

  return (
    <div
      className={`h-[calc(100vh-5rem)] flex flex-col justify-center items-center text-center p-6 text-gray-600 dark:text-gray-200 ${
        offsetForHeader ? HEADER_OFFSET : ""
      } ${className}`}>
      {Icon && <Icon aria-hidden="true" className="w-32 h-32 mb-4 text-[#2992FE] opacity-80" />}
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      {message && <p className="max-w-md">{message}</p>}
    </div>
  );
}

export default EmptyState;
