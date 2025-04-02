import React, { useState } from "react";
import { useUserUpdateStore } from "../../store/useUserUpdateStore.js";
function FileUploads({ formData, setFormData }) {
  const [resume, setResume] = useState(formData.resume??"");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="">
      <label>
        Resume:{" "}
        <input
          type="file"
          onChange={(e) =>
            handleChange({
              target: { name: "resume", value: e.target.files[0] },
            })
          }
        />
      </label>
    </div>
  );
}

export default FileUploads;
