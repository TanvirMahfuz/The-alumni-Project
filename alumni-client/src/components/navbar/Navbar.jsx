import React from "react";
import { homeIcon,messagesIcon,logoutIcon,LogInIcon } from "../../assets/icons";
import Search from "./Search";
import { Link,useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";
function Navbar() {
  const { logOut,authUser } = useUserStore();
  const navigate = useNavigate();
  React.useEffect(() => {
    try {
      console.log("the connected user is : ", authUser);
      if (authUser) {
        console.log("user logged in ")
        console.log(authUser);
      }
    } catch (error) {
      console.log("no user logged in ")
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

  return (
    <div className="flex gap-2 justify-between items-center px-8 pt-4">
      <div>
        <Link to="/">{homeIcon}</Link>
      </div>
      <Search />
      <div className="flex gap-4 items-center ">
        <div className=" rounded-md p-1 hover:bg-gray-600 cursor-pointer  transition-colors duration-200">
          <Link to="/chat">{messagesIcon}</Link>
        </div>
        {authUser ? (
          <div
            className="rounded-md p-1 hover:bg-gray-600 cursor-pointer transition-colors duration-200"
            onClick={handleLogOut}>
            {logoutIcon}
          </div>
        ) : (
          <div className="rounded-md p-1 text-white hover:bg-gray-600 cursor-pointer transition-colors duration-200">
            <Link to="/login">{LogInIcon}</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
