// AvatarSection.jsx
import React from "react";
import { cameraIcon } from "../../../assets/icons";
import { useUserStore } from "../../../store/useUserStore";
import { imagesToBase64 } from "../../../bin/Image2base64";

function AvatarSection() {
  const { authUser, updateUser } = useUserStore();
  const [formData, setFormData] = React.useState({});
  const fileInputRef = React.useRef(null);

  React.useEffect(() => {
    setFormData(authUser);
  }, [authUser]);

  const handleEditClick = () => {
    fileInputRef.current.click(); // trigger hidden file input
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const base64 = await imagesToBase64([file]);
      const updatedUser = { ...authUser, image: base64 };
      console.log(updatedUser);
      
      setFormData(updatedUser);
      updateUser(updatedUser); // Update in global store or backend
    } catch (error) {
      console.error("Error converting image:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="relative group w-48 h-48 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-md">
        <img
          src={authUser?.image?.length > 0 ? authUser.image : "./avatar.png"}
          alt="Profile"
          className="w-full h-full object-cover"
        />

        {/* Overlay for camera icon */}
        <div
          onClick={handleEditClick}
          className="absolute inset-0 flex items-center justify-center  hover:backdrop-blur-xs transition group-hover:bg-black/30 z-10 cursor-pointer">
          <div className="p-2  rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
            {cameraIcon}
          </div>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <div className="text-2xl text-white font-bold tracking-wide">
        {authUser?.name ?? "Name"}
      </div>
    </div>
  );
}

export default AvatarSection;
