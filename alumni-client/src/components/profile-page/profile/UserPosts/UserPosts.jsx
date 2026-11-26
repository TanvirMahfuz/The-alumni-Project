import React from "react";

import Post from "../../../homepage/main-body/posts/post/Posts.jsx";
import { useProfileStore } from "../../../../store/useProfileStore";
import TabEmpty from "../TabEmpty/TabEmpty.jsx";

function UserPosts({ user }) {
  const { getUserPosts, isLoading, posts } = useProfileStore();

  React.useEffect(() => {
    if (!user) return;
    getUserPosts(user._id);
  }, [getUserPosts, user]);

  if (!isLoading && !posts?.length) {
    return <TabEmpty title="Posts" message="No posts shared yet." />;
  }

  return (
    <div className="mt-6 bg-white dark:bg-gray-900 my-4 p-4 rounded-2xl min-h-[100px]">
      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        posts.map((post) => <Post key={post._id} post={post} />)
      )}
    </div>
  );
}

export default UserPosts;
