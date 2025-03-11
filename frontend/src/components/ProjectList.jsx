import React from "react";
import ProjectCard from "./ProjectCard";

const ProjectsList = ({projects}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  );
};

export default ProjectsList;
