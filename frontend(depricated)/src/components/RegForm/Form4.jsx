import React from "react";
import { Input, Typography, Button } from "@material-tailwind/react";

function Form4({ user, setUser }) {
  const handleSkillChange = (index, event) => {
    const updatedSkills = [...user.skills];
    updatedSkills[index][event.target.name] = event.target.value;
    console.log(updatedSkills)
    setUser({ ...user, skills: updatedSkills });
  };

  const handleAddSkill = () => {
    setUser({
      ...user,
      skills: [...user.skills, { title: "", image: "", level: 0 }],
    });
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = [...user.skills];
    updatedSkills.splice(index, 1);
    setUser({ ...user, skills: updatedSkills });
  };

  const handleInterestChange = (index, event) => {
    const updatedInterests = [...user.futureInterests];
    updatedInterests[index] = event.target.value;
    setUser({ ...user, futureInterests: updatedInterests });
  };

  const handleAddInterest = () => {
    setUser({
      ...user,
      futureInterests: [...user.futureInterests, ""],
    });
  };

  const handleRemoveInterest = (index) => {
    const updatedInterests = [...user.futureInterests];
    updatedInterests.splice(index, 1);
    setUser({ ...user, futureInterests: updatedInterests });
  };

  return (
    <div className="space-y-6">
      {/* Skills Section */}
      <Typography className="text-3xl font-medium">Skills</Typography>
      <hr className="mb-4" />

      {user.skills.map((skill, index) => (
        <div key={index} className="relative space-y-3 border p-4 rounded-lg">
          {user.skills.length > 1 && (
            <button
              onClick={() => handleRemoveSkill(index)}
              className="absolute top-0 right-2 text-red-600 text-lg font-bold z-20"
            >
              ✖
            </button>
          )}
          <Input
            type="text"
            label="Skill Title"
            name="title"
            value={skill.title}
            onChange={(e) => handleSkillChange(index, e)}
          />
          <Input
            type="text"
            label="Image URL"
            name="image"
            value={skill.image}
            onChange={(e) => handleSkillChange(index, e)}
          />
          <Input
            type="number"
            label="Skill Level (0-100)"
            name="level"
            value={skill.level}
            onChange={(e) => handleSkillChange(index, e)}
          />
        </div>
      ))}

      <div
        className="h-10 w-10 rounded-full bg-gray-900 flex justify-center items-center text-2xl text-white p-6 cursor-pointer"
        onClick={handleAddSkill}
      >
        <i className="bi bi-clipboard-plus-fill"></i>
      </div>
      
      {/* Future Interests Section */}
      <Typography className="text-3xl font-medium">Future Interests</Typography>
      <hr className="mb-4" />

      {user.futureInterests.map((interest, index) => (
        <div key={index} className="relative flex items-center gap-4">
          <Input
            type="text"
            label={`Interest ${index + 1}`}
            value={interest}
            onChange={(e) => handleInterestChange(index, e)}
          />
          {user.futureInterests.length > 1 && (
            <button
              onClick={() => handleRemoveInterest(index)}
              className="text-red-600 text-lg font-bold"
            >
              ✖
            </button>
          )}
        </div>
      ))}

      <div
        className="h-10 w-10 rounded-full bg-gray-900 flex justify-center items-center text-2xl text-white p-6 cursor-pointer"
        onClick={handleAddInterest}
      >
        <i className="bi bi-clipboard-plus-fill"></i>
      </div>
    </div>
  );
}

export default Form4;
