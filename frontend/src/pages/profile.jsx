import React, {useEffect, useState} from "react";
import Layout from "../laytout/layout";
import {CardDefault} from "../components/CardDefault";
import {DefaultPagination} from "../components/DefaultPagination";
import {SimplePagination} from "../components/PostPagination";
import {PostCard} from "../components/PostCard.jsx";
import {SideProfile} from "../components/sideProfile";
import {
  demoImage,
  commandlineIcon,
  skillsIcon,
  phoneIcon,
} from "../assets/images.jsx";
import {DefaultSlider} from "../components/Slider.jsx";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Typography, IconButton} from "@material-tailwind/react";
import axios from "axios";
function Demo(params) {
  const name = "Demo";
  return (
    <Layout>
      <div className="grid grid-cols-12 gap-4 m-3">
        {/* image section */}
        <div className="col-span-12 lg:col-span-4 p-3" id="side-profile">
          <div
            id="image-container"
            className="p-4 m-5 rounded-2xl max-h-100 flex flex-col justify-center items-center"
          >
            <div className=" bg-gray-300 p-4 rounded-2xl">
              <img
                src={demoImage}
                alt=""
                className="w-full h-full rounded-2xl object-cover"
              />
            </div>
            <Typography
              variant="h4"
              className="m-2 mb-0 flex justify-center items-center gap-2"
            >
              {commandlineIcon}
              <span>Software Engineer</span>
            </Typography>
          </div>
          {/* name section */}
          <div className="pr-4 pl-4 ">
            <Typography variant="h1" className="text-4xl lg:text-6xl">
              Hello I am {name}
            </Typography>
          </div>
          {/* education section */}
          <div className="p-4">
            <Typography variant="h3">Education</Typography>
            <div className="bg-gray-300 p-4 ml-4 mr-4 mt-2 rounded-2xl grid grid-cols-1 gap-6">
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
          </div>
          {/* Skills section */}
          <div className="p-4">
            <Typography variant="h3">Skills</Typography>
            <div className="bg-gray-300 p-4 ml-4 mr-4 mt-2 rounded-2xl grid grid-cols-1 gap-4">
              <div className=" ml-4 mr-4 flex flex-col justify-start items-center  xl:grid grid-cols-12 gap-3 ">
                <div className="col-span-5">
                  <div className="flex gap-3 items-center justify-start ">
                    {skillsIcon}
                    <Typography variant="h5"> C++ </Typography>
                  </div>
                </div>
                <div className="col-span-7 flex justify-start gap-4">
                  <DefaultSlider />
                </div>
              </div>
              <div className=" ml-4 mr-4 flex flex-col justify-start items-center  xl:grid grid-cols-12 gap-3 ">
                <div className="col-span-5">
                  <div className="flex gap-3 items-center">
                    {skillsIcon}
                    <Typography variant="h5"> C++ </Typography>
                  </div>
                </div>
                <div className="col-span-7 flex justify-start gap-4">
                  <DefaultSlider />
                </div>
              </div>
              <div className=" ml-4 mr-4 flex flex-col justify-start items-center  xl:grid grid-cols-12 gap-3 ">
                <div className="col-span-5">
                  <div className="flex gap-3 items-center">
                    {skillsIcon}
                    <Typography variant="h5"> C++ </Typography>
                  </div>
                </div>
                <div className="col-span-7 flex justify-start gap-4">
                  <DefaultSlider />
                </div>
              </div>
            </div>
          </div>
          {/* interest section */}
          <div className="p-4">
            <Typography variant="h3">Interest</Typography>
            <div className="bg-gray-300 p-4 ml-4 mr-4 mt-2 rounded-2xl grid grid-cols-1 xl:grid-cols-2  ">
              {/* left col */}
              <div className="col-span-1 space-y-3 ml-4 mr-4">
                <div className="flex justify-start items-center gap-4 ">
                  {skillsIcon}
                  <Typography variant="h5"> Golang </Typography>
                </div>
                <div className="flex justify-start items-center gap-4">
                  {skillsIcon}
                  <Typography variant="h5"> Golang </Typography>
                </div>
                <div className="flex justify-start items-center gap-4">
                  {skillsIcon}
                  <Typography variant="h5"> Golang </Typography>
                </div>
              </div>
              {/* right col */}
              <div className="col-span-1 space-y-3 ml-4 mr-4 mt-3 xl:mt-0">
                <div className="flex justify-start items-center gap-4">
                  {skillsIcon}
                  <Typography variant="h5"> Golang </Typography>
                </div>
                <div className="flex justify-start items-center gap-4">
                  {skillsIcon}
                  <Typography variant="h5"> Golang </Typography>
                </div>
              </div>
            </div>
          </div>
          {/* Certification section */}
          <div className="p-4">
            <Typography variant="h3">Certification</Typography>
            <div className="bg-gray-300 p-4 ml-4 mr-4 mt-2 rounded-2xl grid grid-cols-1 gap-6">
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
          </div>
        </div>

        <div className=" col-span-12 lg:col-span-8 mt-4 space-y-5">
          {/* contact section */}
          <div className="p-2 grid grid-cols-2">
            <div className="col-span-1">
              <Typography variant="h3">Contact</Typography>
              <div className="pl-4 pr-4 pt-1 space-y-1">
                <Typography className="flex gap-3 font-medium">
                  <i class="bi bi-telephone-fill"></i>
                  <span> Phone</span>
                </Typography>
                <Typography className="flex gap-3 font-medium">
                  <i class="bi bi-envelope-fill"></i>
                  <span> Email</span>
                </Typography>
                <Typography className="flex gap-3 font-medium">
                  <i class="bi bi-house-door-fill"></i>
                  <span> address</span>
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
                  <span> Facebook</span>
                </Typography>
                <Typography className="flex gap-3 font-medium">
                  <i class="bi bi-linkedin"></i>
                  <span> LinkedIn</span>
                </Typography>
                <Typography className="flex gap-3 font-medium">
                  <i class="bi bi-github"></i>
                  <span> Github</span>
                </Typography>
                <Typography className="flex gap-3 font-medium">
                  <i class="bi bi-discord"></i>
                  <span> Discord</span>
                </Typography>
              </div>
            </div>
          </div>
          {/* about section */}
          <div className="p-2">
            <Typography variant="h3">Profile</Typography>
            <div className="p-4 ml-4 mr-4 mt-4 bg-gray-300 rounded-2xl">
              <Typography className="font-medium text-gray-800 text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
                illo corporis hic nobis cum? Nobis suscipit earum ducimus
                asperiores reprehenderit, necessitatibus eaque, natus
                voluptatibus nulla sit, temporibus perferendis. Nobis iure a
                architecto id enim impedit ipsam commodi cupiditate, maxime
                reiciendis.
              </Typography>
            </div>
          </div>
          {/* work experience section */}
          <div className="p-2 ">
            <Typography className="text-4xl font-bold">
              {" "}
              Work Experience
            </Typography>
            <div className="ml-4 mr-4 mt-4 p-4 bg-gray-300 rounded-2xl">
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
            <div className="ml-4 mr-4 mt-4 p-4 bg-gray-300 rounded-2xl">
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
          </div>
          {/* Currently Working on section */}
          <div className="p-2">
            <Typography variant="h3"> Currently Working on</Typography>
            <div className="ml-4 mr-4 mt-4 p-4 bg-gray-300 rounded-2xl">
              <div className="flex justify-between">
                <div>
                  <Typography className="font-semibold text-3xl">
                    Title
                  </Typography>
                  <Typography className="text-gray-900 font-semibold text-xl">
                    Technology
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
          </div>
          {/* Have worked on section */}
          <div className="p-2">
            <Typography variant="h3"> Have Worked on</Typography>
            <div className="ml-4 mr-4 mt-4 p-4 bg-gray-300 rounded-2xl">
              <div className="flex justify-between">
                <div>
                  <Typography className="font-semibold text-3xl">
                    Title
                  </Typography>
                  <Typography className="text-gray-900 font-semibold text-xl">
                    Technology
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
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default Demo;
