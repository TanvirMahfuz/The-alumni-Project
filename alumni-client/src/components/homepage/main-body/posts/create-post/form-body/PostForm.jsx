import React from "react";
import Header from "../form-header/Header";
import FileDropzone from "../drop-zone/FileDropzone/FileDropzone";
import { usePostStore } from "../../../../../../store/usePostStore";
function PostForm({ setFormOpen }) {
  const { isCreatingPost, createPost } = usePostStore();
  const [formData, setFormData] = React.useState({
    description: "",
    images: [],
  });
  const [error, setError] = React.useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.description.trim() && formData.images.length === 0) {
      setError("Write something before posting.");
      return;
    }
    const res = await createPost(formData);
    if (!res?.ok) {
      setError(res?.message || "Failed to create post");
      return;
    }
    setError("");
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
        className="w-full h-24 p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        placeholder="What's on your mind?"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
      <FileDropzone formData={formData} setFormData={setFormData} />

      {error && (
        <p role="alert" className="text-sm text-red-700 bg-red-100 dark:bg-red-900/40 dark:text-red-200 border border-red-300 dark:border-red-700 p-3 rounded-md">
          {error}
        </p>
      )}

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
