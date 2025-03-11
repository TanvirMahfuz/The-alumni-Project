import axios from "axios";
import {useState} from "react";

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const Logout = () => {
    axios
      .get("/api/api/v1/user/logout")
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          window.location.href = "/log-in";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <nav className="w-full flex flex-col md:flex-row justify-between text-white bg-gray-900 px-5 py-2">
      <div className="left flex items-center">
        <a href="/home">
          <h1 className="text-2xl">HOME</h1>
        </a>
      </div>

      {/* Center section for larger screens */}
      <div className="center hidden md:flex">
        <div className="flex gap-2">
          <form action="">
            <input
              type="text"
              placeholder="name"
              className="m-2 px-2 py-0.5 border border-gray-400 rounded-md w-2xs"
            />
            <button
              type="submit"
              className="border-2 border-gray-400 px-2 py-0.5 rounded-md"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Right section for larger screens */}
      <div className="right hidden md:flex items-center">
        <ul className="flex space-x-6">
          <li>
            <a href="/profile">Profile</a>
          </li>
          <li>
            <a href="/resume">Resume</a>
          </li>
          <li>
            <a href="#" onClick={Logout}>
              Log out
            </a>
          </li>
        </ul>
      </div>

      {/* Collapsible button for mobile/tablet screens */}
      <div className="md:hidden absolute right-4 ">
        <button onClick={toggleMobileMenu} className="text-white">
          {isMobileMenuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden w-full bg-gray-900 px-5 py-2 mt-2">
          <ul className="space-y-4 text-center">
            <li>
              <a href="/profile">Profile</a>
            </li>
            <li>
              <a href="/resume">Resume</a>
            </li>
            <li>
              <a href="/log-out">Log out</a>
            </li>
            <li>
              <form action="" className="flex justify-center gap-2">
                <input
                  type="text"
                  placeholder="name"
                  className="m-2 px-2 py-0.5 border border-gray-400 rounded-md w-2xs"
                />
                <button
                  type="submit"
                  className="border-2 border-gray-400 px-2 py-0.5 rounded-md"
                >
                  Search
                </button>
              </form>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
