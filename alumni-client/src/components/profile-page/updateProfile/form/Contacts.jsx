import React from "react";
import { useUserStore } from "../../../../store/useUserStore";

function Contacts({ formData, setFormData }) {
  const { authUser } = useUserStore();
  const [contacts, setContacts] = React.useState({
    github: authUser?.contacts?.github ?? "",
    linkedin: authUser?.contacts?.linkedin ?? "",
    facebook: authUser?.contacts?.facebook ?? "",
    portfolio: authUser?.contacts?.portfolio ?? "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContacts((prev) => ({ ...prev, [name]: value }));
    setFormData((prev) => ({ ...prev, contacts }));
  };

  return (
    <>
      <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-200 mb-6">
        Contact Links
      </h3>
      <div className="grid gap-6 md:grid-cols-2">
        {[
          { label: "GitHub", name: "github", value: contacts.github },
          { label: "LinkedIn", name: "linkedin", value: contacts.linkedin },
          { label: "Facebook", name: "facebook", value: contacts.facebook },
          { label: "Portfolio", name: "portfolio", value: contacts.portfolio },
        ].map(({ label, name, value }) => (
          <div key={name} className="flex flex-col">
            <label
              htmlFor={name}
              className="text-gray-500 dark:text-gray-300 mb-1 text-sm font-medium">
              {label}
            </label>
            <input
              type="text"
              id={name}
              name={name}
              value={value}
              onChange={handleChange}
              placeholder={`Enter your ${label.toLowerCase()}`}
              className="bg-white/10 text-gray-600 dark:text-gray-400 border border-teal-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 placeholder-gray-400"
            />
          </div>
        ))}
      </div>
    </>
  );
  
}

export default Contacts;
