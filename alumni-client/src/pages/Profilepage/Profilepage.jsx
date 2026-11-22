import React from "react";
import { useParams } from "react-router-dom";
import Profile from "../../components/profile-page/profile/Profile.jsx";

function Profilepage() {
  const { id } = useParams();

  return (
    <div className="w-full md:flex ">
      <Profile uid={id} />
    </div>
  );
}

export default Profilepage;
