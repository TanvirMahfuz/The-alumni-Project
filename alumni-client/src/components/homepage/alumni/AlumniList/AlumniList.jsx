import React, { useEffect, useState } from "react";
import List from "../List/List";
import { useUserStore } from "../../../../store/useUserStore";
import EmptyState, { PAGE_SHELL } from "../../../common/EmptyState/EmptyState.jsx";
import { FaUserGraduate } from "react-icons/fa";

function AlumniList() {
  const [sessions, setSessions] = useState({});
  const { allUsers, getAllUsers } = useUserStore();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getAllUsers().finally(() => setLoaded(true));
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

  if (loaded && Object.keys(sessions).length === 0) {
    return (
      <div className={PAGE_SHELL}>
        <EmptyState
          offsetForHeader
          icon={FaUserGraduate}
          title="No Alumni Yet"
          message="No alumni have joined yet. Once people register, they'll appear here grouped by session."
        />
      </div>
    );
  }

  return (
    <div className={PAGE_SHELL}>
      <div className="flex flex-col gap-4 mt-8 mb-8 pb-4 bg-gray-200 dark:bg-gray-900 rounded-2xl">
        {Object.entries(sessions).map(([session, users]) => (
          <List key={session} session={session} users={users} />
        ))}
      </div>
    </div>
  );
}

export default AlumniList;
