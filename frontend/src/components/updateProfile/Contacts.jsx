import React from "react";
import { Input } from "@material-tailwind/react";
import { useUserUpdateStore } from "../../store/useUserUpdateStore.js";

function Contacts() {
  const { formData, handleNestedChange } = useUserUpdateStore();
  const contacts = formData.contacts || {}; // Make sure contacts is an object

  return (
    <>
      <h3>Contacts</h3>
      {Object.keys(contacts).length > 0 ? (
        Object.keys(contacts).map((key) => (
          <Input
            key={key}
            variant="standard"
            label={key}
            value={contacts[key]}
            onChange={(e) =>
              handleNestedChange("contacts", key, e.target.value)
            }
          />
        ))
      ) : (
        <p>No contacts available</p>
      )}
    </>
  );
}

export default Contacts;
