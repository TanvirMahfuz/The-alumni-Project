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
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Worked On</h3>

      {workedProjects.length > 0 ? (
        workedProjects.map((project, index) => (
          <div
            key={index}
            className="relative p-4 border border-gray-300 rounded-lg space-y-3">
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Project Title
              </label>
              <input
                type="text"
                className="border-b border-gray-300 p-2 focus:outline-none focus:border-blue-500"
                value={project.title}
                onChange={(e) =>
                  handleProjectChange(index, "title", e.target.value)
                }
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Tech Stack
              </label>
              <input
                type="text"
                className="border-b border-gray-300 p-2 focus:outline-none focus:border-blue-500"
                value={project.techStack}
                onChange={(e) =>
                  handleProjectChange(index, "techStack", e.target.value)
                }
                placeholder="Comma-separated technologies"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                rows={3}
                className="border-b border-gray-300 p-2 focus:outline-none focus:border-blue-500"
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
        <p className="text-gray-500">Nothing to show</p>
      )}

      <button
        onClick={addNewProject}
        className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors">
        + Add Project
      </button>
    </div>
  );
}

export default WorkedOn;
