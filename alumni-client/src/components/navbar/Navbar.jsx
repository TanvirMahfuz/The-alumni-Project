import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Category");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const { logOut, authUser } = useUserStore();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (authUser) {
      console.log("user logged in ", authUser);
    } else {
      console.log("no user logged in");
    }
  }, [authUser]);

  const handleLogOut = async () => {
    const success = await logOut();
    if (success) {
      console.log("Logged out successfully");
      navigate("/login");
    } else {
      console.log("Logout failed");
      navigate("/");
    }
  };

  const handleDropdownSelect = (value) => {
    setSelectedOption(value);
    setDropdownOpen(false);
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
    <nav className="w-full flex items-center justify-between bg-white shadow-md px-5 py-3 font-[Poppins] relative">
      {/* Logo */}
      <Link to="/" className="hidden xl:flex text-2xl">
        <img src="./connect-main-logo.png" width="160px" alt="main-logo" />
      </Link>
      <Link to="/" className="flex xl:hidden sm:flex text-2xl mr-2">
        <img src="logo-mini.PNG" width="36px" alt="icon-logo" />
      </Link>

      {/* Search Bar */}
      <div className="flex-grow flex justify-center px-4">
        <div className="flex w-[300px] sm:w-auto relative items-center border-2 rounded-3xl border-gray-200">
          {/* Dropdown */}
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="rounded-3xl text-gray-700 ps-4 pe-2 py-1.5 flex items-center space-x-2 focus:outline-none">
            <span className="text-sm">{selectedOption}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
              viewBox="0 0 20 20"
              fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Dropdown Items */}
          {dropdownOpen && (
            <div className="text-sm absolute top-10 left-2 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
              {["Name", "Company", "Session"].map((item) => (
                <button
                  key={item}
                  onClick={() => handleDropdownSelect(item)}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-sky-100">
                  {item}
                </button>
              ))}
            </div>
          )}

          {/* Search Input */}
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-[180px] lg:max-w-md rounded-3xl">
            <input
              type="text"
              placeholder="Search ..."
              className="px-4 py-2 w-full pe-12 rounded-3xl focus:outline-none text-gray-600"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 rounded-full p-2 transition duration-300 hover:cursor-pointer hover:scale-110">
              <FaSearch className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Navbar Links */}
      <div className="hidden lg:flex items-center ml-[-100px] navbar-group">
        {navLinks.map((link, i) => (
          <div
            key={link.name}
            className={`nav-wrapper
              ${hoverIndex === i ? "hovered" : ""}
              ${hoverIndex === i - 1 ? "prev-hovered" : ""}
              ${hoverIndex === i + 1 ? "next-hovered" : ""}
            `}
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(null)}>
            <Link
              to={link.to}
              className="nav-link flex items-center relative rounded-3xl py-1.5 px-3 text-[#8D9295] hover:text-[#2992FE] transition-all group">
              {/* Default Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-7 group-hover:hidden hidden md:block">
                {link.icon}
              </svg>

              {/* Hover Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#e8f2f8"
                className="size-8 hidden group-hover:block text-[#2992FE]">
                {link.icon}
              </svg>

              {/* Link Name */}
              <span className="hidden md:block lg:group-hover:inline mx-1 text-sm">
                {link.name}
              </span>
            </Link>
          </div>
        ))}
      </div>

      {/* Logout Button */}

      {authUser ? (
        <div
          className="hidden lg:block bg-red-300 text-white text-sm px-4 py-2 rounded-3xl hover:bg-red-400 ml-[100px] cursor-pointer"
          onClick={handleLogOut}>
          Logout
        </div>
      ) : (
        <div className="hidden md:block bg-red-300 text-white text-sm px-4 py-2 rounded-3xl hover:bg-red-400 ml-[100px]">
          <Link to="/login">LogIn</Link>
        </div>
      )}

      {/* Hamburger Menu for Mobile */}
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

      {/* Mobile Menu Items */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md z-20 flex flex-col items-start p-5 space-y-2 lg:hidden">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="py-2 text-sm block text-gray-700 hover:text-[#2992FE]">
              {item.name}
            </Link>
          ))}

          {authUser ? (
            <div
              className="bg-red-300 text-white px-4 py-2 rounded-3xl hover:bg-red-400 cursor-pointer"
              onClick={handleLogOut}>
              Logout
            </div>
          ) : (
            <div className="bg-red-300 text-white px-4 py-2 rounded-3xl hover:bg-red-400">
              <Link to="/login">LogIn</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
