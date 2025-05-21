import React from "react";

const ImagePreview = ({ images = [], setImages }) => {
  const handleRemove = (indexToRemove) => {
    const updated = images.filter((_, i) => i !== indexToRemove);
    setImages(updated);
  };

  return (
    <div className="flex w-full items-center mx-4 px-8 py-8 overflow-x-auto overflow-y-hidden">
      {images.length > 0 &&
        images.map((image, index) => (
          <div className="relative" key={index}>
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute flex items-center justify-center bg-gray-700 rounded-full p-1 h-5 w-5 right-0 top-[-5px] text-white text-xs">
              ×
            </button>
            <img
              src={image}
              alt={`preview-${index}`}
              className="w-16 h-16 object-cover shadow-gray-600 shadow-md rounded-lg mr-2"
            />
          </div>
        ))}
    </div>
  );
};

export default ImagePreview;
