import React from "react";
import { Input } from "@material-tailwind/react";
import { useUserUpdateStore } from "../../store/useUserUpdateStore.js";
import { useAuthStore } from "../../store/useUserStore.js";

function Contacts({formData, setFormData}) {
  const { authUser } = useAuthStore();
  const [contacts, setContacts] = React.useState({
    github: authUser?.contacts?.github ?? "",
    linkedin: authUser?.contacts?.linkedin ?? "",
    facebook: authUser?.contacts?.facebook ?? "",
    portfolio: authUser?.contacts?.portfolio ?? "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContacts({ ...contacts, [name]: value });
    setFormData((prev) => ({
      ...prev,
      contacts: {
        ...prev.contacts,
        [name]: value, 
      },
    }));
  };
  return (
    <>
      <h3>Contacts</h3>

        {Object.keys(contacts).map((key) => (
          <Input
            key={key}
            variant="standard"
            label={key}
            name={key}
            value={contacts[key]}
            onChange={handleChange}
          />
        ))}
    </>
  );
}

export default Contacts;
