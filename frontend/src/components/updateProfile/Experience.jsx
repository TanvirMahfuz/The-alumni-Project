import React from "react";
import { Input,Button } from "@material-tailwind/react";
import { useUserUpdateStore } from "../../store/useUserUpdateStore.js";

function Experience() {
    const { formData, handleArrayChange, addToArray, removeFromArray } =
      useUserUpdateStore();

  return (
    <>
      <h3>Experience</h3>
      {formData?.jobExperience && formData.jobExperience.length > 0 ? (
        <>
          {formData.jobExperience.map((job, index) => (
            <div key={index} className="relative">
              <div className="border-1 p-2 py-4 border-gray-500 rounded-md space-y-8">
                <Input
                  variant="standard"
                  placeholder="title"
                  label="title"
                  value={job.title}
                  onChange={(e) =>
                    handleArrayChange(
                      "jobExperience",
                      index,
                      "title",
                      e.target.value
                    )
                  }
                />
                <Input
                  variant="standard"
                  placeholder="Company"
                  label="Company"
                  value={job.company}
                  onChange={(e) =>
                    handleArrayChange(
                      "jobExperience",
                      index,
                      "company",
                      e.target.value
                    )
                  }
                />
                <Input
                  variant="standard"
                  placeholder="Start Date"
                  label="Start Date"
                  value={job.startDate}
                  onChange={(e) =>
                    handleArrayChange(
                      "jobExperience",
                      index,
                      "startDate",
                      e.target.value
                    )
                  }
                />

                <Input
                  variant="standard"
                  placeholder="End Date"
                  label="End Date"
                  value={job.endDate}
                  onChange={(e) =>
                    handleArrayChange(
                      "jobExperience",
                      index,
                      "endDate",
                      e.target.value
                    )
                  }
                />
              </div>
              <button
                className="absolute text-sm bg-red-500 hover:bg-red-700 text-white rounded-full  px-2 py-1 top-0 right-0 z-10"
                onClick={(e) => {
                  removeFromArray("jobExperience", index);
                }}>
                X
              </button>
            </div>
          ))}
          <Button
            className="px-2 py-1"
            type="button"
            onClick={() =>
              addToArray("jobExperience", {
                title: "",
                company: "",
                startDate: "",
                endDate: "",
              })
            }>
            + Add Job Experience
          </Button>
        </>
      ) : (
        <p>No Experience</p>
      )}
    </>
  );
}

export default Experience;
