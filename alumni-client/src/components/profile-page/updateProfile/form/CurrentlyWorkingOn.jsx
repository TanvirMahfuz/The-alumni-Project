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
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Currently Working On</h3>

      {formData.currentlyWorkingIn?.length > 0 ? (
        formData.currentlyWorkingIn.map((project, index) => (
          <div
            key={index}
            className="relative p-4 border border-gray-300 rounded-lg space-y-3">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Project Title
              </label>
              <input
                type="text"
                className="border-b border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                value={project.title}
                onChange={(e) =>
                  handleProjectChange(index, "title", e.target.value)
                }
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Tech Stack
              </label>
              <input
                type="text"
                className="border-b border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                value={project.techStack}
                onChange={(e) =>
                  handleProjectChange(index, "techStack", e.target.value)
                }
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>
              <input
                type="text"
                className="border-b border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                value={project.description}
                onChange={(e) =>
                  handleProjectChange(index, "description", e.target.value)
                }
              />
            </div>

            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
              onClick={() => removeProject(index)}>
              ×
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No ongoing projects</p>
      )}

      <button
        onClick={addNewProject}
        className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors">
        + Add Project
      </button>
    </div>
  );
}

export default CurrentlyWorkingOn;
