import React from "react";
import { useUserStore } from "../../../../store/useUserStore";

function Education({ formData, setFormData }) {
  const { authUser } = useUserStore();

  React.useEffect(() => {
    if (authUser?.education?.length > 0 && !formData.education) {
      const initialEducation = authUser.education.map((edu) => ({
        institute: edu.institute || "",
        degree: edu.degree || "",
        startDate: edu.startDate || "",
        endDate: edu.endDate || "",
      }));
      setFormData((prev) => ({ ...prev, education: initialEducation }));
    }
  }, [authUser]);

  const handleEducationChange = (index, field, value) => {
    const updatedEducation =
      formData.education?.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ) || [];
    setFormData((prev) => ({ ...prev, education: updatedEducation }));
  };

  const addNewEducation = () => {
    const newEducation = {
      institute: "",
      degree: "",
      startDate: "",
      endDate: "",
    };
    setFormData((prev) => ({
      ...prev,
      education: [...(prev.education || []), newEducation],
    }));
  };

  const removeEducation = (index) => {
    const updatedEducation =
      formData.education?.filter((_, i) => i !== index) || [];
    setFormData((prev) => ({ ...prev, education: updatedEducation }));
  };

  return (
    <div className="space-y-6 mt-6">
      <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-100">
        Education
      </h3>

      {formData.education?.length > 0 ? (
        formData.education.map((item, index) => (
          <div
            key={index}
            className="relative p-5 border border-teal-600 rounded-lg space-y-4 bg-white/70 dark:bg-gray-800/40 transition">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                Institute
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 text-gray-700 dark:text-gray-400 bg-white dark:bg-gray-900 border border-teal-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400 dark:placeholder-gray-500"
                value={item.institute}
                onChange={(e) =>
                  handleEducationChange(index, "institute", e.target.value)
                }
                placeholder="Enter institute name"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                Degree
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 text-gray-700 dark:text-gray-400 bg-white dark:bg-gray-900 border border-teal-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400 dark:placeholder-gray-500"
                value={item.degree}
                onChange={(e) =>
                  handleEducationChange(index, "degree", e.target.value)
                }
                placeholder="Enter degree name"
              />
            </div>

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
                    handleEducationChange(index, "startDate", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                  End Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 text-gray-700 dark:text-gray-400 bg-white dark:bg-gray-900 border border-teal-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={item.endDate}
                  onChange={(e) =>
                    handleEducationChange(index, "endDate", e.target.value)
                  }
                />
              </div>
            </div>

            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold transition-colors"
              onClick={() => removeEducation(index)}
              aria-label="Remove education entry">
              ×
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500 dark:text-gray-400">
          No education entries added
        </p>
      )}

      <button
        onClick={addNewEducation}
        className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 dark:hover:bg-teal-500 transition-colors duration-200">
        + Add Education
      </button>
    </div>
  );
}

export default Education;
