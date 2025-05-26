import React from "react";
import { useState } from "react";

const HamburgerMenu = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative z-1">
      {/* Hamburger Menu for Mobile */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden text-gray-600 focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 curser-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      {/* Mobile Menu Items */}
      {mobileMenuOpen && (
        <div className="absolute top-5 right-0 z-10 w-50 bg-white shadow-md flex flex-col items-start p-5 space-y-2 md:hidden">
          {["Home", "Messages", "Notifications"].map((name) => (
            <a
              key={name}
              href="#"
              className="py-2 text-sm text-gray-700 hover:text-[#2992FE]">
              {name}
            </a>
          ))}
          <button className="bg-red-300 text-white text-sm px-4 py-2 rounded-3xl hover:bg-red-400">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
