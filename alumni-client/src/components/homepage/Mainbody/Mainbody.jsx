import React from "react";
import CreatePost from "../main-body/posts/create-post/CreatePost.jsx";
import Posts from "../main-body/posts/post/Posts.jsx";
import SidebarLeft from "../main-body/sidebar-left/SidebarLeft.jsx";
import { usePostStore } from "../../../store/usePostStore.js";
import EmptyState from "../../common/EmptyState/EmptyState.jsx";
import { FaRegNewspaper } from "react-icons/fa";
function Mainbody() {
  const { allPosts, getAllPosts } = usePostStore();
  const [sidebarToggler, setSidebarToggler] = React.useState("users");
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    getAllPosts().finally(() => setLoaded(true));
  }, []);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-8 xl:grid-cols-9 mt-4 ">
      <div className="h-screen w-full col-span-1 md:col-span-8 xl:col-span-6 px-4 overflow-y-auto">
        <CreatePost />
        {loaded && !allPosts?.length && (
          <EmptyState
            icon={FaRegNewspaper}
            title="No Posts Yet"
            message="Nothing has been shared yet. Be the first to start a conversation by creating a post above."
          />
        )}
        {allPosts &&
          allPosts.map((post) => (
            <Posts className="mt-20" key={post._id} post={post} />
          ))}
      </div>

      <div className="hidden lg:col-span-3 xl:block">
        <SidebarLeft {...{ sidebarToggler, setSidebarToggler }} />
      </div>
    </div>
  );
}

export default Mainbody;
