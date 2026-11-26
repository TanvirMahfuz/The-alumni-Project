import React from "react";
import { photoIcon } from "../../../assets/icons.jsx";
import { FILE_UPLOADS_ENABLED } from "../../../config/uploads";

function ImageInput({
  name = "image",
  id = "image-upload",
  icon,
  onChange,
  multiple = false,
  onUnavailable,
}) {
  if (!FILE_UPLOADS_ENABLED) {
    // No file picker: tell the parent so it can show the "not available" notice
    return (
      <button
        type="button"
        onClick={onUnavailable}
        aria-label="Attach image (not available yet)"
        className="photo-btn text-gray-400 dark:text-gray-500 p-1 rounded-lg cursor-not-allowed">
        {icon || photoIcon}
      </button>
    );
  }

  return (
    <div className="photo-btn text-[#2992FE] p-1 rounded-lg hover:translate-y-[-5px] hover:scale-105 transition-all ease-in-out duration-250">
      <label htmlFor={id} className="cursor-pointer" title="Attach images">
        {icon || photoIcon}
      </label>
      <input
        type="file"
        id={id}
        name={name}
        className="hidden"
        multiple={multiple}
        onChange={onChange}
      />
    </div>
  );
}

export default ImageInput;
