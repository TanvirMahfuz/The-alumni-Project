import React from "react";

import Tag from "../../common/Tag.jsx";
import { Link } from "react-router-dom";

function Menublock({ menuItems, selectedTag, setSelectedTag }) {
  return (
    <div className="bg-white rounded-2xl flex flex-col justify-center items-start gap-2 p-4">
      {menuItems.map((item) => (
        <Tag
          key={item.id}
          Icon={item.Icon}
          label={item.label}
          selected={selectedTag === item.id}
          onClick={() => setSelectedTag(item.id)}
        />
      ))}
    </div>
  );
}

export default Menublock;
