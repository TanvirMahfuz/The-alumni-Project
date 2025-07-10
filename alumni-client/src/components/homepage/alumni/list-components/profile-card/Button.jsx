import React from "react";
import { Link } from "react-router-dom";
function Button({id}) {
  return (
    <div className="w-full text-center  bg-sky-500 text-white font-medium py-2 rounded-2xl hover:bg-sky-600">
      <Link to={`/profile/${id}`}>View Profile</Link>
    </div>
  );
}

export default Button;
