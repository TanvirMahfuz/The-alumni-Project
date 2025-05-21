import React from "react";

function WorkingOnList() {
  const projects = [
    {
      title: "Personal Portfolio Website",
      techStack: "Next.js, Tailwind CSS",
      description:
        "Rebuilding my portfolio to showcase new projects and skills.",
    },
    {
      title: "E-commerce Mobile App",
      techStack: "React Native, Node.js, MongoDB",
      description: "Developing a full-stack e-commerce solution for a client.",
    },
    {
      title: "Internal Admin Dashboard",
      techStack: "React.js, Express, PostgreSQL",
      description:
        "Building a powerful dashboard for internal data management.",
    },
  ];

  return (
    <div className="flex flex-wrap gap-4 mt-2">
      {projects.map((project, index) => (
        <div
          key={index}
          className="bg-gray-700 p-3 rounded-md  transition-all duration-200">
          <h3 className="text-lg font-medium text-white mb-1">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm italic">
            Tech Stack: {project.techStack}
          </p>
        </div>
      ))}
    </div>
  );
}

export default WorkingOnList;
