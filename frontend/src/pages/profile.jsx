import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import Layout from "../laytout/layout";
import {DefaultPagination} from "../components/DefaultPagination";
import {
  demoImage,
  commandlineIcon,
  skillsIcon,
  phoneIcon,
} from "../assets/images.jsx";
import {Typography, IconButton} from "@material-tailwind/react";
import axios from "axios";
import { PostCard } from "../components/PostCard.jsx";

function Demo() {
  const [user, setUser] = useState({});
  const [mode, setMode] = useState({
    post: false,
    profile: true,
    edit: false,
  });
  const [posts, setPosts] = useState([]);
  const handleMode = (e) => {
    console.log(e.target.dataset.value);
    setMode({
      post: false,
      profile: false,
      edit: false,
      [e.target.dataset.value]: true,
    })
    
  };
  const location = useLocation(); 
  const queryParams = new URLSearchParams(location.search); 
  const id = queryParams.get("id");
  console.log(id);
  useEffect(() => {
    axios
      .get("api/api/v1/user/info?id=" + id)
      .then((res) => {
        console.log(res.data.user);
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get("api/api/v1/user/userPosts?id=" + id)
      .then((res) => {
        console.log(res.data);
        setPosts(res.data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  

  return (
    <Layout>
      <div className="grid grid-cols-12 m-3 max-h-screen overflow-auto">
        {/* image section */}
        <div
          className="col-span-12 lg:col-span-4 p-3  max-h-screen overflow-y-auto"
          id="side-profile">
          <div
            id="image-container"
            className="p-4 m-5 rounded-2xl max-h-100 flex flex-col justify-center items-center overflow-hidden">
            <div className="bg-gray-300 p-4 h-100 w-100 rounded-2xl overflow-hidden flex justify-center items-center">
              <img
                src={user?.image !== "" ? user.image : demoImage}
                alt="User Profile"
                className="w-auto h-full rounded-2xl object-cover"
              />
            </div>
            <Typography
              variant="h4"
              className="m-2 mb-0 flex justify-center items-center gap-2">
              {user?.currentPost?.description ? (
                <>
                  {commandlineIcon}
                  <span>{user.currentPost.description}</span>
                </>
              ) : (
                <>
                  {commandlineIcon}
                  <span>Unemployed</span>
                </>
              )}
            </Typography>
          </div>

          {/* name section */}
          <div className="pr-4 pl-4 ">
            <Typography variant="h1" className="text-4xl lg:text-6xl">
              Hello I am {user?.name != "" ? user.name : name}
            </Typography>
          </div>
          {/* education section */}
          <div className="p-4">
            <Typography variant="h3">Education</Typography>
            <div className="bg-gray-300 p-4  mt-2 rounded-2xl grid grid-cols-1 gap-6">
              {user.education?.length > 0 ? (
                <>
                  {user.education.map((edu, index) => (
                    <div className="border-l-2 pl-2" key={index}>
                      <Typography className="flex bg-gray-900 text-white pl-2 pr-2 rounded-2xl max-w-max mb-4">
                        {edu.startDate ? edu.startDate : "N/A"}-
                        {edu.endDate ? edu.endDate : "N/A"}
                      </Typography>
                      <Typography variant="h4" className="leading-tight">
                        {edu.degree ? edu.degree : "N/A"}
                      </Typography>
                      <Typography className="font-medium text-gray-800 text-xl">
                        {edu.institute ? edu.institute : "N/A"}
                      </Typography>
                    </div>
                  ))}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          {/* Skills section */}
          <div className="p-4">
            <Typography variant="h3">Skills</Typography>
            <div className="bg-gray-300 p-4  mt-2 rounded-2xl grid grid-cols-1 gap-4">
              {user.skills?.length > 0 ? (
                <>
                  {user.skills.map((skill, index) => (
                    <div className="flex gap-3 items-center justify-start ">
                      {skill.image != "" ? skill.image : skillsIcon}
                      <Typography variant="h5">
                        {" "}
                        {skill.title != "" ? skill.title : ""}{" "}
                      </Typography>
                    </div>
                  ))}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          {/* interest section */}
          <div className="p-4">
            {user?.futureInterests?.length > 0 ? (
              <>
                <Typography variant="h3">Interests</Typography>
                <div className="bg-gray-300 p-4 mt-2 rounded-2xl grid grid-cols-1 gap-4">
                  {user.futureInterests.map((interest, index) => (
                    <div className="flex gap-3 items-center justify-start ">
                      {skillsIcon}
                      <Typography variant="h5">
                        {" "}
                        {interest != "" ? interest : ""}{" "}
                      </Typography>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          {/* Certification section */}
          {/* <div className="p-4">
            <Typography variant="h3">Certification</Typography>
            <div className="bg-gray-300 p-4  mt-2 rounded-2xl grid grid-cols-1 gap-6">
              <div className="border-l-2 pl-2">
                <Typography className="flex bg-gray-900 text-white pl-2 pr-2 rounded-2xl max-w-max mb-4">
                  2020-2025
                </Typography>
                <Typography variant="h4" className="leading-tight">
                  BSc in Information and Communication Technology
                </Typography>
                <Typography className="font-medium text-gray-800 text-xl">
                  Mawlana Bhasani Science and Technology University
                </Typography>
              </div>
              <div className="border-l-2 pl-2">
                <Typography className="flex bg-gray-900 text-white pl-2 pr-2 rounded-2xl max-w-max mb-4">
                  2020-2025
                </Typography>
                <Typography variant="h4" className="leading-tight">
                  BSc in Information and Communication Technology
                </Typography>
                <Typography className="font-medium text-gray-800 text-xl">
                  Mawlana Bhasani Science and Technology University
                </Typography>
              </div>
            </div>
          </div> */}
        </div>

        <div className=" mt-6 col-span-12 lg:col-span-8 space-y-5 border-2 rounded-3xl max-h-screen overflow-y-scroll">
          <div className="flex gap-8 justify-start m-4 mb-1 px-4">
            <div>
              {mode.profile ? (
                <Typography className="bg-gray-900 py-2 px-4 rounded-2xl text-white font-semibold text-lg">
                  Profile
                </Typography>
              ) : (
                <Typography
                  className=" py-2 px-4 rounded-2xl font-semibold text-lg"
                  onClick={handleMode}
                  data-value="profile">
                  Profile
                </Typography>
              )}
            </div>
            <div>
              {mode.post ? (
                <Typography className="bg-gray-900 py-2 px-4 rounded-2xl text-white font-semibold text-lg">
                  My Posts
                </Typography>
              ) : (
                <Typography
                  className=" py-2 px-4 rounded-2xl font-semibold text-lg"
                  onClick={handleMode}
                  data-value="post">
                  My Posts
                </Typography>
              )}
            </div>
            <div>
              {mode.edit ? (
                <Typography className="bg-gray-900 py-2 px-4 rounded-2xl text-white font-semibold text-lg">
                  Edit Profile
                </Typography>
              ) : (
                <Typography
                  className=" py-2 px-4 rounded-2xl font-semibold text-lg"
                  onClick={handleMode}
                  data-value="edit">
                  Edit Profile
                </Typography>
              )}
            </div>
          </div>
          <hr className="mx-4" />
          {mode.profile && (
            <div className="p-4 px-8 space-y-8 ">
              {/* contact section */}
              <div className=" grid grid-cols-2">
                <div className="col-span-1">
                  <Typography variant="h3">Contact</Typography>
                  <div className="pl-4 pr-4 pt-1 space-y-1">
                    <Typography className="flex gap-3 font-medium">
                      <i class="bi bi-telephone-fill"></i>
                      <span> Phone</span>
                    </Typography>
                    <Typography className="flex gap-3 font-medium">
                      <i class="bi bi-envelope-fill"></i>
                      <span> {user?.email ? user.email : "email"}</span>
                    </Typography>
                    <Typography className="flex gap-3 font-medium">
                      <i class="bi bi-house-door-fill"></i>
                      <span> {user?.address ? user.address : "address"}</span>
                    </Typography>
                    <Typography className="flex gap-3 font-medium">
                      <i class="bi bi-browser-chrome"></i>
                      <span> Portfolio</span>
                    </Typography>
                  </div>
                </div>
                <div className="col-span-1">
                  {" "}
                  <Typography variant="h3">Social</Typography>
                  <div className="pl-4 pr-4 pt-1 space-y-1">
                    <Typography className="flex gap-3 font-medium">
                      <i class="bi bi-facebook"></i>
                      <span>
                        {" "}
                        <a
                          href={
                            user?.contacts?.facebook
                              ? user.contacts.facebook
                              : "#"
                          }>
                          Facebook
                        </a>
                      </span>
                    </Typography>
                    <Typography className="flex gap-3 font-medium">
                      <i class="bi bi-linkedin"></i>
                      <span>
                        {" "}
                        <a
                          href={
                            user?.contacts?.linkedin
                              ? user.contacts.linkedin
                              : "#"
                          }>
                          LinkedIn
                        </a>
                      </span>
                    </Typography>
                    <Typography className="flex gap-3 font-medium">
                      <i class="bi bi-github"></i>
                      <span>
                        {" "}
                        <a
                          href={
                            user?.contacts?.github ? user.contacts.github : "#"
                          }>
                          Github
                        </a>
                      </span>
                    </Typography>
                    <Typography className="flex gap-3 font-medium">
                      <i class="bi bi-discord"></i>
                      <span>
                        {" "}
                        <a
                          href={
                            user?.contacts?.discord
                              ? user.contacts.discord
                              : "#"
                          }>
                          Discord
                        </a>
                      </span>
                    </Typography>
                  </div>
                </div>
              </div>
              {/* about section */}
              <div className="">
                <Typography variant="h3">Profile</Typography>
                <div className="p-4  mt-4 bg-gray-300 rounded-2xl">
                  <Typography className="font-medium text-gray-800 text-lg">
                    {user?.bio ? user.bio : "you haven't updated your bio yet"}
                  </Typography>
                </div>
              </div>
              {/* work experience section */}
              <div className=" ">
                <Typography className="text-4xl font-bold">
                  {" "}
                  Work Experience
                </Typography>
                {user?.jobExperience?.length > 0
                  ? user.jobExperience.map((job, index) => (
                      <div
                        key={index}
                        className="mt-4 p-4 bg-gray-300 rounded-2xl">
                        <div className="flex justify-between">
                          <div>
                            <Typography className="font-semibold text-3xl">
                              {job.title.length > 0 ? job.title : "N/A"}
                            </Typography>
                            <Typography className="text-gray-900 font-semibold text-xl">
                              {job.company.length > 0 ? job.company : "N/A"}
                            </Typography>
                          </div>
                          <div>
                            <Typography>
                              {job.startDate ? job.startDate : "N/A"} -{" "}
                              {job.endDate ? job.endDate : "N/A"}
                            </Typography>
                          </div>
                        </div>
                        <div>
                          <Typography className="font-medium text-gray-800 text-lg">
                            {job.description.length > 0
                              ? job.description
                              : "N/A"}
                          </Typography>
                        </div>
                      </div>
                    ))
                  : "You don't have any work experience yet"}

                {/* <div className=" mt-4 p-4 bg-gray-300 rounded-2xl">
              <div className="flex justify-between">
                <div>
                  <Typography className="font-semibold text-3xl">
                    Post
                  </Typography>
                  <Typography className="text-gray-900 font-semibold text-xl">
                    Company
                  </Typography>
                </div>
                <div className="">
                  <Typography>time period</Typography>
                </div>
              </div>
              <div>
                <Typography className="font-medium text-gray-800 text-lg">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde,
                  quia aliquam fugiat quis minima animi rem est quaerat modi
                  repudiandae incidunt amet laborum corrupti facere, eveniet
                  velit. Accusamus a, ea incidunt beatae ratione rerum provident
                  necessitatibus placeat fugit tenetur iure.
                </Typography>
              </div>
            </div>
            <div className=" mt-4 p-4 bg-gray-300 rounded-2xl">
              <div className="flex justify-between">
                <div>
                  <Typography className="font-semibold text-3xl">
                    Post
                  </Typography>
                  <Typography className="text-gray-900 font-semibold text-xl">
                    Company
                  </Typography>
                </div>
                <div className="">
                  <Typography>time period</Typography>
                </div>
              </div>
              <div>
                <Typography className="font-medium text-gray-800 text-lg">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde,
                  quia aliquam fugiat quis minima animi rem est quaerat modi
                  repudiandae incidunt amet laborum corrupti facere, eveniet
                  velit. Accusamus a, ea incidunt beatae ratione rerum provident
                  necessitatibus placeat fugit tenetur iure.
                </Typography>
              </div>
            </div> */}
              </div>
              {/* Currently Working on section */}
              <div className="">
                <Typography variant="h3"> Currently Working on</Typography>
                {user?.currentlyWorkingIn?.length > 0
                  ? user.currentlyWorkingIn.map((work, index) => (
                      <div
                        key={index}
                        className=" mt-4 p-4 bg-gray-300 rounded-2xl">
                        <div className="flex justify-between">
                          <div>
                            <Typography className="font-semibold text-3xl">
                              {work.title.length > 0 ? work.title : "N/A"}
                            </Typography>
                            <Typography className="text-gray-900 font-semibold text-xl">
                              {work.techStack.length > 0
                                ? work.techStack
                                : "N/A"}
                            </Typography>
                          </div>
                          <div className="">
                            {work.startDate ? work.startDate : "N/A"} -{" "}
                            {work.endDate ? work.endDate : "N/A"}
                          </div>
                        </div>
                        <div>
                          <Typography className="font-medium text-gray-800 text-lg">
                            {work.description.length > 0
                              ? work.description
                              : "N/A"}
                          </Typography>
                        </div>
                      </div>
                    ))
                  : "You don't have any currently working on yet"}
              </div>
              {/* Have worked on section */}
            </div>
          )}
          {mode.post && (
            <div className="p-4 px-8 space-y-8">
              {posts.map((item, index) => console.log(item))}
              {posts.map((item, index) => (
                <PostCard key={index} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
export default Demo;
