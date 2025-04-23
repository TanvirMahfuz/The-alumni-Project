import React from "react";
import { Input, Button } from "@material-tailwind/react";
import { useAuthStore } from "../../store/useUserStore.js";
import { XMarkIcon } from "@heroicons/react/24/solid";

function Projects({ formData, setFormData }) {
  const { authUser } = useAuthStore();
  const [projects, setProjects] = React.useState([]);

  React.useEffect(() => {
    if (authUser?.projects?.length > 0) {
      const initialProjects = authUser.projects.map((project) => ({
        projectName: project.projectName || "",
        projectDescription: project.projectDescription || "",
        projectLink: project.projectLink || "",
      }));
      setProjects(initialProjects);
      setFormData((prev) => ({
        ...prev,
        projects: initialProjects,
      }));
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
      projects: [...prev.projects, newProject],
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
            <Input
              variant="standard"
              label="Project Name"
              value={project.projectName}
              onChange={(e) =>
                handleProjectChange(index, "projectName", e.target.value)
              }
            />
            <Input
              variant="standard"
              label="Project Description"
              value={project.projectDescription}
              onChange={(e) =>
                handleProjectChange(index, "projectDescription", e.target.value)
              }
            />
            <Input
              variant="standard"
              label="Project Link"
              value={project.projectLink}
              onChange={(e) =>
                handleProjectChange(index, "projectLink", e.target.value)
              }
            />
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={() => removeProject(index)}>
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No projects added yet.</p>
      )}

      <Button onClick={addNewProject} className="px-2 py-1 bg-gray-900">
        + Add Project
      </Button>
    </div>
  );
}

export default Projects;
