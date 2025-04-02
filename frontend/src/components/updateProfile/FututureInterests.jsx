import React from "react";
import { Input, Button, Badge } from "@material-tailwind/react";
import { useUserUpdateStore } from "../../store/useUserUpdateStore.js";

function FutureInterests() {
  const { formData, setFormData, addToArray, removeFromArray } =
    useUserUpdateStore();

  function customArray(e, index) {
    // Ensure that futureInterests is initialized
    const updatedInterests = [...(formData.futureInterests || [])];
    updatedInterests[index] = e.target.value;

    // Update the form data with the modified futureInterests
    setFormData({
      ...formData,
      futureInterests: updatedInterests,
    });
  }

  return (
    <>
      <h3>Future Interests</h3>
      {formData.futureInterests && formData.futureInterests.length > 0 ? (
        <>
          <div className="w-full flex flex-wrap gap-2">
            {formData.futureInterests.map((interest, index) => (
              <div key={index}>
                <Badge
                  content="X"
                  onClick={() => removeFromArray("futureInterests", index)}>
                  <Input
                    type="text"
                    variant="standard"
                    placeholder="Interest"
                    value={interest}
                    onChange={(e) => customArray(e, index)}
                  />
                </Badge>
              </div>
            ))}
          </div>

          <Button
            type="button"
            className="px-2 py-1"
            onClick={() => addToArray("futureInterests", "")}>
            + Add Interest
          </Button>
        </>
      ) : (
        <p>None</p>
      )}
    </>
  );
}

export default FutureInterests;
