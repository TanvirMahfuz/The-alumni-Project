import React, {useEffect, useState} from "react";
import axios from "axios";
import ProfileCard from "../components/ProfileCard";
import Layout from "../laytout/layout";
function StudentList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/api/api/v1/user/allUsers")
      .then((res) => {
        console.log(res.data);
        setUsers(res.data); // Set the users data
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); // Empty dependency array to ensure this runs only once

  return (
    <>
      <Layout>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {users.length > 0 ? (
            users.map((user) => (
              <div key={user._id} className="min-w-100 flex justify-center">
                <ProfileCard user={user} />
              </div>
            ))
          ) : (
            <p>No users found</p> // Show message if no users are present
          )}
        </div>
      </Layout>
    </>
  );
}

export default StudentList;
