import React from "react";
import ImageGallery from "./ImageGallery.jsx"
function PostBody({ description, images }) {
  return (
    <div className="w-full my-4">
      <p className="text-lg w-full">{description??"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia sequi molestias atque? Nemo aliquid cupiditate ratione dolorem autem quis obcaecati voluptatum culpa, qui omnis atque expedita ut sunt laboriosam. Unde!"}</p>
      {images?.length>0 && <ImageGallery images={images} />}

  </div>);
}

export default PostBody;
