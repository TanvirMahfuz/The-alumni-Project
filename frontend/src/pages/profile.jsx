import React from "react";
import Layout from "../laytout/layout.jsx";
import ProjectsList from "../components/ProjectList.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

import JobCard from "../components/JobCard.jsx";
import ProfileHero from "../components/ProfileHero.jsx";
function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState({});
  useEffect(() => {
    (async () => {
      axios
        .get("/api/api/v1/user/info")
        .then((res) => {
          setUser(() => {
            console.log(res.data);
            return res.data;
          });
        })
        .catch((err) => {
          console.log(err);
          navigate("/log-in");
        });
    })();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 bg-white mt-8 rounded-2xl shadow-lg">
        <ProfileHero user={user} />
      </div>

      <div className="container mx-auto px-4 py-6">
        <h4 className="text-2xl font-semibold mt-6">Jobs</h4>
        <JobCard user={user} />
      </div>
      <div className="container mx-auto px-4 py-6">
        <h4 className="text-2xl font-semibold mt-6">Projects</h4>
        {user.projects && user.projects.length > 0 ? (
          <ProjectsList projects={user.projects} />
        ) : (
          <p className="text-gray-400">No projects available.</p>
        )}
      </div>
    </Layout>
  );
}

export default Profile;
