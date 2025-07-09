import React from 'react'
import { formatSmartDateTime } from '../../../../bin/DateTime';
import Contacts from "./Contacts";
import {
  BuildingOfficeIcon,
  BriefcaseIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import AvatarSection from "./AvatarSection.jsx";

const ProfileBrief = ({user}) => {
  return (
    <div className="w-full pt-6 lg:w-2/5 bg-gray-50 px-6 py-3 pl-10 rounded-lg text-center shadow-sm">
      <AvatarSection/>
      <h2 className="mt-4 text-2xl font-semibold text-gray-800">
        {user?.name ?? "John Doe"}
      </h2>
      <p className="text-sm text-gray-400">{user?.session || "2019-2020"}</p>

      <p className="mt-4 text-[15px] font-[300] text-gray-500">
        {user?.bio || ""}
      </p>
      <Contacts contacts={user?.contacts} />
      <div className="mt-6 text-gray-600 text-left space-y-2">
        {user?.currentPost && user.currentPost.length > 0 ? (
          user.currentPost.map((job, idx) => (
            <div key={idx}>
              <div className="flex items-center gap-2 text-md">
                <BriefcaseIcon className="h-6 w-6 text-gray-800" />
                <span className="font-medium text-gray-800">
                  {job.title || "No job found"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-md">
                <BuildingOfficeIcon className="h-6 w-6 text-gray-800" />
                <span className="font-medium text-gray-800">
                  {job.company || "No company found"}
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Since{" "}
                {new Date(job.startDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                }) || "Unknown date"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm">
            Student at {user?.university || "No university"}
          </p>
        )}
      </div>

      {/* Skills Section */}
      <div className="mt-8 text-left">
        <h3 className="text-lg font-semibold text-gray-600 mb-2">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {user?.skills && user.skills.length > 0 ? (
            user.skills.map((skill) => (
              <span
                key={skill._id}
                className="bg-[#daf2f0] text-teal-700 text-xs px-3 py-1 rounded-full">
                {skill.title || "Unnamed Skill"}
              </span>
            ))
          ) : (
            <p className="text-sm text-gray-400 p-4">No skills added.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileBrief