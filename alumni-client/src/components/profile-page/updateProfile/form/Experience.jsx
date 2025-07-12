import React, { useEffect } from "react";
import { useUserStore } from "../../../../store/useUserStore";

function Experience({ formData, setFormData }) {
  const { authUser } = useUserStore();

  useEffect(() => {
    if (authUser?.jobExperience?.length > 0 && !formData.jobExperience) {
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
  }, [authUser]);

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience =
      formData.jobExperience?.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ) || [];
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
      jobExperience: [...(prev.jobExperience || []), newExperience],
    }));
  };

  const removeExperience = (index) => {
    const updatedExperience =
      formData.jobExperience?.filter((_, i) => i !== index) || [];
    setFormData((prev) => ({
      ...prev,
      jobExperience: updatedExperience,
    }));
  };

  return (
    <div className="space-y-6 mt-6">
      <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Work Experience
      </h3>

      {formData.jobExperience?.length > 0 ? (
        formData.jobExperience.map((item, index) => (
          <div
            key={index}
            className="relative p-5 border border-teal-600 rounded-lg space-y-4 bg-white/70 dark:bg-gray-800/40 transition">
            {/* Job Title */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                Job Title
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border border-teal-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400 dark:placeholder-gray-500"
                value={item.title}
                onChange={(e) =>
                  handleExperienceChange(index, "title", e.target.value)
                }
                placeholder="e.g. Software Engineer"
              />
            </div>

            {/* Company */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                Company
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border border-teal-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400 dark:placeholder-gray-500"
                value={item.company}
                onChange={(e) =>
                  handleExperienceChange(index, "company", e.target.value)
                }
                placeholder="e.g. ABC Corporation"
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Start Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 text-gray-700 dark:text-gray-400 bg-white dark:bg-gray-900 border border-teal-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={item.startDate}
                  onChange={(e) =>
                    handleExperienceChange(index, "startDate", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600  dark:text-gray-300">
                  End Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 text-gray-700 dark:text-gray-400 bg-white dark:bg-gray-900 border border-teal-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={item.endDate}
                  onChange={(e) =>
                    handleExperienceChange(index, "endDate", e.target.value)
                  }
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                Description
              </label>
              <textarea
                rows={3}
                className="w-full px-4 py-2 text-gray-700 dark:text-gray-400 bg-white dark:bg-gray-900 border border-teal-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400 dark:placeholder-gray-500"
                value={item.description}
                onChange={(e) =>
                  handleExperienceChange(index, "description", e.target.value)
                }
                placeholder="Describe your responsibilities or achievements..."
              />
            </div>

            {/* Remove Button */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold transition-colors"
              onClick={() => removeExperience(index)}
              aria-label="Remove experience entry">
              ×
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500 dark:text-gray-400">
          No work experience entries added
        </p>
      )}

      <button
        onClick={addNewExperience}
        className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 dark:hover:bg-teal-500 transition-colors duration-200">
        + Add Experience
      </button>
    </div>
  );
}

export default Experience;
