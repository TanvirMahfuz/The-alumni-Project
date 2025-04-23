import { PhotoIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Input } from "@material-tailwind/react";

function Form6({ user, setUser }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Update the user object with the file (for example, storing file name or URL)
      setUser({ ...user, resume: file });
    }
  };

  return (
    <div className="">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Resume
      </label>
      <div className="relative">
        <Input
          type="file"
          name="resume"
          className="w-full bg-amber-100"
          onChange={handleFileChange}
        />
        <PhotoIcon className="absolute top-2 right-2 w-6 h-6 text-gray-500" />
      </div>
    </div>
  );
}

export default Form6;
