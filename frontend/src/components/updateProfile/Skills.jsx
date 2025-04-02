import React from "react";
import { Input, Button } from "@material-tailwind/react";
import { useUserUpdateStore } from "../../store/useUserUpdateStore.js";

function Skills() {
  const { formData, handleArrayChange, addToArray, removeFromArray } =
    useUserUpdateStore();
  if (!Array.isArray(formData.skills)) {
    formData.skills = [];
  }

  return (
    <>
      <h3>Skills</h3>
      <div className="w-full flex flex-wrap gap-2">
        {formData.skills.map((skill, index) => (
          <div key={index} className="relative">
            <div className="border p-2 py-4 border-gray-500 rounded-md space-y-4 flex items-center">
              <Input
                type="text"
                variant="standard"
                placeholder="Skill Title"
                value={skill.title}
                onChange={(e) =>
                  handleArrayChange("skills", index, "title", e.target.value)
                }
              />
              <button
                className="absolute text-sm bg-red-500 hover:bg-red-700 text-white rounded-full px-2 py-1 top-0 right-0 z-10"
                onClick={() => removeFromArray("skills", index)}>
                X
              </button>
            </div>
          </div>
        ))}
      </div>

      <Button
        type="button"
        className="px-2 py-1"
        onClick={() =>
          addToArray("skills", { title: "", image: "", level: 0 })
        }>
        + Add Skill
      </Button>
    </>
  );
}

export default Skills;
