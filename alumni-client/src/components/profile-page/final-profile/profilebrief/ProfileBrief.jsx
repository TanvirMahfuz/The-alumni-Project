import { useUserStore } from "../../../../store/useUserStore.js";
import Contacts from "./Contacts";
import { BuildingOfficeIcon, BriefcaseIcon } from "@heroicons/react/24/outline";
import AvatarSection from "./AvatarSection.jsx";

const ProfileBrief = ({ user }) => {
  const { authUser } = useUserStore();

  return (
    <div className="w-full py-6 lg:w-2/5 bg-gray-50 dark:bg-gray-800 px-6 pl-10 rounded-lg text-center shadow-sm">
      {authUser && authUser._id === user?._id ? (
        <AvatarSection />
      ) : (
        <img
          src={user?.image ?? "./avatar.png"}
          alt="Profile"
          className="rounded-full w-40 h-40 mx-auto object-cover cursor-pointer transition duration-300 border-4 border-teal-600 shadow-lg"
        />
      )}

      <h2 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-gray-100">
        {user?.name ?? "John Doe"}
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {user?.session || "2019-2020"}
      </p>

      <p className="mt-4 text-[15px] font-[300] text-gray-600 dark:text-gray-300">
        {user?.bio || ""}
      </p>

      <Contacts contacts={user?.contacts} />

      <div className="mt-6 text-gray-700 dark:text-gray-300 text-left">
        {user?.currentPost && user.currentPost.length > 0 ? (
          user.currentPost.map((job, idx) => (
            <div key={idx}>
              <div className="flex items-center gap-2 text-md">
                <BriefcaseIcon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                <span className="font-medium">
                  {job.title || "No job found"}
                </span>
              </div>
              <div className=" flex items-center gap-2 text-md">
                <BuildingOfficeIcon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                <span className="font-medium">
                  {job.company || "No company found"}
                </span>
              </div>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Since{" "}
                {job.startDate
                  ? new Date(job.startDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    })
                  : "Unknown date"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Studied at {user?.education[0]?.institute || "No university"}
          </p>
        )}
      </div>

      {/* Skills Section */}
      <div className="mt-8 text-left">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {user?.skills && user.skills.length > 0 ? (
            user.skills.map((skill) => (
              <span
                key={skill._id}
                className="bg-[#daf2f0] dark:bg-teal-900 text-teal-700 dark:text-teal-300 text-xs px-3 py-1 rounded-full">
                {skill.title || "Unnamed Skill"}
              </span>
            ))
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400 p-4">
              No skills added.
            </p>
          )}
        </div>
      </div>
      <div className="mt-8 text-left">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Interests
        </h3>
        <div className="flex flex-wrap gap-2">
          {user?.futureInterests && user.futureInterests.length > 0 ? (
            user.futureInterests.map((interest,index) => (
              <span
                key={index}
                className="bg-[#daf2f0] dark:bg-teal-900 text-teal-700 dark:text-teal-300 text-xs px-3 py-1 rounded-full">
                {interest|| "Unnamed interest"}
              </span>
            ))
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400 p-4">
              No interests added.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileBrief;
