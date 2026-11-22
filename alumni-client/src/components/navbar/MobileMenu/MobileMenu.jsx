import { Link } from "react-router-dom";

const MobileMenu = ({ open, navLinks, authUser, handleLogOut }) => {
  if (!open) return null;

  return (
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
  );
};

export default MobileMenu;
