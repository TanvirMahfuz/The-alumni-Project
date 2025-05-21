import React from "react";
import CreatePost from "./main-body/posts/create-post/CreatePost.jsx";
import Posts from "./main-body/posts/post/Posts.jsx";
import SidebarLeft from "./main-body/sidebar-left/SidebarLeft.jsx";
import { usePostStore } from "../../store/usePostStore.js";
function Mainbody() {
  const { allPosts, getAllPosts } = usePostStore();
  const [sidebarToggler, setSidebarToggler] = React.useState("users");
  React.useEffect(() => {
    getAllPosts();
  }, []);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-8 xl:grid-cols-9 mt-4 ">
      <div className="h-screen w-full col-span-1 md:col-span-8 xl:col-span-6 px-4 overflow-y-auto">
        <CreatePost />
        {allPosts &&
          allPosts.map((post) => <Posts key={post._id} post={post} />)}
      </div>

      <div className="hidden lg:col-span-3 xl:block">
        <SidebarLeft {...{ sidebarToggler, setSidebarToggler }} />
      </div>
    </div>
  );
}

export default Mainbody;
