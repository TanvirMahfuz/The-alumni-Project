import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";
import SearchBar from "./SearchBar";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const [selectedOption, setSelectedOption] = useState("Category");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const { logOut, authUser } = useUserStore();
  const navigate = useNavigate();

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
      to: "/notifications",
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
    <nav className="w-full flex items-center justify-between bg-white dark:bg-gray-900 shadow-md px-5 py-3 font-[Poppins] relative">
      <Logo />
      <div className="flex-grow flex justify-center px-4">
        <SearchBar
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </div>
      <NavLinks
        links={navLinks}
        hoverIndex={hoverIndex}
        setHoverIndex={setHoverIndex}
      />
      <LogoutButton authUser={authUser} handleLogOut={handleLogOut} />
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden text-gray-600 focus:outline-none">
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
      />
    </nav>
  );
};

export default Navbar;
