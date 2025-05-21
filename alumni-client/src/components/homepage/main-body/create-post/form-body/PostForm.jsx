import React from "react";
import { useUserStore } from "../../../../../../store/useUserStore";
import Header from "../form-header/Header";
import FileDropzone from "../drop-zone/FileDropzone";
import { usePostStore } from "../../../../../../store/usePostStore";
function PostForm({ setFormOpen }) {
  const { authUser } = useUserStore();
  const { isCreatingPost, createPost } = usePostStore();
  const [formData, setFormData] = React.useState({
    description: "",
    images: [],
  });
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await createPost(formData);
    console.log(formData);
    setFormOpen(false);
  }
  if (isCreatingPost) {
    return (
      <div className="flex justify-center items-center h-52">
        <span> creating post...</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4 p-4">
      <Header />

      <textarea
        className="w-full h-24 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        placeholder="What's on your mind?"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
      <FileDropzone formData={formData} setFormData={setFormData} />

      <div className="flex justify-end">
        <button
          className=" w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          onClick={handleSubmit}>
          Post
        </button>
      </div>
    </div>
  );
}

export default PostForm;
