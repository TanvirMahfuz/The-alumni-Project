import React from "react";
import { Input,Checkbox } from "@material-tailwind/react";
import { useUserUpdateStore } from "../../store/useUserUpdateStore.js";
function Introduction() {
  const { formData, handleChange } = useUserUpdateStore();
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          variant="standard"
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          variant="standard"
          label="Session"
          name="session"
          value={formData.session}
          onChange={handleChange}
        />
        <Input
          variant="standard"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <Input
        variant="standard"
        label="Bio"
        name="bio"
        value={formData.bio}
        onChange={handleChange}
      />
      <Checkbox
        defaultChecked
        label="Available for work"
        name="availableForWork"
        checked={formData.availableForWork}
        onChange={handleChange}
      />
    </>
  );
}

export default Introduction;
