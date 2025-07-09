import React, { useState, useEffect } from "react";
import { useUserStore } from "../../../../store/useUserStore";

function WorkedOn({ formData, setFormData }) {
  const { authUser } = useUserStore();
  const [workedProjects, setWorkedProjects] = useState([]);

  useEffect(() => {

    if (authUser?.haveWorkedIn?.length > 0) {
      const initialProjects = authUser.haveWorkedIn.map((project) => ({
        title: project.title || "none",
        techStack: project.techStack || "",
        description: project.description || "",
      }));
      setWorkedProjects(initialProjects);

    }
  }, [authUser]);

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...workedProjects];
    updatedProjects[index][field] = value;
    setWorkedProjects(updatedProjects);

    setFormData((prev) => ({
      ...prev,
      haveWorkedIn: updatedProjects,
    }));
  };

  const addNewProject = () => {
    const newProject = {
      title: "none",
      techStack: "",
      description: "",
    };
    setWorkedProjects((prev) => [...prev, newProject]);

    setFormData((prev) => ({
      ...prev,
      haveWorkedIn: newProject,
    }));
  };

  const removeProject = (index) => {
    const updatedProjects = workedProjects.filter((_, i) => i !== index);
    setWorkedProjects(updatedProjects);


    setFormData((prev) => ({
      ...prev,
      haveWorkedIn: updatedProjects,
    }));
  };
  return (
    <div className="space-y-6 mt-6">
      <h3 className="text-2xl font-semibold text-gray-600">Worked On</h3>

      {workedProjects.length > 0 ? (
        workedProjects.map((project, index) => (
          <div
            key={index}
            className="relative p-5 border border-teal-600 rounded-lg bg-white/10 space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-500">
                Project Title
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-teal-600 text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400"
                value={project.title}
                onChange={(e) =>
                  handleProjectChange(index, "title", e.target.value)
                }
                placeholder="Enter project title"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-500">
                Tech Stack
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-teal-600 text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400"
                value={project.techStack}
                onChange={(e) =>
                  handleProjectChange(index, "techStack", e.target.value)
                }
                placeholder="Comma-separated technologies"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-500">
                Description
              </label>
              <textarea
                rows={3}
                className="w-full px-4 py-2 border border-teal-600 text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400"
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
        <p className="text-gray-500">Nothing to show</p>
      )}

      <button
        onClick={addNewProject}
        className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-gray-800 transition-colors duration-200">
        + Add Project
      </button>
    </div>
  );
  
}

export default WorkedOn;
