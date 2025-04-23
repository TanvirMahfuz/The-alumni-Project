import React from "react";
import { Input, Button } from "@material-tailwind/react";
import { useAuthStore } from "../../store/useUserStore.js";

function CurrentlyWorkingOn({ formData, setFormData }) {
  const { authUser } = useAuthStore();
  const [projects, setProjects] = React.useState([]);

  React.useEffect(() => {
    if (authUser?.currentlyWorkingIn?.length > 0) {
      const initialProjects = authUser.currentlyWorkingIn.map((project) => ({
        title: project.title || "none",
        techStack: project.techStack || "",
        description: project.description || "",
      }));
      setProjects(initialProjects);
      setFormData((prev) => ({
        ...prev,
        currentlyWorkingIn: initialProjects,
      }));
    }
  }, [authUser]);

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;

    setProjects(updatedProjects);
    setFormData((prev) => ({
      ...prev,
      currentlyWorkingIn: updatedProjects,
    }));
  };

  const addNewProject = () => {
    const newProject = {
      title: "none",
      techStack: "",
      description: "",
    };

    setProjects((prev) => [...prev, newProject]);
    setFormData((prev) => ({
      ...prev,
      currentlyWorkingIn: [...prev.currentlyWorkingIn, newProject],
    }));
  };

  const removeProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);

    setProjects(updatedProjects);
    setFormData((prev) => ({
      ...prev,
      currentlyWorkingIn: updatedProjects,
    }));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Currently Working On</h3>

      {projects.length > 0 ? (
        projects.map((project, index) => (
          <div
            key={index}
            className="relative p-4 border border-gray-300 rounded-lg space-y-3">
            <Input
              label="Project Title"
              variant="standard"
              value={project.title}
              onChange={(e) =>
                handleProjectChange(index, "title", e.target.value)
              }
            />
            <Input
              label="Tech Stack"
              variant="standard"
              value={project.techStack}
              onChange={(e) =>
                handleProjectChange(index, "techStack", e.target.value)
              }
            />
            <Input
              label="Description"
              variant="standard"
              value={project.description}
              onChange={(e) =>
                handleProjectChange(index, "description", e.target.value)
              }
            />
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
              onClick={() => removeProject(index)}>
              ×
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No ongoing projects</p>
      )}

      <Button onClick={addNewProject} className="px-2 py-1 bg-gray-900">
        + Add Project
      </Button>
    </div>
  );
}

export default CurrentlyWorkingOn;
