import React from "react";
import { Input, Typography, Textarea } from "@material-tailwind/react";

function Form5({ user, setUser }) {
  const handleParticipationChange = (index, event) => {
    const values = [...user.participatedIn];
    values[index][event.target.name] = event.target.value;
    setUser({ ...user, participatedIn: values });
  };

  const handleAddParticipation = () => {
    setUser({
      ...user,
      participatedIn: [
        ...user.participatedIn,
        { title: "", institute: "", startDate: "", endDate: "" },
      ],
    });
  };

  const handleRemoveParticipation = (index) => {
    const values = [...user.participatedIn];
    values.splice(index, 1);
    setUser({ ...user, participatedIn: values });
  };

  const handleProjectChange = (index, event) => {
    const values = [...user.projects];
    values[index][event.target.name] = event.target.value;
    setUser({ ...user, projects: values });
  };

  const handleAddProject = () => {
    setUser({
      ...user,
      projects: [
        ...user.projects,
        { projectName: "", projectDescription: "", projectLink: "" },
      ],
    });
  };

  const handleRemoveProject = (index) => {
    const values = [...user.projects];
    values.splice(index, 1);
    setUser({ ...user, projects: values });
  };

  return (
    <div className="space-y-6">
      {/* Participation Section */}
      <Typography className="text-3xl font-medium">Participated In</Typography>
      <hr className="mb-4" />
      {user.participatedIn.map((item, index) => (
        <div key={index} className="relative space-y-3 border p-4 rounded-lg">
          {user.participatedIn.length > 1 && (
            <button
              onClick={() => handleRemoveParticipation(index)}
              className="absolute top-0 right-2 text-red-600 text-lg font-bold z-20"
            >
              ✖
            </button>
          )}
          <Input
            type="text"
            label="Title"
            name="title"
            value={item.title}
            onChange={(e) => handleParticipationChange(index, e)}
          />
          <Input
            type="text"
            label="Institute"
            name="institute"
            value={item.institute}
            onChange={(e) => handleParticipationChange(index, e)}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Input
              type="text"
              label="Start Date"
              name="startDate"
              value={item.startDate}
              onChange={(e) => handleParticipationChange(index, e)}
            />
            <Input
              type="text"
              label="End Date"
              name="endDate"
              value={item.endDate}
              onChange={(e) => handleParticipationChange(index, e)}
            />
          </div>
        </div>
      ))}
      <div
        className="h-10 w-10 rounded-full bg-gray-900 flex justify-center items-center text-2xl text-white p-6 cursor-pointer"
        onClick={handleAddParticipation}
      >
        <i className="bi bi-clipboard-plus-fill"></i>
      </div>

      {/* Projects Section */}
      <Typography className="text-3xl font-medium">Projects</Typography>
      <hr className="mb-4" />
      {user.projects.map((project, index) => (
        <div key={index} className="relative space-y-3 border p-4 rounded-lg">
          {user.projects.length > 1 && (
            <button
              onClick={() => handleRemoveProject(index)}
              className="absolute top-0 right-2 text-red-600 text-lg font-bold z-20"
            >
              ✖
            </button>
          )}
          <Input
            type="text"
            label="Project Name"
            name="projectName"
            value={project.projectName}
            onChange={(e) => handleProjectChange(index, e)}
          />
          <Textarea
            label="Project Description"
            name="projectDescription"
            value={project.projectDescription}
            onChange={(e) => handleProjectChange(index, e)}
          />
          <Input
            type="text"
            label="Project Link"
            name="projectLink"
            value={project.projectLink}
            onChange={(e) => handleProjectChange(index, e)}
          />
        </div>
      ))}
      <div
        className="h-10 w-10 rounded-full bg-gray-900 flex justify-center items-center text-2xl text-white p-6 cursor-pointer"
        onClick={handleAddProject}
      >
        <i className="bi bi-clipboard-plus-fill"></i>
      </div>
    </div>
  );
}

export default Form5;
