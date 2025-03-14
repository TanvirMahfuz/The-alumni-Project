import React, { useEffect, useState } from "react";
import Layout from "../laytout/layout";
import { PostCard } from "../components/PostCard.jsx";
import axios from "axios";
import { Textarea, Typography, Button } from "@material-tailwind/react";
import { profilePlaceHolder, skillsIcon } from "../assets/images.jsx";
import { CreatePost2 } from "../components/CreatePost2.jsx";
function Demo() {
  const [array, setArray] = useState([]);
  const [valueArray, setValueArray] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/api/api/v1/post/allPosts");
        setValueArray(res.data.data);
        setArray(res.data.data.slice(0, 12));
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
      try {
        const res = await axios.get("/api/api/v1/user/currentUser");
        console.log(res.data.data);
        setCurrentUser(res.data.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
      try {
        const res = await axios.get("/api/api/v1/user/allUsers");
        console.log("users : ", res.data);
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    })();
  }, []);

  return (
    <Layout>
      <div className="mt-4 h-screen w-screen flex items-center justify-center overflow-auto">
        <div className="grid grid-cols-12 w-full mt-4">
          <div className="col-span-4 p-4 pt-0 mb-4 xl:col-span-3 hidden lg:block overflow-y-auto">
            <div className=" p-4  mt-6 h-screen rounded-3xl bg-gray-50 shadow-md">
              {/* Side Profile */}
              <div className="bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center">
                  <img
                    src="src/assets/profile.jpg"
                    alt=""
                    className="rounded-2xl"
                  />
                </div>
                {currentUser ? (
                  <div>
                    {/* Check if the image is null or empty */}
                    {currentUser?.image === null ||
                    currentUser?.image === "" ? (
                      // Fallback image when `currentUser.image` is null or empty
                      <div className="w-full flex justify-center transform translate-y-[-50px]">
                        <img
                          src="src/assets/profile.jpg"
                          alt="Profile Placeholder"
                          className="h-30 w-30 rounded-full border-8 border-white"
                        />
                      </div>
                    ) : (
                      // Display actual image when it's available
                      <div className="w-full max-h-max  flex flex-col items-center justify-center transform translate-y-[-50px]">
                        <img
                          src={currentUser.image}
                          alt="Profile"
                          className="h-30 w-30 rounded-full border-8 border-white"
                        />
                        <Typography className="text-3xl font-semibold mt-2">
                          {currentUser.name}
                        </Typography>
                        <Typography className="text-lg text-center text-gray-700 font-normal">
                          {currentUser.bio}bg-amber-50 flex flex-col
                          items-center justify-center{" "}
                        </Typography>
                      </div>
                    )}
                  </div>
                ) : (
                  // Fallback when `currentUser` is not available
                  <div className="w-full flex justify-center transform translate-y-[-50px]">
                    <img
                      src="src/assets/profile.jpg"
                      alt="Profile Placeholder"
                      className="h-30 w-30 rounded-full border-8 border-white"
                    />
                  </div>
                )}
                <Button className="w-full bg-gray-900 transform translate-y-[-10px]">
                  My Profile
                </Button>
              </div>
              {/* Skills */}
              <div className="p-4 mt-6">
                {currentUser ? (
                  <div>
                    <Typography className="text-2xl font-semibold">
                      Skills
                    </Typography>
                    <div className="flex flex-wrap mt-4 max-h-max">
                      {currentUser.skills.map((skill, index) => (
                        <Typography
                          key={index}
                          className="text-sm font-semibold text-white bg-gray-900 rounded-lg p-2 mr-2 mb-2">
                          {skill.title}
                        </Typography>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              {/* Education */}
              <div className="p-4 mb-4">
                {currentUser ? (
                  <div>
                    <Typography className="text-2xl font-semibold">
                      Education
                    </Typography>
                    <div className="flex flex-wrap mt-4 bg-gray-300">
                      {currentUser.education.map((education, index) => (
                        <div className="border-l-2 pl-2">
                          <Typography variant="h4" className="leading-tight">
                            {education.degree}
                          </Typography>
                          <Typography className="font-medium text-gray-800 text-xl">
                            {education.institute}
                          </Typography>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
          <div className="h-screen col-span-12 lg:col-span-8 xl:col-span-6 overflow-auto p-2 px-0 mt-4 flex flex-col items-center">
            {/* Post */}
            <CreatePost2 currentUser={currentUser} />
            {/* posts */}
            {array.map((element) => (
              <div key={element._id} className="w-full mt-2">
                <PostCard item={element} />
              </div>
            ))}
          </div>
          <div className="col-span-3 hidden xl:block ">
            <div className="m-4 p-4 pb-0 mt-6 h-screen rounded-3xl bg-gray-50 shadow-md overflow-auto">
              {users ? (
                <div>
                  <Typography className="mt-4 ml-4 text-2xl font-semibold">
                    Users
                  </Typography>
                  <div className="mt-6 max-h-max">
                    {users.map((user, index) => (
                      <div className="bg-white rounded-3xl p-4 mb-4 shadow-lg">
                        <div className="grid grid-cols-4 ">
                          <div className="col-span-1 flex items-start justify-center">
                            <img
                              src={
                                user.image
                                  ? user.image !== ""
                                    ? user.image
                                    : { profilePlaceHolder }
                                  : { profilePlaceHolder }
                              }
                              alt=""
                              className="w-15 h-15 rounded-full"
                            />
                          </div>
                          <div className="col-span-3 pl-2">
                            <Typography className="text-2xl font-semibold">
                              {user.name}
                            </Typography>
                            <Typography className="text-md font-normal text-gray-700 ">
                              {user.bio}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>{console.log("no users found")}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Demo;
