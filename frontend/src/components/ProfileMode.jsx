import React from "react";

import { Typography, IconButton } from "@material-tailwind/react";


function ProfileMode({ user }) {
  return (
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
                    user?.contacts?.facebook ? user.contacts.facebook : "#"
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
                    user?.contacts?.linkedin ? user.contacts.linkedin : "#"
                  }>
                  LinkedIn
                </a>
              </span>
            </Typography>
            <Typography className="flex gap-3 font-medium">
              <i class="bi bi-github"></i>
              <span>
                {" "}
                <a href={user?.contacts?.github ? user.contacts.github : "#"}>
                  Github
                </a>
              </span>
            </Typography>
            <Typography className="flex gap-3 font-medium">
              <i class="bi bi-discord"></i>
              <span>
                {" "}
                <a href={user?.contacts?.discord ? user.contacts.discord : "#"}>
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
        <Typography className="text-4xl font-bold"> Work Experience</Typography>
        {user?.jobExperience?.length > 0
          ? user.jobExperience.map((job, index) => (
              <div key={index} className="mt-4 p-4 bg-gray-300 rounded-2xl">
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
                    {job.description.length > 0 ? job.description : "N/A"}
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
              <div key={index} className=" mt-4 p-4 bg-gray-300 rounded-2xl">
                <div className="flex justify-between">
                  <div>
                    <Typography className="font-semibold text-3xl">
                      {work.title.length > 0 ? work.title : "N/A"}
                    </Typography>
                    <Typography className="text-gray-900 font-semibold text-xl">
                      {work.techStack.length > 0 ? work.techStack : "N/A"}
                    </Typography>
                  </div>
                  <div className="">
                    {work.startDate ? work.startDate : "N/A"} -{" "}
                    {work.endDate ? work.endDate : "N/A"}
                  </div>
                </div>
                <div>
                  <Typography className="font-medium text-gray-800 text-lg">
                    {work.description.length > 0 ? work.description : "N/A"}
                  </Typography>
                </div>
              </div>
            ))
          : "You don't have any currently working on yet"}
      </div>
      {/* Have worked on section */}
    </div>
  );
}

export default ProfileMode;
