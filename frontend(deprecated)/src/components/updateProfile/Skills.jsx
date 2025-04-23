import React from "react";
import { Input, Button } from "@material-tailwind/react";
import { useAuthStore } from "../../store/useUserStore.js";

function Skills({ formData, setFormData }) {
  const { authUser } = useAuthStore();
  const [skills, setSkills] = React.useState([]);

  React.useEffect(() => {
    if (authUser?.skills?.length > 0) {
      const initialSkills = authUser.skills.map((skill) => ({
        title: skill.title || "",
        image: skill.image || "",
        level: skill.level || 0,
      }));
      setSkills(initialSkills);
      setFormData((prev) => ({
        ...prev,
        skills: initialSkills,
      }));
    }
  }, [authUser]);

  const handleSkillChange = (index, field, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index][field] = value;

    setSkills(updatedSkills);
    setFormData((prev) => ({
      ...prev,
      skills: updatedSkills,
    }));
  };

  const addNewSkill = () => {
    const newSkill = {
      title: "",
      image: "",
      level: 0,
    };

    setSkills((prev) => [...prev, newSkill]);
    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
  };

  const removeSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);

    setSkills(updatedSkills);
    setFormData((prev) => ({
      ...prev,
      skills: updatedSkills,
    }));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Skills</h3>

      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="relative p-3 border border-gray-300 rounded-lg flex items-center gap-2">
            <Input
              label="Skill Name"
              variant="standard"
              value={skill.title}
              onChange={(e) =>
                handleSkillChange(index, "title", e.target.value)
              }
              className="w-32"
            />
            <Input
              type="number"
              label="Level (0-100)"
              variant="standard"
              value={skill.level}
              onChange={(e) =>
                handleSkillChange(index, "level", e.target.value)
              }
              min="0"
              max="100"
              className="w-24"
            />
            <button
              className="text-gray-600 hover:text-red-500"
              onClick={() => removeSkill(index)}>
              ×
            </button>
          </div>
        ))}
      </div>

      <Button onClick={addNewSkill} className="px-2 py-1 bg-gray-900">
        + Add Skill
      </Button>
    </div>
  );
}

export default Skills;
