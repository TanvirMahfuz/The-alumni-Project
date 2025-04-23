import React from "react";
import { Input, Button, Chip } from "@material-tailwind/react";
import { useAuthStore } from "../../store/useUserStore.js";
import { XMarkIcon } from "@heroicons/react/24/solid";

function Participation({ formData, setFormData }) {
  const { authUser } = useAuthStore();
  const [participations, setParticipations] = React.useState([]);

  React.useEffect(() => {
    if (authUser?.participatedIn?.length > 0) {
      const initialParticipations = authUser.participatedIn.map((item) => ({
        title: item.title || "",
        institute: item.institute || "",
        startDate: item.startDate || "",
        endDate: item.endDate || "",
      }));
      setParticipations(initialParticipations);
      setFormData((prev) => ({
        ...prev,
        participatedIn: initialParticipations,
      }));
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
      participatedIn: [...prev.participatedIn, newParticipation],
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
            <Input
              variant="standard"
              label="Title"
              value={participation.title}
              onChange={(e) =>
                handleParticipationChange(index, "title", e.target.value)
              }
            />
            <Input
              variant="standard"
              label="Institute"
              value={participation.institute}
              onChange={(e) =>
                handleParticipationChange(index, "institute", e.target.value)
              }
            />
            <div className="flex gap-3">
              <Input
                type="date"
                variant="standard"
                label="Start Date"
                value={participation.startDate}
                onChange={(e) =>
                  handleParticipationChange(index, "startDate", e.target.value)
                }
              />
              <Input
                type="date"
                variant="standard"
                label="End Date"
                value={participation.endDate}
                onChange={(e) =>
                  handleParticipationChange(index, "endDate", e.target.value)
                }
              />
            </div>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={() => removeParticipation(index)}>
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No participations yet</p>
      )}

      <Button onClick={addNewParticipation} className="px-2 py-1 bg-gray-900">
        + Add Participation
      </Button>
    </div>
  );
}

export default Participation;
