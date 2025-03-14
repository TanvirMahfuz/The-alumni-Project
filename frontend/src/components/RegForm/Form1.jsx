import React from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { Input, Textarea } from "@material-tailwind/react";

function Form1({ user, setUser, file, setFile }) {
    const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setUser((prevData) => ({
      ...prevData,
      image: file,
    }));
  };
  // Method to handle input change for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Method to handle nested fields like "contacts" and "education"
  const handleNestedInputChange = (e, fieldName) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [fieldName]: {
        ...prevUser[fieldName],
        [name]: value,
      },
    }));
  };

  // Method to handle nested array fields like "education", "jobExperience"
  const handleArrayInputChange = (e, index, fieldName) => {
    const { name, value } = e.target;
    const updatedArray = [...user[fieldName]];
    updatedArray[index] = { ...updatedArray[index], [name]: value };

    setUser((prevUser) => ({
      ...prevUser,
      [fieldName]: updatedArray,
    }));
  };

  return (
    <>
      {/* Name Field */}
      <div className="col-span-1">
        <Input
          type="text"
          label="Name"
          name="name"
          value={user.name}
          onChange={handleInputChange}
          className="w-full bg-amber-100"
          required
        />
      </div>

      {/* Email Field */}
      <div className="col-span-1">
        <Input
          type="email"
          label="Email"
          name="email"
          value={user.email}
          onChange={handleInputChange}
          className="w-full bg-amber-100"
          required
        />
      </div>

      {/* Password Field */}
      <div className="col-span-1">
        <Input
          type="password"
          label="Password"
          name="password"
          value={user.password}
          onChange={handleInputChange}
          className="w-full bg-amber-100"
          required
        />
      </div>

      {/* Confirm Password Field */}
      <div className="col-span-1">
        <Input
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          value={user.confirmPassword}
          onChange={handleInputChange}
          className="w-full bg-amber-100"
          required
        />
      </div>

      {/* Image Upload Field */}
      <div className="col-span-1">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Profile Image
        </label>
        <div className="relative">
          <Input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="w-full bg-amber-100"
          />
          <PhotoIcon className="absolute top-2 right-2 w-6 h-6 text-gray-500" />
        </div>
      </div>

      {/* Address Field */}
      <div className="col-span-1">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Address
        </label>
        <div className="relative">
          <Input
            type="text"
            name="address"
            value={user.address}
            onChange={handleInputChange}
            className="w-full bg-amber-100"
          />
        </div>
      </div>

      {/* Bio Field */}
      <div className="col-span-1 md:col-span-2">
        <Textarea
          label="About Yourself"
          name="bio"
          value={user.bio}
          onChange={handleInputChange}
          className="w-full bg-amber-100"
        />
      </div>

      {/* Contacts Fields */}
      <div className="col-span-1">
        <Input
          label="GitHub"
          name="github"
          value={user.contacts.github}
          onChange={(e) => handleNestedInputChange(e, "contacts")}
        />
      </div>
      <div className="col-span-1">
        <Input
          label="LinkedIn"
          name="linkedin"
          value={user.contacts.linkedin}
          onChange={(e) => handleNestedInputChange(e, "contacts")}
        />
      </div>
      <div className="col-span-1">
        <Input
          label="Facebook"
          name="facebook"
          value={user.contacts.facebook}
          onChange={(e) => handleNestedInputChange(e, "contacts")}
        />
      </div>
      <div className="col-span-1">
        <Input
          label="Portfolio"
          name="portfolio"
          value={user.contacts.portfolio}
          onChange={(e) => handleNestedInputChange(e, "contacts")}
        />
      </div>
    </>
  );
}

export default Form1;
