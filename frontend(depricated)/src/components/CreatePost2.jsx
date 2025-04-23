import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { profilePlaceHolder } from "../assets/images";
import { Textarea, Typography, Button } from "@material-tailwind/react";
import axios from "axios";

export function CreatePost2({ currentUser }) {
  const textareaRef = useRef(null);
  const [formData, setFormData] = useState({ description: "", images: [] });
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const navigate = useNavigate();

  // Adjust textarea height dynamically
  const handleInput = (e) => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "40px"; // Reset height
      const scrollHeight = textarea.scrollHeight;
      const maxHeight = 40 * 3;
      textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
      textarea.style.overflowY = scrollHeight > maxHeight ? "auto" : "hidden";
    }
    setFormData((prev) => ({ ...prev, description: e.target.value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ type: "", message: "" });

    let data = new FormData();
    data.append("description", formData.description);
    formData.images.forEach((image) => data.append("images", image));

    try {
      const res = await axios.post("/api/api/v1/post/createPost", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Success:", res);
      setAlert({ type: "success", message: "Post created successfully!" });

      setTimeout(() => navigate(0), 1000);
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      setAlert({ type: "error", message: "Failed to create post. Try again!" });
    } finally {
      setLoading(false);
    }
  };

  // Handle Image Upload
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
    setSelectedImages((prev) => [...prev, ...imageUrls]);
  };

  // Handle Image Removal
  const handleRemoveImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="mx-8 my-4 py-4 flex flex-col items-center justify-center bg-white rounded-4xl shadow-md">
      {/* Top Section */}
      <div className="grid grid-cols-12 w-full px-8 py-2">
        <div className="col-span-2 flex items-center justify-center">
          <img
            src={currentUser?.image || profilePlaceHolder}
            alt="Profile"
            className="rounded-full h-15 w-15"
          />
        </div>
        <div className="col-span-10 flex items-center justify-center">
          <textarea
            ref={textareaRef}
            rows="1"
            placeholder="Your Message"
            className="w-full px-6 py-4 resize-none rounded-4xl outline-none bg-gray-100 text-gray-800 font-light"
            style={{ minHeight: "60px", maxHeight: "200px", overflowY: "auto" }}
            value={formData.description}
            onChange={handleInput}
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-2 grid grid-cols-12 gap-4 w-10/12 px-8">
        {/* Image Upload */}
        <div className="col-span-2 flex items-center justify-center">
          <label
            htmlFor="images"
            className="cursor-pointer bg-gray-50 hover:bg-gray-300 rounded-full px-4 py-2 flex items-center gap-2">
            <i className="bi bi-image text-lg"></i>
            <Typography className="text-lg font-medium">image</Typography>
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            id="images"
            name="images"
            onChange={handleImageChange}
          />
        </div>

        {/* Image Preview */}
        <div className="col-span-8 w-full overflow-x-auto">
          <div className="flex items-center gap-4 h-full flex-wrap">
            {selectedImages.map((src, index) => (
              <div key={index} className="relative">
                <img
                  src={src}
                  alt={`Selected ${index}`}
                  className="h-10 w-10 rounded-md object-cover"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-[-12px] right-0 text-black text-2xl p-1 rounded-full">
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-span-2 flex items-center justify-center">
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-max text-lg px-8 py-2 rounded-full ">
            {loading ? (
              <i class="bi bi-arrow-clockwise"></i>
            ) : (
              <i class="bi bi-send"></i>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
