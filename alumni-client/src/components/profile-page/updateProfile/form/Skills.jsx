import React, { useState, useEffect } from "react";
import { useUserStore } from "../../../../store/useUserStore";

function Skills({formData, setFormData}) {
  const { authUser } = useUserStore();
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    if (authUser?.skills?.length > 0) {
      const initialSkills = authUser.skills.map((skill) => ({
        title: skill.title || "",
        image: skill.image || "",
        level: skill.level || 0,
      }));
      setSkills(initialSkills);
    }
  }, [authUser]);

  const handleSkillChange = (index, field, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index][field] =
      field === "level" ? parseInt(value) || 0 : value;
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
      skills: newSkill,
    }));
  };

  const removeSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
    setFormData((prev) => ({
      ...prev,
      skills: newSkill,
    }));
  };

  return (
    <div className="space-y-6 mt-6">
      <h3 className="text-2xl font-semibold text-gray-600">Skills</h3>

      <div className="flex flex-wrap gap-4">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="relative flex flex-col gap-3 p-4 border border-teal-600 rounded-lg bg-white/10 text-gray-600 w-full max-w-sm">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-500">
                Skill Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-teal-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400"
                value={skill.title}
                onChange={(e) =>
                  handleSkillChange(index, "title", e.target.value)
                }
                placeholder="Enter skill name"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-500">
                Level (0–100)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                className="w-full px-3 py-2 border border-teal-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400"
                value={skill.level}
                onChange={(e) =>
                  handleSkillChange(index, "level", e.target.value)
                }
                placeholder="e.g. 85"
              />
            </div>

            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-xl font-bold transition-colors"
              onClick={() => removeSkill(index)}
              aria-label="Remove skill">
              ×
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addNewSkill}
        className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-gray-800 transition-colors duration-200">
        + Add Skill
      </button>
    </div>
  );
  
}

export default Skills;
