import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";
import SearchBar from "./SearchBar/SearchBar";
import Logo from "./Logo/Logo";
import NavLinks from "./NavLinks/NavLinks";
import MobileMenu from "./MobileMenu/MobileMenu";
import LogoutButton from "./LogoutButton/LogoutButton";
import ThemeToggle from "./ThemeToggle/ThemeToggle";
import HistoryButtons from "./HistoryButtons/HistoryButtons";

const Navbar = () => {
  const [selectedOption, setSelectedOption] = useState("Name");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const { logOut, authUser } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();
  const mobileMenuRef = useRef(null);

  // Close the mobile menu on any click/tap outside it (the burger button is inside the ref,
  // so it still toggles), on Escape, and after navigating.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handlePointerDown = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    console.log(authUser ? "user logged in" : "no user logged in", authUser);
  }, [authUser]);

  const handleLogOut = async () => {
    const success = await logOut();
    if (success) {
      console.log("Logged out successfully");
      navigate("/login");
    } else {
      navigate("/");
    }
  };

  const navLinks = [
    {
      name: "Messages",
      to: "/chat",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 10h.01M12 10h.01M16 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
    },
    {
      name: "Notifications",
      to: "/",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      ),
    },
  ];

  return (
    <nav className="flex items-center justify-between bg-white dark:bg-gray-900 shadow-md px-5 py-3 font-[Poppins] relative">
      <Logo />
      <div className="flex-grow flex justify-center px-4">
        <HistoryButtons />
        <SearchBar
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
        <ThemeToggle />
      </div>
      <NavLinks
        links={navLinks}
        hoverIndex={hoverIndex}
        setHoverIndex={setHoverIndex}
      />
      <LogoutButton authUser={authUser} handleLogOut={handleLogOut} />
      <div ref={mobileMenuRef} className="lg:hidden">
      <button
        type="button"
        aria-label="Toggle menu"
        aria-expanded={mobileMenuOpen}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden text-gray-600 focus:outline-none dark:text-gray-300 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
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
      <MobileMenu
        open={mobileMenuOpen}
        navLinks={navLinks}
        authUser={authUser}
        handleLogOut={handleLogOut}
        onNavigate={() => setMobileMenuOpen(false)}
      />
      </div>
    </nav>
  );
};

export default Navbar;
