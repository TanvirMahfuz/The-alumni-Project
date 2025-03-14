import React from "react";
import { Input, Textarea, Typography } from "@material-tailwind/react";

function Form3({ user, setUser }) {
  const handleCurrentJobChange = (event) => {
    setUser({
      ...user,
      currentJob: {
        ...user.currentJob,
        [event.target.name]: event.target.value,
      },
    });
  };

  const handleExperienceChange = (index, event) => {
    const updatedExperience = [...user.jobExperience];
    updatedExperience[index][event.target.name] = event.target.value;
    setUser({
      ...user,
      jobExperience: updatedExperience,
    });
  };

  const handleAddExperience = () => {
    setUser({
      ...user,
      jobExperience: [
        ...user.jobExperience,
        {
          title: "",
          company: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    });
  };

  const handleRemoveExperience = (index) => {
    const updatedExperience = [...user.jobExperience];
    updatedExperience.splice(index, 1);
    setUser({
      ...user,
      jobExperience: updatedExperience,
    });
  };

  return (
    <div className="space-y-6">
      {/* Current Job Section */}
      <Typography className="text-3xl font-medium">Current Job</Typography>
      <hr className="mb-4" />

      <div className="relative space-y-3 border p-4 rounded-lg">
        <Input
          type="text"
          label="Job Title"
          name="title"
          value={user.currentlyWorkingIn.title}
          onChange={handleCurrentJobChange}
        />
        <Input
          type="text"
          label="Company"
          name="company"
          value={user.currentlyWorkingIn.company}
          onChange={handleCurrentJobChange}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Input
            type="text"
            label="Start Year"
            name="startDate"
            value={user.currentlyWorkingIn.startDate}
            onChange={handleCurrentJobChange}
            className="col-span-1"
          />
          <Input
            type="text"
            label="End Year"
            name="endDate"
            value={user.currentlyWorkingIn.endDate}
            onChange={handleCurrentJobChange}
            className="col-span-1"
          />
        </div>
        <Textarea
          label="Job Description"
          name="description"
          value={user.currentlyWorkingIn.description}
          onChange={handleCurrentJobChange}
        />
      </div>

      {/* Job Experience Section */}
      <Typography className="text-3xl font-medium">Job Experience</Typography>
      <hr className="mb-4" />

      {user.jobExperience.map((job, index) => (
        <div key={index} className="relative space-y-3 border p-4 rounded-lg">
          {/* Close Button */}
          {user.jobExperience.length > 1 && (
            <button
              onClick={() => handleRemoveExperience(index)}
              className="absolute top-0 right-2 text-red-600 text-lg font-bold z-20"
            >
              ✖
            </button>
          )}

          <Input
            type="text"
            label="Job Title"
            name="title"
            value={job.title}
            onChange={(e) => handleExperienceChange(index, e)}
          />
          <Input
            type="text"
            label="Company"
            name="company"
            value={job.company}
            onChange={(e) => handleExperienceChange(index, e)}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Input
              type="text"
              label="Start Year"
              name="startDate"
              value={job.startDate}
              onChange={(e) => handleExperienceChange(index, e)}
              className="col-span-1"
            />
            <Input
              type="text"
              label="End Year"
              name="endDate"
              value={job.endDate}
              onChange={(e) => handleExperienceChange(index, e)}
              className="col-span-1"
            />
          </div>
          <Textarea
            label="Job Description"
            name="description"
            value={job.description}
            onChange={(e) => handleExperienceChange(index, e)}
          />
        </div>
      ))}

      {/* Add Job Experience Button */}
      <div
        className="h-10 w-10 rounded-full bg-gray-900 flex justify-center items-center text-2xl text-white p-6 cursor-pointer"
        onClick={handleAddExperience}
      >
        <i className="bi bi-clipboard-plus-fill"></i>
      </div>
    </div>
  );
}

export default Form3;
