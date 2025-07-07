import React, { useState, useEffect } from "react";

function Tabs() {
  const tabs = [
    { name: "Profile" },
    { name: "Posts" },
    { name: "About" },
    { name: "Contact" },
  ];

  const [activeTab, setActiveTab] = useState("profile");

  const handleTabClick = (tab) => {
    console.log("Tab clicked:", tab);
    setActiveTab(tab.toLowerCase());

  };

  useEffect(() => {
    console.log("Active tab changed to:", activeTab);
  }, [activeTab]);

  return (
    <div className="w-full">
      <nav className="flex space-x-4 border-b pb-2">
        {tabs.map((tab) => {
          const tabKey = tab.name.toLowerCase();
          return (
            <button
              key={tab.name}
              className={`py-2 px-4 rounded-lg  ${
                activeTab === tabKey
                  ? "bg-[#daf2f0] text-teal-800"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => handleTabClick(tab.name)}>
              {tab.name}
            </button>
          );
        })}
      </nav>

      <div className="mt-4">
        {console.log(activeTab == "profile")}
        {activeTab == "profile" && <div>Profile Content</div>}
        {activeTab == "posts" && <div>Posts Content</div>}
        {activeTab == "about" && <div>About Content</div>}
        {activeTab == "contact" && <div>Contact Content</div>}
      </div>
    </div>
  );
}

export default Tabs;
