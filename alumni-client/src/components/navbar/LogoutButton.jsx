import { Link } from "react-router-dom";

const LogoutButton = ({ authUser, handleLogOut }) => {
  return authUser ? (
    <div
      className="hidden lg:block bg-red-300 text-white text-sm px-4 py-2 rounded-3xl hover:bg-red-400 ml-[100px] cursor-pointer"
      onClick={handleLogOut}>
      Logout
    </div>
  ) : (
    <div className="hidden lg:block bg-red-300 text-white text-sm px-4 py-2 rounded-3xl hover:bg-red-400 ml-[100px]">
      <Link to="/login">LogIn</Link>
    </div>
  );
};

export default LogoutButton;
