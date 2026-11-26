import React from "react";
import ImageGallery from "../ImageGallery/ImageGallery.jsx";

function PostBody({ description, images }) {
  return (
    <div className="w-full my-4">
      {description?.trim() && (
        <p className="text-sm font-light text-gray-800 dark:text-gray-200 w-full whitespace-pre-line">
          {description}
        </p>
      )}
      {images?.length > 0 && <ImageGallery images={images} />}
    </div>
  );
}

export default PostBody;
