import React, {useEffect, useState} from "react";
import axios from "axios";
import ProfileCard from "../components/ProfileCard";
import Layout from "../laytout/layout";
import { CardDefault } from "../components/CardDefault";
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
        <div className="w-ful p-5 pt-10 flex justify-center ">
        <div className=" grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 items-center justify-center">
          {users.map((user) => (
          <CardDefault key={user._id} user={user} className="col-span-1"/>
            ))}</div></div>
      </Layout>
    </>
  );
}

export default StudentList;
