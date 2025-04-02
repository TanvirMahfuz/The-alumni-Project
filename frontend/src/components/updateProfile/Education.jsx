import React from "react";
import { Input, Button } from "@material-tailwind/react";
import { useUserUpdateStore } from "../../store/useUserUpdateStore.js";

function Education() {
  const { formData, handleArrayChange, addToArray, removeFromArray } =
    useUserUpdateStore();
  const education = formData.education || []; // Check if 'education' exists and initialize as empty array if not

  return (
    <>
      <h3>Education</h3>
      {education.map((edu, index) => (
        <div key={index} className="relative">
          <div className="border-1 p-2 py-4 border-gray-500 rounded-md space-y-8">
            <Input
              variant="standard"
              placeholder="Degree"
              label="Degree"
              value={edu.degree}
              onChange={(e) =>
                handleArrayChange("education", index, "degree", e.target.value)
              }
            />
            <Input
              variant="standard"
              placeholder="Institute"
              label="Institute"
              value={edu.institute}
              onChange={(e) =>
                handleArrayChange(
                  "education",
                  index,
                  "institute",
                  e.target.value
                )
              }
            />

            <Input
              variant="standard"
              placeholder="Start Date"
              label="Start Date"
              value={edu.startDate}
              onChange={(e) =>
                handleArrayChange(
                  "education",
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
              value={edu.endDate}
              onChange={(e) =>
                handleArrayChange("education", index, "endDate", e.target.value)
              }
            />
          </div>

          <button
            className="absolute text-sm bg-red-500 hover:bg-red-700 text-white rounded-full  px-2 py-1 top-0 right-0 z-10"
            onClick={(e) => {
              removeFromArray("education", index);
            }}>
            X
          </button>
        </div>
      ))}
      <Button
        className=" px-2 py-1"
        type="button"
        onClick={() =>
          addToArray("education", {
            degree: "",
            institute: "",
            startDate: "",
            endDate: "",
          })
        }>
        + Add Education
      </Button>
    </>
  );
}

export default Education;
