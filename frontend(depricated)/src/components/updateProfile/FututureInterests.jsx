import React from "react";
import { Input, Button, Chip } from "@material-tailwind/react";
import { useAuthStore } from "../../store/useUserStore.js";
import { XMarkIcon } from "@heroicons/react/24/solid";

function FutureInterests({ formData, setFormData }) {
  const { authUser } = useAuthStore();
  const [interests, setInterests] = React.useState([]);

  React.useEffect(() => {
    if (authUser?.futureInterests?.length > 0) {
      setInterests([...authUser.futureInterests]);
      setFormData((prev) => ({
        ...prev,
        futureInterests: [...authUser.futureInterests],
      }));
    }
  }, [authUser]);

  const handleInterestChange = (index, value) => {
    const updatedInterests = [...interests];
    updatedInterests[index] = value;
    setInterests(updatedInterests);
    setFormData((prev) => ({
      ...prev,
      futureInterests: updatedInterests,
    }));
  };

  const addNewInterest = () => {
    const updatedInterests = [...interests, ""];
    setInterests(updatedInterests);
    setFormData((prev) => ({
      ...prev,
      futureInterests: updatedInterests,
    }));
  };

  const removeInterest = (index) => {
    const updatedInterests = interests.filter((_, i) => i !== index);
    setInterests(updatedInterests);
    setFormData((prev) => ({
      ...prev,
      futureInterests: updatedInterests,
    }));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Future Interests</h3>

      {interests.length > 0 ? (
        <>
          <div className="flex flex-wrap items-center gap-4">
            {interests.map((interest, index) => (
              <div key={index} className="relative group">
                <div className="flex items-center">
                  <Input
                    type="text"
                    variant="standard"
                    placeholder="Interest"
                    value={interest}
                    onChange={(e) =>
                      handleInterestChange(index, e.target.value)
                    }
                    className="w-40 !border-gray-300 focus:!border-gray-900"
                  />
                  <button
                    onClick={() => removeInterest(index)}
                    className="p-1 text-gray-500 hover:text-red-500 transition-colors">
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Button
            onClick={addNewInterest}
            className="px-2 py-1 bg-gray-900 hover:bg-gray-800">
            + Add Interest
          </Button>
        </>
      ) : (
        <p className="text-gray-500">None</p>
      )}
    </div>
  );
}

export default FutureInterests;
