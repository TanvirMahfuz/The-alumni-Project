import React from "react";
import { Input, Button } from "@material-tailwind/react";
import { useUserUpdateStore } from "../../store/useUserUpdateStore.js";

function CurrentlyWorkingOn() {
  const { formData, handleArrayChange, addToArray, removeFromArray } =
    useUserUpdateStore();

  // Ensure formData.currentlyWorkingIn is defined before checking its length
  const currentlyWorkingIn = formData?.currentlyWorkingIn || [];

  return (
    <>
      <h3>Working On</h3>
      {currentlyWorkingIn.length === 0 ? (
        <p>No ongoing projects</p>
      ) : (
        <>
          {currentlyWorkingIn.map((job, index) => (
            <div key={index} className="relative mb-4">
              <div className="border p-2 py-4 border-gray-500 rounded-md space-y-8">
                <Input
                  variant="standard"
                  placeholder="Title"
                  label="Title"
                  value={job.title}
                  onChange={(e) =>
                    handleArrayChange(
                      "currentlyWorkingIn",
                      index,
                      "title",
                      e.target.value
                    )
                  }
                />
                <Input
                  variant="standard"
                  placeholder="Tech Stack"
                  label="Tech Stack"
                  value={job.techStack}
                  onChange={(e) =>
                    handleArrayChange(
                      "currentlyWorkingIn",
                      index,
                      "techStack",
                      e.target.value
                    )
                  }
                />
                <Input
                  variant="standard"
                  placeholder="Description"
                  label="Description"
                  value={job.description}
                  onChange={(e) =>
                    handleArrayChange(
                      "currentlyWorkingIn",
                      index,
                      "description",
                      e.target.value
                    )
                  }
                />
              </div>
              <button
                className="absolute text-sm bg-red-500 hover:bg-red-700 text-white rounded-full px-2 py-1 top-0 right-0 z-10"
                onClick={() => removeFromArray("currentlyWorkingIn", index)}>
                X
              </button>
            </div>
          ))}
          <Button
            className="px-4 py-2 mt-4"
            type="button"
            onClick={() =>
              addToArray("currentlyWorkingIn", {
                title: "",
                techStack: "",
                description: "",
              })
            }>
            + Add
          </Button>
        </>
      )}
    </>
  );
}

export default CurrentlyWorkingOn;
