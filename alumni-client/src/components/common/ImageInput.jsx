import React from "react";
import { photoIcon } from "../../assets/icons.jsx";
function ImageInput({
  name = "image",
  id = "image-upload",
  icon,
  onChange,
  multiple = false,
}) {
  return (
    <div className="bg-gray-300 hover:bg-[#2992FE] p-1 rounded-lg">
      <label htmlFor={id} className="cursor-pointer">
        {photoIcon}
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
