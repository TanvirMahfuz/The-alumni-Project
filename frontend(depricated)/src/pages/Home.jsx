import React, { useEffect, useState } from "react";
import Layout from "../laytout/layout";
import { PostCard } from "../components/PostCard.jsx";
import { CreatePost2 } from "../components/CreatePost2.jsx";
import HomePageSideProfile  from "../components/HomePageSideProfile.jsx";
import HomePageUserContainer from "../components/HomePageUserContainer.jsx";
import axios from "axios";
import { useGeneralStore } from "../store/useGeneralStore.js";
import { useAuthStore } from "../store/useUserStore.js";

function Home() {
  const { allUsers, getUsers, allPosts, getPosts  } =
    useGeneralStore();
  const { authUser, socket } =
    useAuthStore();
    useEffect(() => {
    getUsers();
    getPosts();
  }, [getUsers, getPosts, ]);
  return (
    <>
      {socket && console.log("socket", authUser)}
      <div className="mt-4 h-screen w-screen flex items-center justify-center">
        <div className="grid grid-cols-12 w-full mt-4">
          <div className="col-span-4 p-4 pt-0 mb-4 xl:col-span-3 hidden lg:block">
            <HomePageSideProfile currentUser={authUser} />
          </div>
          <div className="h-screen col-span-12 lg:col-span-8 xl:col-span-6 gap-2 overflow-auto p-2 px-0 mt-4 flex flex-col items-center">
            <CreatePost2 currentUser={authUser} />
            {allPosts.length>0 && allPosts.map((element) => (
              <div key={element._id} className="w-full">
                <PostCard item={element} />
              </div>
            ))}
          </div>
          <div className="col-span-3 hidden xl:block ">
            <HomePageUserContainer users={allUsers} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
