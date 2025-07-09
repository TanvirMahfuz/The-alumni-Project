import React, { useEffect } from "react";
import { useUserStore } from "../../../../store/useUserStore";

function Experience({ formData, setFormData }) {
  const { authUser } = useUserStore();

  useEffect(() => {
    if (authUser?.jobExperience?.length > 0) {
      const initialExperience = authUser.jobExperience.map((exp) => ({
        title: exp.title || "",
        company: exp.company || "",
        startDate: exp.startDate || "",
        endDate: exp.endDate || "",
        description: exp.description || "",
      }));
      setFormData((prev) => ({
        ...prev,
        jobExperience: initialExperience,
      }));
    }
  }, [authUser, setFormData]);

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...formData.jobExperience];
    updatedExperience[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      jobExperience: updatedExperience,
    }));
  };

  const addNewExperience = () => {
    const newExperience = {
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    setFormData((prev) => ({
      ...prev,
      jobExperience: [...prev.jobExperience, newExperience],
    }));
  };

  const removeExperience = (index) => {
    const updatedExperience = formData.jobExperience.filter(
      (_, i) => i !== index
    );
    setFormData((prev) => ({
      ...prev,
      jobExperience: updatedExperience,
    }));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-600">Work Experience</h3>

      {formData.jobExperience?.map((item, index) => (
        <div
          key={index}
          className="relative p-6 border border-gray-200 rounded-lg shadow-sm space-y-4 bg-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Job Title
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={item.title}
                onChange={(e) =>
                  handleExperienceChange(index, "title", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Company
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={item.company}
                onChange={(e) =>
                  handleExperienceChange(index, "company", e.target.value)
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Start Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={item.startDate}
                onChange={(e) =>
                  handleExperienceChange(index, "startDate", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                End Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={item.endDate}
                onChange={(e) =>
                  handleExperienceChange(index, "endDate", e.target.value)
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Description
            </label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={item.description}
              onChange={(e) =>
                handleExperienceChange(index, "description", e.target.value)
              }
            />
          </div>

          <button
            onClick={() => removeExperience(index)}
            className="absolute top-2 right-2 text-gray-500 hover:text-red-500 p-1 rounded-full hover:bg-gray-100">
            ×
          </button>
        </div>
      ))}

      <button
        onClick={addNewExperience}
        className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-gray-800 transition-colors">
        + Add Experience
      </button>
    </div>
  );
}

export default Experience;
