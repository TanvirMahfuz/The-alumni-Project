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
    <div className="space-y-6 mt-6">
      <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-200">
        Projects
      </h3>

      {projects.length > 0 ? (
        projects.map((project, index) => (
          <div
            key={index}
            className="relative p-5 border border-teal-600 rounded-lg bg-white/10 space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-300">
                Project Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 text-gray-600 dark:text-gray-400 border border-teal-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400"
                value={project.projectName}
                onChange={(e) =>
                  handleProjectChange(index, "projectName", e.target.value)
                }
                placeholder="Enter project name"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-300 ">
                Project Description
              </label>
              <textarea
                rows={3}
                className="w-full px-4 py-2 text-gray-600 dark:text-gray-400 border border-teal-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400"
                value={project.projectDescription}
                onChange={(e) =>
                  handleProjectChange(
                    index,
                    "projectDescription",
                    e.target.value
                  )
                }
                placeholder="Write a short description"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-300">
                Project Link
              </label>
              <input
                type="url"
                className="w-full px-4 py-2 text-gray-600 dark:text-gray-400 border border-teal-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400"
                value={project.projectLink}
                onChange={(e) =>
                  handleProjectChange(index, "projectLink", e.target.value)
                }
                placeholder="https://example.com"
              />
            </div>

            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold transition-all"
              onClick={() => removeProject(index)}
              aria-label="Remove project">
              ×
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No projects added yet</p>
      )}

      <button
        onClick={addNewProject}
        className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-gray-800 transition-colors duration-200">
        + Add Project
      </button>
    </div>
  );
  
}

export default Projects;
