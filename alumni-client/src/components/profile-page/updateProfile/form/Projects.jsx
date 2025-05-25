import React, { useState, useEffect } from "react";
import { useUserStore } from "../../../../store/useUserStore";

function Projects({formData, setFormData}) {
  const { authUser } = useUserStore();
  const [projects, setProjects] = useState([]);

  useEffect(() => {

    if (authUser?.projects?.length > 0) {
      const initialProjects = authUser.projects.map((project) => ({
        projectName: project.projectName || "",
        projectDescription: project.projectDescription || "",
        projectLink: project.projectLink || "",
      }));
      setProjects(initialProjects);

    }
  }, [authUser]);

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);

    setFormData((prev) => ({
      ...prev,
      projects: updatedProjects,
    }));
  };

  const addNewProject = () => {
    const newProject = {
      projectName: "",
      projectDescription: "",
      projectLink: "",
    };
    setProjects((prev) => [...prev, newProject]);

    setFormData((prev) => ({
      ...prev,
      projects: newProject,
    }));
  };

  const removeProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);


    setFormData((prev) => ({
      ...prev,
      projects: updatedProjects,
    }));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Projects</h3>

      {projects.length > 0 ? (
        projects.map((project, index) => (
          <div
            key={index}
            className="relative p-4 border border-gray-300 rounded-lg space-y-3">
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Project Name
              </label>
              <input
                type="text"
                className="border-b border-gray-300 p-2 focus:outline-none focus:border-blue-500"
                value={project.projectName}
                onChange={(e) =>
                  handleProjectChange(index, "projectName", e.target.value)
                }
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Project Description
              </label>
              <textarea
                rows={3}
                className="border-b border-gray-300 p-2 focus:outline-none focus:border-blue-500"
                value={project.projectDescription}
                onChange={(e) =>
                  handleProjectChange(
                    index,
                    "projectDescription",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Project Link
              </label>
              <input
                type="url"
                className="border-b border-gray-300 p-2 focus:outline-none focus:border-blue-500"
                value={project.projectLink}
                onChange={(e) =>
                  handleProjectChange(index, "projectLink", e.target.value)
                }
                placeholder="https://example.com"
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
        <p className="text-gray-500">No projects added yet</p>
      )}

      <button
        onClick={addNewProject}
        className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors">
        + Add Project
      </button>
    </div>
  );
}

export default Projects;
