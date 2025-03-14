import { useNavigate } from "react-router-dom";
import React,{useState,useEffect,useRef} from "react";
import { profilePlaceHolder } from "../assets/images";
import { Textarea,Typography,Button} from "@material-tailwind/react";
import axios from "axios";

export function CreatePost2({currentUser}) { 
  const textareaRef = useRef(null);
  const [formData, setFormData] = React.useState({ description: "", images: [] });
  const [selectedImages, setSelectedImages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [alert, setAlert] = React.useState({ type: "", message: "" });
  const navigate = useNavigate()

  const handleInput = (e) => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "40px"; // Reset height to initial size
      const scrollHeight = textarea.scrollHeight;
      const maxHeight = 40 * 3; // Max height for 3 rows
      textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`; // Expand but not beyond 3 rows
      textarea.style.overflowY = scrollHeight > maxHeight ? "auto" : "hidden"; // Show scroll if exceeds 3 rows
    }
    setFormData({ ...formData, description: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ type: "", message: "" });
    let data = new FormData();
    data.append("description", formData.description);
    formData.images.forEach((image) => data.append("images", image));
    data= Object.fromEntries(data)
    try {
      const res = await axios.post("/api/api/v1/post/createPost", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Success:", res);
      setAlert({ type: "success", message: "Post created successfully!" });
      setTimeout(() => navigate("/home"), 1000);
    } catch (err) {
      console.error("Error:", err.message);
      setAlert({ type: "error", message: "Failed to create post. Try again!" });
    } finally {
      setLoading(false);
    }
  };



  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
    setSelectedImages((prev) => [...prev, ...imageUrls]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...selectedImages];
    const updatedFormData = { ...formData };
    updatedImages.splice(index, 1);
    updatedFormData.images.splice(index, 1);

    setSelectedImages(updatedImages);
    setFormData(updatedFormData);
  };

  return (
    <div className=" mx-8 py-4 flex flex-col items-center justify-center bg-white rounded-4xl shadow-md ">
      <div id="top" className="grid grid-cols-12 w-full px-8 py-2">
        <div className="col-span-2 md:col-span-2 lg:col-pan-2 xl:col-span-2 2xl:col-span-1 flex items-center justify-center">
          <img
            src={currentUser?.image || profilePlaceHolder}
            alt=""
            className="rounded-full h-15 w-15"
          />
        </div>
        <div className="col-span-10 md:col-span-10 lg:col-pan-10 xl:col-span-10 2xl:col-span-11 rounded-4xl w-full  ml-4 md:ml-0 lg-ml-4 xl:ml-0 2xl:ml-4  pr-4 flex items-center justify-center">
          <textarea
            ref={textareaRef}
            rows="1"
            placeholder="Your Message"
            className="w-full px-6 py-4 resize-none rounded-4xl outline-none bg-gray-100 text-gray-800 font-light"
            style={{
              minHeight: "60px",
              maxHeight: "200px",
              overflowY: "auto",
            }}
            onInput={handleInput} // Adjust height dynamically
          />
        </div>
      </div>
      <div id="bottom" className="mt-2 grid grid-cols-12 gap-4 w-10/12 px-8 ">
        {/* Image Upload */}
        <div className="col-span-2 flex items-center justify-center">
          {}
          <label
            htmlFor="images"
            className="cursor-pointer bg-gray-50 hover:bg-gray-300 rounded-full px-4 py-2 flex items-center gap-2">
            <i className="bi bi-image text-lg"></i>
            <Typography className="text-lg font-medium ">image</Typography>
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
        <div className="col-span-9 w-full overflow-x-auto ">
          <div className="flex items-center gap-4 h-full ">
            <div className="flex items-center gap-2 h-full flex-wrap">
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
        </div>
        <div className="col-span-1 flex items-center justify-center">
          {loading ? (
            <Button
              loading={true}
              className="flex justify-center items-center rounded-full">
              <i class="bi bi-arrow-clockwise"></i>
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="flex justify-center items-center gap-1 rounded-full px-12 py-1 text-xl">
              <i class="bi bi-send-fill"></i>
              <Typography className="text-sm font-medium " >share</Typography>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
