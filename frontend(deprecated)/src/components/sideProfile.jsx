import React from "react";
import { Typography } from "@material-tailwind/react";
import { demoImage, commandlineIcon, skillsIcon } from "../assets/images.jsx";

export function SideProfile({ user }) {
  return (
    <div
      className="col-span-12 lg:col-span-4 p-3 max-h-screen overflow-y-auto"
      id="side-profile">
      <div
        id="image-container"
        className="p-4 m-5 rounded-2xl max-h-100 flex flex-col justify-center items-center overflow-hidden">
        <div className="bg-gray-300 p-4 h-100 w-100 rounded-2xl overflow-hidden flex justify-center items-center">
          <img
            src={user?.image ?? demoImage}
            alt="User Profile"
            className="w-auto h-full rounded-2xl object-cover"
          />
        </div>
        <Typography
          variant="h4"
          className="m-2 mb-0 flex justify-center items-center gap-2">
          {user?.currentPost?.description ? (
            <>
              {commandlineIcon}
              <span>{user.currentPost.description}</span>
            </>
          ) : (
            <>
              {commandlineIcon}
              <span>Unemployed</span>
            </>
          )}
        </Typography>
      </div>

      {/* name section */}
      <div className="pr-4 pl-4 ">
        <Typography variant="h1" className="text-4xl lg:text-6xl">
          Hello I am {user?.name ?? "User"}
        </Typography>
      </div>
      {/* education section */}
      <div className="p-4">
        <Typography variant="h3">Education</Typography>
        <div className="bg-gray-300 p-4 mt-2 rounded-2xl grid grid-cols-1 gap-6">
          {user?.education?.map((edu) => (
            <div className="border-l-2 pl-2" key={edu.id || edu.institute}>
              <Typography className="flex bg-gray-900 text-white pl-2 pr-2 rounded-2xl max-w-max mb-4">
                {edu.startDate ?? "N/A"}-{edu.endDate ?? "N/A"}
              </Typography>
              <Typography variant="h4" className="leading-tight">
                {edu.degree ?? "N/A"}
              </Typography>
              <Typography className="font-medium text-gray-800 text-xl">
                {edu.institute ?? "N/A"}
              </Typography>
            </div>
          ))}
        </div>
      </div>
      {/* Skills section */}
      <div className="p-4">
        <Typography variant="h3">Skills</Typography>
        <div className="bg-gray-300 p-4 mt-2 rounded-2xl grid grid-cols-1 gap-4">
          {user?.skills?.map((skill) => (
            <div
              className="flex gap-3 items-center justify-start"
              key={skill.title}>
              {skill.image ?? skillsIcon}
              <Typography variant="h5">{skill.title ?? ""}</Typography>
            </div>
          ))}
        </div>
      </div>
      {/* interest section */}
      <div className="p-4">
        {user?.futureInterests?.length > 0 && (
          <>
            <Typography variant="h3">Interests</Typography>
            <div className="bg-gray-300 p-4 mt-2 rounded-2xl grid grid-cols-1 gap-4">
              {user?.futureInterests?.map((interest, index) => (
                <div
                  className="flex gap-3 items-center justify-start"
                  key={index}>
                  {skillsIcon}
                  <Typography variant="h5">{interest ?? ""}</Typography>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
