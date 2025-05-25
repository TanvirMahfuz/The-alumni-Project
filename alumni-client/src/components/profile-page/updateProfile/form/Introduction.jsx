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
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              handleChange(e);
            }}
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Session
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
            name="session"
            value={session}
            onChange={(e) => {
              setSession(e.target.value);
              handleChange(e);
            }}
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              handleChange(e);
            }}
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Bio</label>
        <textarea
          rows={3}
          className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
          name="bio"
          value={bio}
          onChange={(e) => {
            setBio(e.target.value);
            handleChange(e);
          }}
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="availableForWork"
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
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
          className="ml-2 block text-sm text-gray-700">
          Available for work
        </label>
      </div>
    </div>
  );
}

export default Introduction;
