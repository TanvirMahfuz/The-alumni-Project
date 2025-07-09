import { useState } from "react";
import PhotoGallery from "./PhotoGallery";
// import Profile from "./Profile";
import ProfileBrief from "./profilebrief/ProfileBrief.jsx";
import EditProfileButton from "./EditProfileButton";
import { useUserStore } from "../../../store/useUserStore.js";
import TimelineSection from "./TimelineSection.jsx";
import UpdateProfile from "../updateProfile/UpdateProfile.jsx";
import UserPosts from "./UserPosts.jsx";
export default function ProDem({ isAuthUser = true }) {
  const [activeTab, setActiveTab] = useState("profile");
  const { authUser } = useUserStore();

  const user = {
        name: "Alice Johnson",
        photo: "", // or URL
        location: "San Francisco, CA",
        bio: "Front-end engineer with a passion for UI, animations, and accessibility.",
        isEmployed: true,
        job: {
            title: "Senior Frontend Developer",
            company: "TechCorp",
            since: "2021",
        },
        university: "Stanford University",
        skills: ["React", "Tailwind CSS", "JavaScript", "Accessibility", "Framer Motion"]
  };

  const educationData = [
    {
      from: "2018",
      to: "2022",
      degree: "Bachelor of Science in Computer Science",
      institution: "MBSTU",
    },
    {
      from: "2016",
      to: "2018",
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Dhaka College",
    },
    {
      from: "2014",
      to: "2016",
      degree: "Secondary School Certificate (SSC)",
      institution: "Ideal School and College",
    },
  ];
  
  return (
    <div className=" bg-white flex flex-col lg:flex-row w-full p-12 mx-auto shadow-md space-y-6 lg:space-y-0 lg:space-x-8">
      {/* Left Section */}
      <ProfileBrief user={authUser} />

      {/* Right Section */}
      <div className="w-full lg:w-3/5 h-[80vh] overflow-y-auto pr-4 pl-8">
        <nav className="flex items-center justify-between text-[17px] sticky top-0 bg-white z-10 py-4">
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

          {/* Edit button shows only if on 'profile' tab AND viewing own profile */}
          {isAuthUser?._id === user?._id && (
            <EditProfileButton onEditClick={() => setActiveTab("edit")} />
          )}
        </nav>

        <div className="mt-4">
          {activeTab === "edit" && authUser && (
            <UpdateProfile/>
          )}
          {activeTab === "profile" && authUser && (
            <TimelineSection user={authUser} />
          )}
          {activeTab === "posts" && (
            <UserPosts/>
          )}
          {activeTab === "photos" && (
            <PhotoGallery
              photos={
                user.photos?.length ? (
                  user.photos
                ) : (
                  <p className="text-gray-500">No photos uploaded yet.</p>
                )
              }
            />
          )}
          {activeTab === "resume" && (
            <p className="text-gray-500">No posts yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}