import React from "react";
import { CameraIcon } from "@heroicons/react/24/solid";
import { useUserStore } from "../../store/useUserStore.js";
import { imagesToBase64 } from "../../bin/Image2base64.js";

const ProfileBrief = () => {
  const { authUser, updateUser } = useUserStore();
  const [formData, setFormData] = React.useState({});
  const fileInputRef = React.useRef(null);

  React.useEffect(() => {
    setFormData(authUser);
  }, [authUser]);

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const base64 = await imagesToBase64([file]);
      const updatedUser = { ...authUser, image: base64 };
      setFormData(updatedUser);
      updateUser(updatedUser);
    } catch (error) {
      console.error("Error converting image:", error);
    }
  };

  if (!authUser) return null;

  return (
    <div className="w-full  bg-gray-50 px-6 py-3 pl-10 rounded-lg  shadow-sm md:h-screen">
      {/* Profile Image */}
      <div className="flex flex-col items-center p-4">
        <div className="relative flex justify-center group w-48 h-48 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-md">
          <img
            src={authUser?.image?.length > 0 ? authUser.image : "./avatar.png"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
          <div
            onClick={handleEditClick}
            className="absolute inset-0 flex items-center justify-center hover:backdrop-blur-xs transition group-hover:bg-black/30 z-10 cursor-pointer">
            <div className="p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
              <CameraIcon className="w-6 h-6 text-white" />
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        {/* Basic Info */}
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          {authUser?.name || "Unnamed User"}
        </h2>
        <p className="text-sm text-gray-400">{authUser?.email || "No email"}</p>
        <p className="text-sm text-gray-400 mt-1">
          {authUser?.session || "2019-2020"}
        </p>

        {/* Bio */}
        <p className="mt-4 text-[15px] font-[300] text-gray-500">
          {authUser?.bio || "No bio available."}
        </p>
      </div>

      {/* Current Post */}
      {authUser?.currentPost && authUser.currentPost.length > 0 && (
        <div className="mt-6 text-gray-600 text-left space-y-3">
          <h3 className="text-lg font-semibold text-gray-600">Current Post</h3>
          {authUser.currentPost.map((post, index) => (
            <div key={index} className="pl-1">
              <p className="text-md font-medium text-gray-800">{post.title}</p>
              <p className="text-sm text-gray-500">{post.company}</p>
              <p className="text-xs text-gray-400">
                {post.startDate} – {post.endDate || "Present"}
              </p>
              {post.description && (
                <p className="text-sm text-gray-500 mt-1">{post.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills Section */}
      {/* <div className="mt-8 text-left">
        <h3 className="text-lg font-semibold text-gray-600 mb-2">Skills</h3>
        <div className="flex flex-wrap gap-3">
          {authUser?.skills && authUser.skills.length > 0 ? (
            authUser.skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-[#daf2f0] px-3 py-2 rounded-lg shadow-sm">
                {skill.image && (
                  <img
                    src={skill.image}
                    alt={skill.title}
                    className="w-5 h-5 object-contain"
                  />
                )}
                <div>
                  <p className="text-sm text-teal-800 font-medium">
                    {skill.title}
                  </p>
                  <p className="text-xs text-teal-600">Level: {skill.level}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400">No skills added.</p>
          )}
        </div>
      </div> */}
    </div>
  );
};

export default ProfileBrief;
