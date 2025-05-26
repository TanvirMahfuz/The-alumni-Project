import React from "react";

function Tabs() {
  const tabs = [
    { name: "Profile" },
    { name: "Posts" },
    { name: "About" },
    { name: "Contact" },
  ];

  const [activeTab, setActiveTab] = React.useState("profile");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    console.log(activeTab)
  };

  return (
    <div className="w-full">
      <nav className="flex space-x-4 border-b pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`py-2 px-4 rounded-lg capitalize ${
              activeTab === tab.name.toLowerCase()
                ? "bg-[#daf2f0] text-teal-800"
                : "text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => handleTabClick(tab.name.toLowerCase())}>
            {tab.name}
          </button>
        ))}
      </nav>

      <div className="mt-4">
        {activeTab === "profile" && <div>Profile Content</div>}
        {activeTab === "posts" && <div>Posts Content</div>}
        {activeTab === "about" && <div>About Content</div>}
        {activeTab === "contact" && <div>Contact Content</div>}
      </div>
    </div>
  );
}

export default Tabs;
