import React, { useEffect, useState } from "react";
import { ImageGallery } from "./ImageGallery";
import { Comment } from "./Comment";
import axios from "axios";
import { commentIcon, likeButton, profilePlaceHolder } from "../assets/images";
import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";  
export function PostCard({ item: initialItem }) {
  const [item, setItem] = useState(initialItem);
  console.log("post card item",item);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/api/v1/post/comments/${item._id}`);
        const fetchedComments = response.data?.data?.comments || [];
        setItem((prevItem) => ({ ...prevItem, comments: fetchedComments }));
      } catch (err) {
        console.log("Error fetching comments:", err.message);
      }
    };

    if (item?._id) {
      fetchComments();
    }
  }, [item._id]);

  return (
    <div className="w-full px-8 py-4 flex items-center justify-center">
      <div className="w-full p-8 pt-3 bg-white rounded-3xl shadow-md">
        {/* User Info */}
        <div className="flex items-center mb-4">
          <div key={item._id} className="mb-4">
              <div className="flex items-center space-x-2">
                <img
                  src={item.author.image ? item.author.image : {profilePlaceHolder}}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div>

                  <Typography className="text-xl text-black font-semibold ml-2">
                    <Link
                      className="w-full flex justify-center items-center"
                      to={`/profile?id=${item.author?._id ? item.author._id : ""}`}>
                      {item.author.name ? item.author.name : "Alice in wonderland"}
                  </Link>



                  </Typography>
                  <p className="text-gray-500 text-sm"></p>
                </div>
              </div>
            </div>
          </div>
        {/* Message */}
        <div className="mb-8 text-wrap">
          <Typography className=" text-gray-800 font-medium">{item.description}</Typography>
        </div>

        {/* Image */}
        {item.images.length > 0 && (
          <div className="mb-4">
            <ImageGallery imageList={item.images.map((image) => ({ imagelink: image }))} />
          </div>
        )}

        {/* Like and Comment Section */}
        <div className="flex items-center justify-between text-gray-500">
          <button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
            {likeButton}
            <span>42 Likes</span>
          </button>
          <button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
            {commentIcon}
            <span>{item.comments?.length || 0} Comments</span>
          </button>
        </div>


        <hr className="mt-2 text-gray-500" />
        {/* Comment input */}
        <div className="grid grid-cols-12 py-2">
          <div className="col-span-1 flex items-center justify-center rounded-full overflow-hidden">
            <img
                  src={item.author.image ? item.author.image : "https://placekitten.com/32/32"}
                  alt="User Avatar"
                  className="w-15 h-15 rounded-full"
                />
          </div>
          <div className="col-span-11 p-2 flex flex-items-center justify-center">
            <Comment item={item} setItem={setItem} />
          </div>
        </div>

        <hr className="text-gray-500" />

        {/* All comments */}
        <div className="mt-4 overflow-auto max-h-40">
          {item.comments?.map((comment) => (
            <div key={comment._id} className="mb-4">
              <div className="flex items-center space-x-2">
                <img
                  src={comment.author.image ? comment.author.image : "https://placekitten.com/32/32"}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-gray-900 font-semibold">{comment.author.name}</p>
                  <p className="text-gray-700 text-sm">{comment.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
