import React, { useState } from "react";
import Tag from "../../../../common/Tag.jsx";

function Users({ users }) {
  const [select, setSelect] = useState(null);

  return (
    <div className="m-2 space-y-1 overflow-y-auto h-[30rem] transform transition-all ease-in-out duration-1000">
      {users.map((item, index) => (
        <Tag
          key={item._id ?? index}
          imageSrc={item.image ?? "./avatar.png"}
          label={item.name ?? "Full Name"}
          selected={select === item._id}
          onClick={() => setSelect(item._id === select ? null : item._id)}
        />
      ))}
    </div>
  );
}

export default Users;
