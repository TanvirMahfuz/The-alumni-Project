import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {LogInCard} from "../components/LogInCard";
function LogIn() {
  return (
    <>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <LogInCard />
      </div>
    </>
  );
}

export default LogIn;
