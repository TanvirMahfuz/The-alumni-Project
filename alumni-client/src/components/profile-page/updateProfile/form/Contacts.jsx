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
      <h3 className="text-2xl font-bold text-white">Contacts</h3>
      <div className="contact-fields">
        <label>
          GitHub:
          <input
            type="text"
            name="github"
            value={contacts.github}
            onChange={handleChange}
            placeholder={contacts.github}
            className="border-b border-gray-500 p-2 text-white focus:outline-none focus:border-gray-300 transition-colors duration-200"
          />
        </label>

        <label>
          LinkedIn:
          <input
            type="text"
            name="linkedin"
            value={contacts.linkedin}
            onChange={handleChange}
            placeholder={contacts.linkedin}
            className="border-b border-gray-500 p-2 text-white focus:outline-none focus:border-gray-300 transition-colors duration-200"
          />
        </label>

        <label>
          Facebook:
          <input
            type="text"
            name="facebook"
            value={contacts.facebook}
            onChange={handleChange}
            placeholder={contacts.facebook}
            className="border-b border-gray-500 p-2 text-white focus:outline-none focus:border-gray-300 transition-colors duration-200"
          />
        </label>

        <label>
          Portfolio:
          <input
            type="text"
            name="portfolio"
            value={contacts.portfolio}
            onChange={handleChange}
            placeholder={contacts.portfolio}
            className="border-b border-gray-500 p-2 text-white focus:outline-none focus:border-gray-300 transition-colors duration-200"
          />
        </label>
      </div>
    </>
  );
}

export default Contacts;
