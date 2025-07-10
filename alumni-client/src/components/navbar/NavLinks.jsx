import { Link } from "react-router-dom";
import "./navbar.css"
const NavLinks = ({ links, hoverIndex, setHoverIndex }) => (
  <div className="hidden lg:flex items-center ml-[-100px] navbar-group">
    {links.map((link, i) => (
      <div
        key={link.name}
        className={`nav-wrapper ${hoverIndex === i ? "hovered" : ""} ${
          hoverIndex === i - 1 ? "prev-hovered" : ""
        } ${hoverIndex === i + 1 ? "next-hovered" : ""}`}
        onMouseEnter={() => setHoverIndex(i)}
        onMouseLeave={() => setHoverIndex(null)}>
        <Link
          to={link.to}
          className="nav-link flex items-center relative rounded-3xl py-1.5 px-3 text-[#8D9295] hover:text-[#2992FE] transition-all group">
          {/* Default Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-7 group-hover:hidden hidden md:block"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor">
            {link.icon}
          </svg>
          {/* Hover Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-8 hidden group-hover:block text-[#2992FE]"
            fill="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#e8f2f8">
            {link.icon}
          </svg>
          <span className="hidden md:block lg:group-hover:inline mx-1 text-sm">
            {link.name}
          </span>
        </Link>
      </div>
    ))}
  </div>
);

export default NavLinks;
