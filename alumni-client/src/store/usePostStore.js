
import { create } from "zustand";

export const usePostStore = create((set , get) => ({
  allPosts: [],
  selectedPost: null,
  completeComments: [],
  isCreatingPost: false,

  setAllPosts: (posts) => set({ allPosts: posts }),
  setSelectedPost: (postId) => set({ selectedPost: postId }),

  getAllPosts: async () => {
    const posts = await fetch("/api/post")
      .then((res) => res.json())
      .then((data) => data.data)
      .catch((err) => console.log(err));
    set({ allPosts: posts });
  },

  getCompleteComments: async (comments) => {
    if (!comments) {
      return [];
    }

    const completeComments = await Promise.all(
      comments.map(async (comment) => {
        const author = await fetch(`/api/user/info/${comment.author}`)
          .then((res) => res.json())
          .then((data) => data.user)
          .catch((err) => console.log(err));
        return { ...comment, author };
      })
    );
    return completeComments;
  },

  createPost: async (post) => {
    set({ isCreatingPost: true });
    try {
      const response = await fetch("/api/post/createPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      const res = await response.json();
      set({ isCreatingPost: false });
      await get().getAllPosts()
      return res.data;
    } catch (error) {
      console.log(error);
      set({ isCreatingPost: false });
    } finally {
      set({ isCreatingPost: false });
    }
  },

  //accidentally implemented to update the entire post. which means instead of returning a new comment it will return a updated post
  commentOnPost: async (postId,comment) => {
    try {
      const response = await fetch(`/api/post/addComments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId,comment }),
    });
    const res = await response.json();
    return res.data;

    } catch (error) {
      console.log(error);
    }
    
  },
}));