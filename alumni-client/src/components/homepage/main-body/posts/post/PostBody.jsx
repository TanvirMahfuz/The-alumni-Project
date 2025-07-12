import React from "react";
import ImageGallery from "./ImageGallery.jsx";

function PostBody({ description, images }) {
  const fallbackText =
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia sequi molestias atque? Nemo aliquid cupiditate ratione dolorem autem quis obcaecati voluptatum culpa, qui omnis atque expedita ut sunt laboriosam. Unde!";

  return (
    <div className="w-full my-4">
      <p className="text-sm font-light text-gray-800 dark:text-gray-200 w-full">
        {description?.trim() || fallbackText}
      </p>
      {images?.length > 0 && <ImageGallery images={images} />}
    </div>
  );
}

export default PostBody;
