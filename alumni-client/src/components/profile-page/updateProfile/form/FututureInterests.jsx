import React, { useEffect } from "react";
import { useUserStore } from "../../../../store/useUserStore";

function FutureInterests({ formData, setFormData }) {
  const { authUser } = useUserStore();

  useEffect(() => {
    if (authUser?.futureInterests?.length > 0) {
      setFormData((prev) => ({
        ...prev,
        futureInterests: [...authUser.futureInterests],
      }));
    }
  }, [authUser, setFormData]);

  const handleInterestChange = (index, value) => {
    const updatedInterests = [...formData.futureInterests];
    updatedInterests[index] = value;
    setFormData((prev) => ({
      ...prev,
      futureInterests: updatedInterests,
    }));
  };

  const addNewInterest = () => {
    setFormData((prev) => ({
      ...prev,
      futureInterests: [...(prev.futureInterests || []), ""],
    }));
  };

  const removeInterest = (index) => {
    const updatedInterests = formData.futureInterests.filter(
      (_, i) => i !== index
    );
    setFormData((prev) => ({
      ...prev,
      futureInterests: updatedInterests,
    }));
  };

  return (
    <div className="space-y-6 mt-6">
      <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
        Future Interests
      </h3>

      {formData.futureInterests?.length > 0 ? (
        <div className="flex flex-wrap items-center gap-4">
          {formData.futureInterests.map((interest, index) => (
            <div
              key={index}
              className="relative flex items-center space-x-2 p-3 border border-teal-600 rounded-md
                         bg-white/20 dark:bg-gray-700/40 transition-colors duration-200">
              <input
                type="text"
                className="w-40 px-4 py-2
                           text-gray-700 placeholder-gray-500
                           border border-teal-600 rounded-md
                           bg-white dark:bg-gray-900
                           focus:outline-none focus:ring-2 focus:ring-teal-500
                           dark:text-gray-200 dark:placeholder-gray-400
                           transition-colors duration-200"
                placeholder="Interest"
                value={interest}
                onChange={(e) => handleInterestChange(index, e.target.value)}
              />
              <button
                onClick={() => removeInterest(index)}
                className="text-gray-400 hover:text-red-500 text-xl font-bold transition-colors"
                aria-label="Remove interest">
                ×
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">None</p>
      )}

      <button
        onClick={addNewInterest}
        className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 dark:hover:bg-teal-500
                   transition-colors duration-200">
        + Add Interest
      </button>
    </div>
  );
}

export default FutureInterests;
