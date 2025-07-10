import React from "react";
import Line from "./list-components/Line";
import ProfileCard from "./list-components/ProfileCard";
function List({ session, users }) {
  const [collapsed, setCollapsed] = React.useState(true);
  const customClass = collapsed
    ? "flex px-8 py-4 h-full w-full justify-start gap-8 overflow-x-scroll transition-all duration-500"
    : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-8 transition-all duration-500";
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      <Line onCollapse={toggleCollapsed} session={session} />
      <div className={customClass}>
        {users.map((user) => (
          <ProfileCard key={user._id} user={user} />
        ))}
      </div>
    </>
  );
}

export default List;
