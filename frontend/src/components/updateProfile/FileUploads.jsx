import React from "react";
import { useUserUpdateStore } from "../../store/useUserUpdateStore.js";
function FileUploads() {
  const { formData, handleChange } = useUserUpdateStore();
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
