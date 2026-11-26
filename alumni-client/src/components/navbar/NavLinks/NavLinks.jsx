import { Link } from "react-router-dom";
import "../navbar.css"
const NavLinks = ({ links, hoverIndex, setHoverIndex }) => (
  <div className="hidden lg:flex items-center navbar-group">
    {links.map((link, i) => (
      <div
        key={link.name}
        className={`nav-wrapper ${hoverIndex === i ? "hovered" : ""} ${hoverIndex === i - 1 ? "prev-hovered" : ""
          } ${hoverIndex === i + 1 ? "next-hovered" : ""}`}
        onMouseEnter={() => setHoverIndex(i)}
        onMouseLeave={() => setHoverIndex(null)}>
        <Link
          to={link.to}
          className="nav-link flex items-center relative rounded-3xl py-1.5 px-3 text-[#8D9295] hover:text-[#2992FE] transition-all group">
          {/* Single fixed-size icon: hover only changes fill/stroke, never layout */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-7 hidden md:block shrink-0 transition-colors group-hover:fill-[#2992FE] group-hover:stroke-[#e8f2f8] dark:group-hover:stroke-gray-800"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor">
            {link.icon}
          </svg>
          <span className="hidden md:block mx-1 text-sm">
            {link.name}
          </span>
        </Link>
      </div>
    ))}
  </div>
);

export default NavLinks;
