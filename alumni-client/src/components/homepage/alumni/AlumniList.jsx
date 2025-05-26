import React, { useEffect, useState } from "react";
import List from "./List";
import { useUserStore } from "../../../store/useUserStore";

function AlumniList() {
  const [sessions, setSessions] = useState({});
  const { allUsers, getAllUsers } = useUserStore();

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    const sessionsMap = {};
    if (allUsers) {
      allUsers.forEach((user) => {
        if (sessionsMap[user.session]) {
          sessionsMap[user.session].push(user);
        } else {
          sessionsMap[user.session] = [user];
        }
      });
      setSessions(sessionsMap);
    }
  }, [allUsers]);

  return (
    <div className="h-screen overflow-y-auto">
      <div className="flex flex-col gap-4 mb-8 bg-white">
        {Object.entries(sessions).map(([session, users]) => (
          <List key={session} session={session} users={users} />
        ))}
      </div>
    </div>
  );
}

export default AlumniList;
