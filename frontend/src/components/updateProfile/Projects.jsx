import React from "react";
import { Input, Button } from "@material-tailwind/react";
import { useUserUpdateStore } from "../../store/useUserUpdateStore.js";

function Projects() {
  const { formData, handleArrayChange, addToArray, removeFromArray } =
    useUserUpdateStore();

  // Ensure projects is always an array
  if (!Array.isArray(formData.projects)) {
    formData.projects = [];
  }

  return (
    <>
      <h3>Projects</h3>
      {formData.projects.length > 0 ? (
        formData.projects.map((project, index) => (
          <div key={index} className="relative">
            <div className="border-1 p-2 py-4 border-gray-500 rounded-md space-y-8">
              <Input
                type="text"
                variant="standard"
                label="Project Name"
                placeholder="Project Name"
                value={project.projectName}
                onChange={(e) =>
                  handleArrayChange(
                    "projects",
                    index,
                    "projectName",
                    e.target.value
                  )
                }
              />
              <Input
                type="text"
                variant="standard"
                placeholder="Project Description"
                label="Project Description"
                value={project.projectDescription}
                onChange={(e) =>
                  handleArrayChange(
                    "projects",
                    index,
                    "projectDescription",
                    e.target.value
                  )
                }
              />
              <Input
                type="text"
                variant="standard"
                label="Project Link"
                placeholder="Project Link"
                value={project.projectLink}
                onChange={(e) =>
                  handleArrayChange(
                    "projects",
                    index,
                    "projectLink",
                    e.target.value
                  )
                }
              />
            </div>
            <button
              className="absolute text-sm bg-red-500 hover:bg-red-700 text-white rounded-full px-2 py-1 top-0 right-0 z-10"
              onClick={() => removeFromArray("projects", index)}>
              X
            </button>
          </div>
        ))
      ) : (
        <p>No projects added yet.</p>
      )}

      <Button
        type="button"
        className="px-2 py-1"
        onClick={() =>
          addToArray("projects", {
            projectName: "",
            projectDescription: "",
            projectLink: "",
          })
        }>
        + Add Project
      </Button>
    </>
  );
}

export default Projects;
