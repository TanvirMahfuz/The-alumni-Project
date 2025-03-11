import React from "react";
import {Typography, Button} from "@material-tailwind/react";
function ProfileHero({user}) {
  return (
    <div className="w-full flex flex-wrap justify-between">
      <div className="w-full  md:w-2/3 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">{user.name}</h1>
        {user.session ? (
          <h5 className="text-xl">Session: 2019-2020</h5>
        ) : (
          <h5 className="text-xl">{user.currentPost}</h5>
        )}
        <h5 className="text-xl">email: {user.email}</h5>
        <ul className="flex space-x-6 mt-4">
          <li>
            <a
              href={user.contacts?.github}
              target="_blank"
              className="text-gray-900 hover:text-gray-700 text-2xl"
            >
              <i className="bi bi-github"></i>
            </a>
          </li>
          <li>
            <a
              href={user.contacts?.linkedin}
              target="_blank"
              className="text-gray-900 hover:text-gray-700 text-2xl"
            >
              <i className="bi bi-linkedin"></i>
            </a>
          </li>
          <li>
            <a
              href={user.contacts?.facebook}
              target="_blank"
              className="text-gray-900 hover:text-gray-700 text-2xl"
            >
              <i className="bi bi-facebook"></i>
            </a>
          </li>
          <li>
            <a
              href={user.contacts?.portfolio}
              target="_blank"
              className="text-gray-900 hover:text-gray-700 text-2xl"
            >
              <i className="bi bi-person-bounding-box"></i>
            </a>
          </li>
        </ul>
        <div className="w-full text-center mt-4">
          <Typography>"{user.bio}"</Typography>
        </div>
      </div>
      <div className="w-full flex items-center justify-center md:w-1/3 mt-4 md:mt-0 max-h-110 ">
        <img
          src={user.image}
          alt="Profile"
          className="w-auto h-full rounded-xl object-cover object-center shadow-lg shadow-blue-gray-900/50 "
        />
      </div>
    </div>
  );
}

export default ProfileHero;
