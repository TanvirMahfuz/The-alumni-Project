import React from "react";
import { cameraIcon } from "../../../../assets/icons";
import { useUserStore } from "../../../../store/useUserStore";
import { imagesToBase64 } from "../../../../bin/Image2base64";

function AvatarSection() {
  const { authUser, updateUser } = useUserStore();
  const [formData, setFormData] = React.useState({});
  const [loading, setLoading] = React.useState(false); // ⬅️ Loading state
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
      setLoading(true); // ⬅️ Start loading
      const base64 = await imagesToBase64([file]);
      const updatedUser = { ...authUser, image: base64 };
      setFormData(updatedUser);
      await updateUser(updatedUser); // assume updateUser returns a promise
    } catch (error) {
      console.error("Error converting image:", error);
    } finally {
      setLoading(false); // ⬅️ End loading
    }
  };

  return (
    <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto">
      {/* Avatar image */}
      <img
        src={formData?.image?.length > 0 ? formData.image : "./avatar.png"}
        alt="Profile"
        className={`rounded-full w-full h-full object-cover cursor-pointer transition duration-300 hover:opacity-80 border-4 border-teal-600 shadow-lg ${
          loading ? "opacity-50" : ""
        }`}
        onClick={handleEditClick}
      />

      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 rounded-full">
          <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Camera icon overlay */}
      <div
        onClick={handleEditClick}
        className="absolute text-teal-700 bottom-2 right-2 bg-white p-1 rounded-full shadow cursor-pointer hover:scale-105 transition-transform z-10">
        {cameraIcon}
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
}

export default AvatarSection;
