import React from "react";

function SkillsList() {
  const skills = [
    "JavaScript (ES6+)",
    "React.js",
    "Node.js",
    "MongoDB",
    "Express",
    "TypeScript",
    "Tailwind CSS",
    "Redux",
  ];

  return (
    <div className="flex flex-wrap gap-3 mt-2">
      {skills.map((skill, index) => (
        <div key={index} className="flex items-start group">
          <span className="bg-gray-100 text-black text-sm font-medium px-3 py-1.5 rounded-full shadow-sm hover:bg-gray-500 transition-colors duration-200 cursor-default">
            {skill}
          </span>
        </div>
      ))}
    </div>
  );
}

export default SkillsList;
