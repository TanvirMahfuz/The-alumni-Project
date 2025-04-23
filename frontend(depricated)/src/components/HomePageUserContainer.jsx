import React from "react";
import { Link } from "react-router-dom";
import { profilePlaceHolder, skillsIcon } from "../assets/images.jsx";
import { Textarea, Typography, Button } from "@material-tailwind/react";
function HomePageUserContainer({users}) {
  return (
    <div className="m-4 p-4 pb-0 mt-6 h-screen rounded-3xl bg-gray-50 shadow-md overflow-auto">
      {users ? (
        <div>
          <Typography className="mt-4 ml-4 text-2xl font-semibold">
            Users
          </Typography>
          <div className="mt-6 max-h-max">
            {users.map((user, index) => (
              <div key={index} className="bg-white rounded-3xl p-4 mb-4 shadow-lg">
                <div className="grid grid-cols-4 ">
                  <div className="col-span-1 flex items-start justify-center">
                    <img
                      src={
                        user.image
                          ? user.image !== ""
                            ? user.image
                            : { profilePlaceHolder }
                          : { profilePlaceHolder }
                      }
                      alt=""
                      className="w-15 h-15 rounded-full"
                    />
                  </div>
                  <div className="col-span-3 pl-2">
                    <Typography className="text-2xl font-semibold">
                      <Link to={`/profile?id=${user._id}`}>{user.name}</Link>
                    </Typography>
                    <Typography className="text-md font-normal text-gray-700 ">
                      {user.bio}
                    </Typography>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>{console.log("no users found")}</div>
      )}
    </div>
  );
}

export default HomePageUserContainer;
