import React, { useState } from "react";
import { useUserStore } from "../../../../store/useUserStore";

function Introduction({ formData, setFormData }) {
  const { authUser } = useUserStore();
  const [name, setName] = useState("");
  const [session, setSession] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [availableForWork, setAvailableForWork] = useState(false);

  React.useEffect(() => {
    if (authUser) {
      setName(authUser.name || "");
      setSession(authUser.session || "");
      setEmail(authUser.email || "");
      setBio(authUser.bio || "");
      setAvailableForWork(authUser.availableForWork || false);
    }
  }, [authUser]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-2xl font-semibold text-gray-600">
        Basic Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            label: "Name",
            name: "name",
            value: name,
            type: "text",
            setValue: setName,
          },
          {
            label: "Session",
            name: "session",
            value: session,
            type: "text",
            setValue: setSession,
          },
          {
            label: "Email",
            name: "email",
            value: email,
            type: "email",
            setValue: setEmail,
          },
        ].map(({ label, name, value, type, setValue }) => (
          <div key={name} className="flex flex-col">
            <label
              htmlFor={name}
              className="text-sm font-medium text-gray-500 mb-1">
              {label}
            </label>
            <input
              type={type}
              id={name}
              name={name}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                handleChange(e);
              }}
              placeholder={`Enter your ${label.toLowerCase()}`}
              className="bg-white/10 text-gray-600 border border-teal-600 rounded-lg px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col">
        <label htmlFor="bio" className="text-sm font-medium text-gray-500 mb-1">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={4}
          value={bio}
          onChange={(e) => {
            setBio(e.target.value);
            handleChange(e);
          }}
          placeholder="Tell us a little about yourself..."
          className="bg-white/10 text-gray-600 border border-teal-600 rounded-lg px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="availableForWork"
          className="h-5 w-5 text-teal-600 border-gray-300 rounded focus:ring-2 focus:ring-teal-500"
          checked={availableForWork}
          onChange={(e) => {
            setAvailableForWork(e.target.checked);
            setFormData((prev) => ({
              ...prev,
              availableForWork: e.target.checked,
            }));
          }}
        />
        <label
          htmlFor="availableForWork"
          className="ml-3 text-sm text-gray-600">
          I’m currently available for work
        </label>
      </div>
    </div>
  );
  
}

export default Introduction;
