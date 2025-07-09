import React, { useState, useEffect } from "react";
import { useUserStore } from "../../../../store/useUserStore";

function Participation({ formData, setFormData }) {
  const { authUser } = useUserStore();
  const [participations, setParticipations] = useState([]);

  useEffect(() => {

    if (authUser?.participatedIn?.length > 0) {
      const initialParticipations = authUser.participatedIn.map((item) => ({
        title: item.title || "",
        institute: item.institute || "",
        startDate: item.startDate || "",
        endDate: item.endDate || "",
      }));
      setParticipations(initialParticipations);

    }
  }, [authUser]);

  const handleParticipationChange = (index, field, value) => {
    const updatedParticipations = [...participations];
    updatedParticipations[index][field] = value;
    setParticipations(updatedParticipations);

    setFormData((prev) => ({
      ...prev,
      participatedIn: updatedParticipations,
    }));
  };

  const addNewParticipation = () => {
    const newParticipation = {
      title: "",
      institute: "",
      startDate: "",
      endDate: "",
    };
    setParticipations((prev) => [...prev, newParticipation]);

    setFormData((prev) => ({
      ...prev,
      participatedIn: newParticipation,
    }));
  };

  const removeParticipation = (index) => {
    const updatedParticipations = participations.filter((_, i) => i !== index);
    setParticipations(updatedParticipations);

    setFormData((prev) => ({
      ...prev,
      participatedIn: updatedParticipations,
    }));
  };

  return (
    <div className="space-y-6 mt-6">
      <h3 className="text-2xl font-semibold text-gray-600">Participated In</h3>

      {participations.length > 0 ? (
        participations.map((participation, index) => (
          <div
            key={index}
            className="relative p-5 border border-teal-600 rounded-lg bg-white/10 space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-500">
                Title
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 text-gray-600 border border-teal-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400"
                value={participation.title}
                onChange={(e) =>
                  handleParticipationChange(index, "title", e.target.value)
                }
                placeholder="Enter title"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-500">
                Institute
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 text-gray-600 border border-teal-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400"
                value={participation.institute}
                onChange={(e) =>
                  handleParticipationChange(index, "institute", e.target.value)
                }
                placeholder="Enter institute name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-500">
                  Start Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 text-gray-600 border border-teal-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={participation.startDate}
                  onChange={(e) =>
                    handleParticipationChange(
                      index,
                      "startDate",
                      e.target.value
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-500">
                  End Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 text-gray-600 border border-teal-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={participation.endDate}
                  onChange={(e) =>
                    handleParticipationChange(index, "endDate", e.target.value)
                  }
                />
              </div>
            </div>

            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold transition-all"
              onClick={() => removeParticipation(index)}
              aria-label="Remove participation">
              ×
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No participations yet</p>
      )}

      <button
        onClick={addNewParticipation}
        className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-gray-800 transition-colors duration-200">
        + Add Participation
      </button>
    </div>
  );
  
}

export default Participation;
