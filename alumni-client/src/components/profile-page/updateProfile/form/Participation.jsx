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
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Participated In</h3>

      {participations.length > 0 ? (
        participations.map((participation, index) => (
          <div
            key={index}
            className="relative p-4 border border-gray-300 rounded-lg space-y-3">
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                className="border-b border-gray-300 p-2 focus:outline-none focus:border-blue-500"
                value={participation.title}
                onChange={(e) =>
                  handleParticipationChange(index, "title", e.target.value)
                }
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Institute
              </label>
              <input
                type="text"
                className="border-b border-gray-300 p-2 focus:outline-none focus:border-blue-500"
                value={participation.institute}
                onChange={(e) =>
                  handleParticipationChange(index, "institute", e.target.value)
                }
              />
            </div>

            <div className="flex gap-3">
              <div className="flex-1 flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  className="border-b border-gray-300 p-2 focus:outline-none focus:border-blue-500"
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
              <div className="flex-1 flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  type="date"
                  className="border-b border-gray-300 p-2 focus:outline-none focus:border-blue-500"
                  value={participation.endDate}
                  onChange={(e) =>
                    handleParticipationChange(index, "endDate", e.target.value)
                  }
                />
              </div>
            </div>

            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
              onClick={() => removeParticipation(index)}>
              ×
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No participations yet</p>
      )}

      <button
        onClick={addNewParticipation}
        className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors">
        + Add Participation
      </button>
    </div>
  );
}

export default Participation;
