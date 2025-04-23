import React from "react";
import { Input, Button } from "@material-tailwind/react";
import { useAuthStore } from "../../store/useUserStore.js";

function WorkedOn({ formData, setFormData }) {
  const { authUser } = useAuthStore();
  const [workedProjects, setWorkedProjects] = React.useState([]);

  React.useEffect(() => {
    if (authUser?.haveWorkedIn?.length > 0) {
      const initialProjects = authUser.haveWorkedIn.map((project) => ({
        title: project.title || "none",
        techStack: project.techStack || "",
        description: project.description || "",
      }));
      setWorkedProjects(initialProjects);
      setFormData((prev) => ({
        ...prev,
        haveWorkedIn: initialProjects,
      }));
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
      haveWorkedIn: [...prev.haveWorkedIn, newProject],
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
        <p className="text-gray-500">Nothing to show</p>
      )}

      <Button onClick={addNewProject} className="px-2 py-1 bg-gray-900">
        + Add Project
      </Button>
    </div>
  );
}

export default WorkedOn;
