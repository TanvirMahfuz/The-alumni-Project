import React from "react";
import { Link } from "react-router-dom";

import { Textarea, Typography, Button } from "@material-tailwind/react";

function HomePageSideProfile({ currentUser }) {
  return (
    <div className=" p-4 mt-6 h-screen rounded-3xl bg-gray-50 shadow-md">
      <div className="bg-white p-4 rounded-xl shadow-lg">
        <div className="flex items-center">
          <img src="src/assets/profile.jpg" alt="" className="rounded-2xl" />
        </div>
        {currentUser ? (
          <div>
            {/* Check if the image is null or empty */}
            {currentUser?.image === null || currentUser?.image === "" ? (
              // Fallback image when `currentUser.image` is null or empty
              <div className="w-full flex justify-center transform translate-y-[-50px]">
                <img
                  src="src/assets/profile.jpg"
                  alt="Profile Placeholder"
                  className="h-30 w-30 rounded-full border-8 border-white"
                />
              </div>
            ) : (
              // Display actual image when it's available
              <div className="w-full max-h-max  flex flex-col items-center justify-center transform translate-y-[-50px]">
                <img
                  src={currentUser.image}
                  alt="Profile"
                  className="h-30 w-30 rounded-full border-8 border-white"
                />
                <Typography className="text-3xl font-semibold mt-2">
                  {currentUser.name}
                </Typography>
                <Typography className="text-lg text-center text-gray-700 font-normal">
                  {currentUser.bio}
                </Typography>
              </div>
            )}
          </div>
        ) : (
          // Fallback when `currentUser` is not available
          <div className="w-full flex justify-center transform translate-y-[-50px]">
            <img
              src="src/assets/profile.jpg"
              alt="Profile Placeholder"
              className="h-30 w-30 rounded-full border-8 border-white"
            />
          </div>
        )}

        <Typography className="font-semibold w-full bg-gray-900 transform translate-y-[-10px] text-white py-2 rounded-3xl">
          <Link
            className="w-full flex justify-center items-center"
            to={`/profile?id=${currentUser?._id ? currentUser._id : ""}`}>
            My Profile
          </Link>
        </Typography>
      </div>
      <div className="p-4 mt-6">
        {currentUser ? (
          <div>
            <Typography className="text-2xl font-semibold">Skills</Typography>
            <div className="flex flex-wrap mt-4 max-h-max">
              {currentUser.skills.map((skill, index) => (
                <Typography
                  key={index}
                  className="text-sm font-semibold text-white bg-gray-900 rounded-lg p-2 mr-2 mb-2">
                  {skill.title}
                </Typography>
              ))}
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="p-4 mb-4 ">
        {currentUser ? (
          <div className="">
            <Typography className="text-2xl font-semibold">
              Education
            </Typography>
            <div className="flex flex-wrap mt-4 bg-gray-300 p-4 rounded-2xl">
              {currentUser.education.map((education, index) => (
                <div key={index} className="border-l-2 pl-2">
                  <Typography variant="h4" className="leading-tight">
                    {education.degree}
                  </Typography>
                  <Typography className="font-medium text-gray-800 text-xl">
                    {education.institute}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default HomePageSideProfile;
