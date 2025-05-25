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
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Education</h3>

      {formData.education?.length > 0 ? (
        formData.education.map((item, index) => (
          <div
            key={index}
            className="relative p-4 border border-gray-300 rounded-lg space-y-4">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Institute
              </label>
              <input
                type="text"
                className="w-full p-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                value={item.institute}
                onChange={(e) =>
                  handleEducationChange(index, "institute", e.target.value)
                }
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Degree
              </label>
              <input
                type="text"
                className="w-full p-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                value={item.degree}
                onChange={(e) =>
                  handleEducationChange(index, "degree", e.target.value)
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  className="w-full p-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                  value={item.startDate}
                  onChange={(e) =>
                    handleEducationChange(index, "startDate", e.target.value)
                  }
                />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  type="date"
                  className="w-full p-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                  value={item.endDate}
                  onChange={(e) =>
                    handleEducationChange(index, "endDate", e.target.value)
                  }
                />
              </div>
            </div>

            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
              onClick={() => removeEducation(index)}>
              ×
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No education entries added</p>
      )}

      <button
        onClick={addNewEducation}
        className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors">
        + Add Education
      </button>
    </div>
  );
}

export default Education;
