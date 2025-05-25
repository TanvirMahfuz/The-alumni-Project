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
      futureInterests: [...prev.futureInterests, ""],
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
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Future Interests</h3>

      {formData.futureInterests?.length > 0 ? (
        <>
          <div className="flex flex-wrap items-center gap-4">
            {formData.futureInterests.map((interest, index) => (
              <div key={index} className="relative group">
                <div className="flex items-center">
                  <input
                    type="text"
                    className="w-40 px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-gray-900"
                    placeholder="Interest"
                    value={interest}
                    onChange={(e) =>
                      handleInterestChange(index, e.target.value)
                    }
                  />
                  <button
                    onClick={() => removeInterest(index)}
                    className="p-1 text-gray-500 hover:text-red-500 transition-colors">
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-500">None</p>
      )}
      <button
        onClick={addNewInterest}
        className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors">
        + Add Interest
      </button>
    </div>
  );
}

export default FutureInterests;
