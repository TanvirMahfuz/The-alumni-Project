import { useState, useEffect } from "react";
import { useUserStore } from "../../../store/useUserStore.js";
import { useProfileStore } from "../../../store/useProfileStore.js";

import PhotoGallery from "./PhotoGallery/PhotoGallery";
import ProfileBrief from "./profilebrief/ProfileBrief.jsx";
import EditProfileButton from "./EditProfileButton/EditProfileButton";
import TimelineSection from "./TimelineSection/TimelineSection.jsx";
import UpdateProfile from "../updateProfile/UpdateProfile.jsx";
import UserPosts from "./UserPosts/UserPosts.jsx";
import PDFViewer from "./PDFViewer/PDFViewer.jsx";

export default function Profile({ uid }) {
  const [activeTab, setActiveTab] = useState("profile");
  const { authUser } = useUserStore();
  const { profile, getProfile } = useProfileStore();

  const isAuthUser = authUser?._id === uid;
  const currentUser = isAuthUser ? authUser : profile;

  useEffect(() => {
    if (!isAuthUser && uid) {
      getProfile(uid);
    }
  }, [isAuthUser, uid, getProfile]);

  if (!uid || uid === "undefined") {
    return (
      <div className="w-full h-screen text-lg flex justify-center items-center text-gray-700">
        You don't have an account.
      </div>
    );
  }

  return (
    <div className=" bg-white  dark:bg-gray-900 flex flex-col lg:flex-row w-full p-12 mx-auto shadow-md space-y-6 lg:space-y-0 lg:space-x-8">
      {/* Left Section */}
      <ProfileBrief user={currentUser} />

      {/* Right Section */}
      <div className="w-full  lg:w-3/5 h-[80vh] overflow-y-auto pr-4 pl-8">
        <nav className="flex items-center justify-between text-[17px] sticky top-0 bg-white dark:bg-gray-900 z-100 py-4">
          <div className="flex space-x-12">
            {["profile", "posts", "photos", "resume"].map((tab) => (
              <button
                key={tab}
                className={`pb-2 capitalize font-medium ${
                  activeTab === tab
                    ? "border-b-3 border-teal-600 text-teal-700"
                    : "text-gray-500 cursor-pointer"
                }`}
                onClick={() => setActiveTab(tab)}>
                {tab}
              </button>
            ))}
          </div>

          {isAuthUser && (
            <EditProfileButton onEditClick={() => setActiveTab("edit")} />
          )}
        </nav>

        <div className="mt-4">
          {activeTab === "edit" && authUser && <UpdateProfile />}
          {activeTab === "resume" && (
            <PDFViewer
              pdfUrl={
                currentUser?.resume?.length > 0 ? currentUser.resume : null
              }
            />
          )}

          {activeTab === "profile" && <TimelineSection user={currentUser} />}
          {activeTab === "posts" && <UserPosts user={currentUser} />}
          {activeTab === "photos" && (
            <PhotoGallery photos={currentUser?.photos} />
          )}
        </div>
      </div>
    </div>
  );
}
