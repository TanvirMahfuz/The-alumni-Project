import React, { useState } from "react";
import Tag from "../../../../common/Tag/Tag.jsx";
import EmptyState from "../../../../common/EmptyState/EmptyState.jsx";
import { FaUserFriends } from "react-icons/fa";

function Users({ users, emptyTitle = "No users yet", emptyMessage = "People who join will show up here." }) {
  const [select, setSelect] = useState(null);
  if (!users?.length) {
    return <EmptyState compact icon={FaUserFriends} title={emptyTitle} message={emptyMessage} />;
  }
  // console.log("Users component rendered with users:", users);
  return (
    <div className="m-2 space-y-1 overflow-y-auto h-[30rem] transform transition-all ease-in-out duration-1000">
      {users.map((item, index) => (
        <Tag
          key={item._id ?? index}
          imageSrc={item.image || "/avatar.png"}
          label={item.name ?? "Full Name"}
          selected={select === item._id}
          onClick={() => setSelect(item._id === select ? null : item._id)}
        />
      ))}
    </div>
  );
}

export default Users;
