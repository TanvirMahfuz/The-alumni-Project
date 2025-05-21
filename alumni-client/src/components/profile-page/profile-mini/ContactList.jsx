// ContactList.jsx
import React from "react";

function ContactList() {
  const contacts = [
    { name: "email", icon: "✉️", link: "#" },
    { name: "phone", icon: "📱", link: "#" },
    { name: "linkedin", icon: "🔗", link: "#" },
    { name: "github", icon: "💻", link: "#" },
  ];

  return (
    <ul className="flex flex-wrap justify-center md:justify-start gap-6">
      {contacts.map((contact, index) => (
        <li
          key={index}
          className="flex items-center gap-1 transition-all">
          <span>{contact.icon}</span>
          <span className="text-sm">{contact.name}</span>
        </li>
      ))}
    </ul>
  );
}

export default ContactList;
