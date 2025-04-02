import React from "react";
import { Input, Button, Badge } from "@material-tailwind/react";
import { useUserUpdateStore } from "../../store/useUserUpdateStore.js";

function Participation() {
  const { formData, setFormData, addToArray, removeFromArray } =
    useUserUpdateStore();

  function customArray(e, index) {
    let array = formData.participatedIn;
    array[index] = e.target.value;
    setFormData({
      ...formData,
      participatedIn: array,
    });
  }

  // Ensure participatedIn is always an array, and if it's empty, display a message
  if (!formData.participatedIn) {
    formData.participatedIn = [];
  }

  return (
    <>
      <h3>Participated In</h3>
      {formData.participatedIn.length > 0 ? (
        <div className="w-full flex flex-wrap gap-2">
          {formData.participatedIn.map((interest, index) => (
            <div key={index}>
              <Badge
                content="X"
                onClick={() => removeFromArray("participatedIn", index)}>
                <Input
                  type="text"
                  variant="standard"
                  placeholder="Participated In"
                  value={interest}
                  onChange={(e) => customArray(e, index)}
                />
              </Badge>
            </div>
          ))}
        </div>
      ) : (
        <p>No participations yet</p>
      )}

      <Button
        type="button"
        className="px-2 py-1"
        onClick={() => addToArray("participatedIn", "")}>
        + Add
      </Button>
    </>
  );
}

export default Participation;
