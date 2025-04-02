import React from "react";
import { Input, Button } from "@material-tailwind/react";
import { useAuthStore } from "../../store/useUserStore.js";

function Experience({ formData, setFormData }) {
  const { authUser } = useAuthStore();
  const [experience, setExperience] = React.useState([]);

  React.useEffect(() => {
    if (authUser?.jobExperience?.length > 0) {
      const initialExperience = authUser.jobExperience.map((exp) => ({
        title: exp.title || "",
        company: exp.company || "",
        startDate: exp.startDate || "",
        endDate: exp.endDate || "",
        description: exp.description || "",
      }));
      setExperience(initialExperience);
      setFormData((prev) => ({
        ...prev,
        jobExperience: initialExperience,
      }));
    }
  }, [authUser]);

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...experience];
    updatedExperience[index][field] = value;

    setExperience(updatedExperience);
    setFormData((prev) => ({
      ...prev,
      jobExperience: updatedExperience,
    }));
  };

  const addNewExperience = () => {
    const newExperience = {
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    };

    setExperience((prev) => [...prev, newExperience]);
    setFormData((prev) => ({
      ...prev,
      jobExperience: [...prev.jobExperience, newExperience],
    }));
  };

  const removeExperience = (index) => {
    const updatedExperience = experience.filter((_, i) => i !== index);

    setExperience(updatedExperience);
    setFormData((prev) => ({
      ...prev,
      jobExperience: updatedExperience,
    }));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Experience</h3>

      {experience.map((item, index) => (
        <div
          key={index}
          className="relative p-4 border border-gray-300 rounded-lg space-y-3">
          <Input
            label="Job Title"
            variant="standard"
            value={item.title}
            onChange={(e) =>
              handleExperienceChange(index, "title", e.target.value)
            }
          />
          <Input
            label="Company"
            variant="standard"
            value={item.company}
            onChange={(e) =>
              handleExperienceChange(index, "company", e.target.value)
            }
          />
          <div className="flex gap-3">
            <Input
              type="date"
              label="Start Date"
              variant="standard"
              value={item.startDate}
              onChange={(e) =>
                handleExperienceChange(index, "startDate", e.target.value)
              }
            />
            <Input
              type="date"
              label="End Date"
              variant="standard"
              value={item.endDate}
              onChange={(e) =>
                handleExperienceChange(index, "endDate", e.target.value)
              }
            />
          </div>
          <Input
            label="Description"
            variant="standard"
            value={item.description}
            onChange={(e) =>
              handleExperienceChange(index, "description", e.target.value)
            }
          />
          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
            onClick={() => removeExperience(index)}>
            ×
          </button>
        </div>
      ))}

      <Button onClick={addNewExperience} className="px-2 py-1 bg-gray-900">
        + Add Experience
      </Button>
    </div>
  );
}

export default Experience;
