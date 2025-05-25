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
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Skills</h3>

      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="relative p-3 border border-gray-300 rounded-lg flex items-center gap-2">
            <div className="flex flex-col">
              <label className="text-xs text-gray-500">Skill Name</label>
              <input
                type="text"
                className="w-32 px-2 py-1 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                value={skill.title}
                onChange={(e) =>
                  handleSkillChange(index, "title", e.target.value)
                }
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs text-gray-500">Level (0-100)</label>
              <input
                type="number"
                className="w-24 px-2 py-1 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                value={skill.level}
                onChange={(e) =>
                  handleSkillChange(index, "level", e.target.value)
                }
                min="0"
                max="100"
              />
            </div>

            <button
              className="text-gray-600 hover:text-red-500 text-lg font-bold"
              onClick={() => removeSkill(index)}>
              ×
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addNewSkill}
        className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors">
        + Add Skill
      </button>
    </div>
  );
}

export default Skills;
