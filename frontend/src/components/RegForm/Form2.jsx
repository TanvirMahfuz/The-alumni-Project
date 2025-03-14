import React from "react";
import { Input, Typography } from "@material-tailwind/react";

function Form2({ user, setUser }) {
  const handleChange = (index, event) => {
    const updatedEducation = [...user.education];
    updatedEducation[index][event.target.name] = event.target.value;
    console.log(user);
    setUser({
      ...user,
      education: updatedEducation,
    });
  };

  const handleAddEducation = () => {
    const newEducation = {
      degree: "",
      institute: "",
      startDate: "",
      endDate: "",
    };
    setUser({
      ...user,
      education: [...user.education, newEducation],
    });
  };

  const handleRemoveEducation = (index) => {
    const updatedEducation = [...user.education];
    updatedEducation.splice(index, 1);
    setUser({
      ...user,
      education: updatedEducation,
    });
  };

  return (
    <>
      <div className="space-y-4">
        <Typography className="text-3xl font-medium">Education</Typography>
        <hr className="mb-4" />

        {user.education.map((edu, index) => (
          <div key={index} className="relative space-y-3 border p-4 rounded-lg">
            {/* Close button */}
            {user.education.length > 1 && (
              <button
                onClick={() => handleRemoveEducation(index)}
                className="absolute top-0 right-1 text-red-600 text-lg font-bold z-20"
              >
                ✖
              </button>
            )}

            <Input
              type="text"
              label="Degree"
              name="degree"
              value={edu.degree}
              onChange={(e) => handleChange(index, e)}
            />
            <Input
              type="text"
              label="Institute"
              name="institute"
              value={edu.institute}
              onChange={(e) => handleChange(index, e)}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Input
                type="text"
                label="Start year"
                name="startDate"
                value={edu.startDate}
                onChange={(e) => handleChange(index, e)}
                className="col-span-1"
              />
              <Input
                type="text"
                label="End year"
                name="endDate"
                value={edu.endDate}
                onChange={(e) => handleChange(index, e)}
                className="col-span-1"
              />
            </div>
          </div>
        ))}

        {/* Add Education Button */}
        <div
          className="h-10 w-10 rounded-full bg-gray-900 flex justify-center items-center text-2xl text-white p-6 cursor-pointer"
          onClick={handleAddEducation}
        >
          <i className="bi bi-clipboard-plus-fill"></i>
        </div>
      </div>
    </>
  );
}

export default Form2;
