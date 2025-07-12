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
      <div className="flex flex-col gap-4 mt-8 mb-8 pb-4 bg-gray-200 dark:bg-gray-900 rounded-2xl">
        {Object.entries(sessions).map(([session, users]) => (
          <List key={session} session={session} users={users} />
        ))}
      </div>
    </div>
  );
}

export default AlumniList;
