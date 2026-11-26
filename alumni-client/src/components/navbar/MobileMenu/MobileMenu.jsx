import { Link } from "react-router-dom";

// Full-width rows; the whole row highlights on hover/tap.
const itemClass =
  "w-full flex items-center gap-3 px-5 py-3 text-base font-medium transition-colors cursor-pointer";
const linkClass = `${itemClass} text-gray-700 dark:text-gray-200 hover:bg-[#2992FE]/10 hover:text-[#2992FE] active:bg-[#2992FE]/15`;
// Same red as the old logout capsule (red-300), with a very faint red wash behind it
const logoutClass = `${itemClass} text-red-300 hover:bg-red-300/10 active:bg-red-300/15`;

const exitIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="size-6 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
  </svg>
);

const MobileMenu = ({ open, navLinks, authUser, handleLogOut, onNavigate }) => {
  if (!open) return null;

  return (
    <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-md z-20 flex flex-col py-2 lg:hidden border-t border-gray-100 dark:border-gray-700">
      {navLinks.map((item) => (
        <Link key={item.name} to={item.to} onClick={onNavigate} className={linkClass}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-6 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true">
            {item.icon}
          </svg>
          {item.name}
        </Link>
      ))}
      {authUser ? (
        <button
          type="button"
          className={`${logoutClass} text-left`}
          onClick={() => {
            onNavigate?.();
            handleLogOut();
          }}>
          {exitIcon}
          Logout
        </button>
      ) : (
        <Link to="/login" onClick={onNavigate} className={logoutClass}>
          {exitIcon}
          LogIn
        </Link>
      )}
    </div>
  );
};

export default MobileMenu;
