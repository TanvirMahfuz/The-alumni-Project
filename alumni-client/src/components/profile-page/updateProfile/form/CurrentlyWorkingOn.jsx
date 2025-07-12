import React from "react";
import { useUserStore } from "../../../../store/useUserStore";

function CurrentlyWorkingOn({ formData, setFormData }) {
  const { authUser } = useUserStore();

  React.useEffect(() => {
    if (authUser?.currentlyWorkingIn?.length > 0) {
      const initialProjects = authUser.currentlyWorkingIn.map((project) => ({
        title: project.title || "none",
        techStack: project.techStack || "",
        description: project.description || "",
      }));
      setFormData({ ...formData, currentlyWorkingIn: initialProjects });
    }
  }, [authUser]);

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...(formData.currentlyWorkingIn || [])];
    updatedProjects[index][field] = value;
    setFormData({ ...formData, currentlyWorkingIn: updatedProjects });
  };

  const addNewProject = () => {
    const newProject = {
      title: "none",
      techStack: "",
      description: "",
    };

    setFormData({
      ...formData,
      currentlyWorkingIn: [...(formData.currentlyWorkingIn || []), newProject],
    });
  };

  const removeProject = (index) => {
    const updatedProjects = (formData.currentlyWorkingIn || []).filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, currentlyWorkingIn: updatedProjects });
  };

  return (
    <div className="space-y-6 mt-6">
      <h3 className="text-2xl dark:text-gray-200 font-semibold text-gray-600">
        Currently Working On
      </h3>

      {formData.currentlyWorkingIn?.length > 0 ? (
        formData.currentlyWorkingIn.map((project, index) => (
          <div
            key={index}
            className="relative p-5 border border-teal-600 rounded-lg bg-white/10 space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-200">
                Project Title
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-teal-600 text-gray-600 dark:text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400"
                value={project.title}
                onChange={(e) =>
                  handleProjectChange(index, "title", e.target.value)
                }
                placeholder="Enter project title"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-200">
                Tech Stack
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-teal-600 text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400 dark:text-gray-300"
                value={project.techStack}
                onChange={(e) =>
                  handleProjectChange(index, "techStack", e.target.value)
                }
                placeholder="e.g., React, Node.js, MongoDB"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-200">
                Description
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-teal-600 text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400 dark:text-gray-300"
                value={project.description}
                onChange={(e) =>
                  handleProjectChange(index, "description", e.target.value)
                }
                placeholder="Brief summary of the project"
              />
            </div>

            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold transition-colors"
              onClick={() => removeProject(index)}
              aria-label="Remove project">
              ×
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No ongoing projects</p>
      )}

      <button
        onClick={addNewProject}
        className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-gray-800 transition-colors duration-200">
        + Add Project
      </button>
    </div>
  );
  
  
}

export default CurrentlyWorkingOn;
