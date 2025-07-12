import React, { useEffect, useState } from "react";
import { useUserStore } from "../../../../store/useUserStore";

function Introduction({ formData, setFormData }) {
  const { authUser } = useUserStore();

  // Initialize state synced with formData or authUser on mount/update
  const [name, setName] = useState(formData.name || "");
  const [session, setSession] = useState(formData.session || "");
  const [email, setEmail] = useState(formData.email || "");
  const [bio, setBio] = useState(formData.bio || "");
  const [availableForWork, setAvailableForWork] = useState(
    formData.availableForWork || false
  );

  // Sync local state with authUser when it changes (for initial load)
  useEffect(() => {
    if (authUser) {
      setName(authUser.name || "");
      setSession(authUser.session || "");
      setEmail(authUser.email || "");
      setBio(authUser.bio || "");
      setAvailableForWork(authUser.availableForWork || false);

      // Also update formData accordingly if empty (optional)
      setFormData((prev) => ({
        ...prev,
        name: authUser.name || "",
        session: authUser.session || "",
        email: authUser.email || "",
        bio: authUser.bio || "",
        availableForWork: authUser.availableForWork || false,
      }));
    }
  }, [authUser, setFormData]);

  // Generic change handler to keep state and formData in sync
  const handleChange = (field, value) => {
    switch (field) {
      case "name":
        setName(value);
        break;
      case "session":
        setSession(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "bio":
        setBio(value);
        break;
      case "availableForWork":
        setAvailableForWork(value);
        break;
      default:
        break;
    }

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-6 mt-6">
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
        Basic Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Name", name: "name", value: name, type: "text" },
          { label: "Session", name: "session", value: session, type: "text" },
          { label: "Email", name: "email", value: email, type: "email" },
        ].map(({ label, name, value, type }) => (
          <div key={name} className="flex flex-col">
            <label
              htmlFor={name}
              className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              {label}
            </label>
            <input
              type={type}
              id={name}
              name={name}
              value={value}
              onChange={(e) => handleChange(name, e.target.value)}
              placeholder={`Enter your ${label.toLowerCase()}`}
              className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-400 border border-teal-600 rounded-lg px-4 py-2 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="bio"
          className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={4}
          value={bio}
          onChange={(e) => handleChange("bio", e.target.value)}
          placeholder="Tell us a little about yourself..."
          className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-400 border border-teal-600 rounded-lg px-4 py-2 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="availableForWork"
          checked={availableForWork}
          onChange={(e) => handleChange("availableForWork", e.target.checked)}
          className="h-5 w-5 text-teal-600 border-gray-300 rounded focus:ring-2 focus:ring-teal-500"
        />
        <label
          htmlFor="availableForWork"
          className="ml-3 text-sm text-gray-600 dark:text-gray-400 select-none">
          I’m currently available for work
        </label>
      </div>
    </div>
  );
}

export default Introduction;
