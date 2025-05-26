import { useState } from "react";
import Profile from "./Profile";
import ProfileBrief from "./ProfileBrief";
import EditProfileButton from "./EditProfileButton";
import { useUserStore } from "../../store/useUserStore";

function ProDem() {
  const [activeTab, setActiveTab] = useState("profile");
  const { authUser } = useUserStore();

  if (!authUser) return <p>Loading...</p>;

  return (
    <>
      <nav className="flex items-center justify-between text-[17px] sticky top-0 bg-white z-10 py-4">
        <div className="flex space-x-12">
          {["profile", "posts", "contact"].map((tab) => (
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

        {activeTab === "profile" && <EditProfileButton />}
      </nav>

      <div className="mt-4">
        {activeTab === "profile" && <Profile user={authUser} />}
        {activeTab === "posts" && (
          <p className="text-gray-500">No posts yet.</p>
        )}
        {activeTab === "contact" && (
          <div className="text-gray-600 space-y-2">
            {authUser?.contacts?.github && (
              <p>
                <strong>GitHub:</strong>{" "}
                <a
                  href={authUser.contacts.github}
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noreferrer">
                  {authUser.contacts.github}
                </a>
              </p>
            )}
            {authUser?.contacts?.linkedin && (
              <p>
                <strong>LinkedIn:</strong>{" "}
                <a
                  href={authUser.contacts.linkedin}
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noreferrer">
                  {authUser.contacts.linkedin}
                </a>
              </p>
            )}
            {authUser?.contacts?.facebook && (
              <p>
                <strong>Facebook:</strong>{" "}
                <a
                  href={authUser.contacts.facebook}
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noreferrer">
                  {authUser.contacts.facebook}
                </a>
              </p>
            )}
            {authUser?.contacts?.portfolio && (
              <p>
                <strong>Portfolio:</strong>{" "}
                <a
                  href={authUser.contacts.portfolio}
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noreferrer">
                  {authUser.contacts.portfolio}
                </a>
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default ProDem;
