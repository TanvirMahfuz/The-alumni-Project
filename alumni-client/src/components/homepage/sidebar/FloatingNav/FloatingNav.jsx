import React from "react";

// Round icon buttons in a row at the bottom-right. Only shown below `lg`,
// where the regular sidebar (Menublock) is hidden.
function FloatingNav({ menuItems, selectedTag, setSelectedTag }) {
  return (
    <nav
      aria-label="Sections"
      className="lg:hidden fixed right-4 bottom-4 z-40 flex flex-row gap-3">
      {menuItems.map((item) => {
        const selected = selectedTag === item.id;
        return (
          <button
            key={item.id}
            type="button"
            title={item.label}
            aria-label={item.label}
            aria-current={selected ? "page" : undefined}
            onClick={() => setSelectedTag(item.id)}
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg border transition-all duration-200 cursor-pointer active:scale-95 [&_svg]:size-6 ${
              selected
                ? "bg-[#2992FE] text-white border-[#2992FE]"
                : "bg-white text-gray-600 border-gray-200 hover:text-[#2992FE] hover:scale-105 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:text-[#2992FE]"
            }`}>
            {item.Icon}
          </button>
        );
      })}
    </nav>
  );
}

export default FloatingNav;
