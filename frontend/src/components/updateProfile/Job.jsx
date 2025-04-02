import React from "react";
import { Input, Button } from "@material-tailwind/react";
import { useUserUpdateStore } from "../../store/useUserUpdateStore.js";

function Job() {
  const { formData, handleArrayChange,addToArray, removeFromArray } = useUserUpdateStore();
  console.log(formData);
  
  return (
    <>
      <h3>Job</h3>
      {formData.currentPost && formData.currentPost.length > 0 ? (
        formData.currentPost.map((job, index) => (
          <div key={index} className="relative">
            <div className="border-1 p-2 py-4 border-gray-500 rounded-md space-y-8">
              <Input
                variant="standard"
                placeholder="Title"
                label="Title"
                value={job.title}
                onChange={(e) =>
                  handleArrayChange("currentPost", index, "title", e.target.value)
                }
              />
              <Input
                variant="standard"
                placeholder="Company"
                label="Company"
                value={job.company}
                onChange={(e) =>
                  handleArrayChange("currentPost", index, "company", e.target.value)
                }
              />
              <Input
                variant="standard"
                placeholder="Start Date"
                label="Start Date"
                value={job.startDate}
                onChange={(e) =>
                  handleArrayChange("currentPost", index, "startDate", e.target.value)
                }
              />
              <Input
                variant="standard"
                placeholder="End Date"
                label="End Date"
                value={job.endDate}
                onChange={(e) =>
                  handleArrayChange("currentPost", index, "endDate", e.target.value)
                }
              />
            </div>

            <button
              className="absolute text-sm bg-red-500 hover:bg-red-700 text-white rounded-full px-2 py-1 top-0 right-0 z-10"
              onClick={() => removeFromArray("currentPost", index)}>
              X
            </button>
          </div>
        ))
      ) : (
        <p>No currentPost listed</p>
      )}

      <Button
        type="button"
        className="px-2 py-1"
        onClick={() =>
          addToArray("currentPost", {
            title: "",
            company: "",
            startDate: "",
            endDate: "",
          })
        }>
        + Add Job
      </Button>
    </>
  );
}

export default Job;
