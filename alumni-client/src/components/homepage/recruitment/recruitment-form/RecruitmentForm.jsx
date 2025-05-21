import React, { useState } from "react";
import InputField from "./InputField.jsx";
import SelectField from "./SelectField.jsx";
import TextareaField from "./TextareaField.jsx";
import CheckboxField from "./CheckboxField.jsx";
import ArrayInputField from "./ArrayInputField.jsx";
import { useRecruitmentStore } from "../../../../store/useRecruitmentStore.js";
const RecruitmentForm = () => {
  const { createJobPost} = useRecruitmentStore();
  const [formData, setFormData] = useState({
    applyLink: "",
    position: "",
    company: "",
    location: "",
    salary: "",
    type: "Full-time",
    isUrgent: false,
    perks: [""],
    logo: "",
    description: "",
    requirements: [""],
    benefits: [""],
    applicationProcess: "",
    expiresAt: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleArrayChange = (e, index, field) => {
    const { value } = e.target;
    setFormData((prevData) => {
      const newArray = [...prevData[field]];
      newArray[index] = value;
      return { ...prevData, [field]: newArray };
    });
  };

  const handleAddToArray = (field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: [...prevData[field], ""],
    }));
  };

  const handleRemoveFromArray = (index, field) => {
    const newArray = [...formData[field]];
    newArray.splice(index, 1);
    setFormData((prevData) => ({ ...prevData, [field]: newArray }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    await createJobPost(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-full max-h-150 mx-auto  text-white p-8 rounded-lg shadow-xl">
      <h2 className="text-xl font-semibold text-white mb-7">
        Create New Recruitment
      </h2>

      <InputField
        label="Apply Link"
        id="applyLink"
        name="applyLink"
        type="url"
        value={formData.applyLink}
        onChange={handleChange}
        required
      />

      <InputField
        label="Position"
        id="position"
        name="position"
        value={formData.position}
        onChange={handleChange}
        required
      />

      <InputField
        label="Company"
        id="company"
        name="company"
        value={formData.company}
        onChange={handleChange}
        required
      />

      <InputField
        label="Location"
        id="location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        required
      />

      <InputField
        label="Salary"
        id="salary"
        name="salary"
        value={formData.salary}
        onChange={handleChange}
        required
      />

      <SelectField
        label="Type"
        id="type"
        name="type"
        value={formData.type}
        onChange={handleChange}
        options={[
          { value: "Full-time", label: "Full-time" },
          { value: "Part-time", label: "Part-time" },
          { value: "Contract", label: "Contract" },
          { value: "Internship", label: "Internship" },
          { value: "Temporary", label: "Temporary" },
        ]}
        required
      />

      <CheckboxField
        label="Is Urgent"
        name="isUrgent"
        checked={formData.isUrgent}
        onChange={handleChange}
      />

      <ArrayInputField
        label="Perks"
        field="perks"
        values={formData.perks}
        onChange={handleArrayChange}
        onAdd={handleAddToArray}
        onRemove={handleRemoveFromArray}
      />

      <InputField
        label="Logo URL (Optional)"
        id="logo"
        name="logo"
        type="url"
        value={formData.logo}
        onChange={handleChange}
      />

      <TextareaField
        label="Description"
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        rows={6}
        required
      />

      <ArrayInputField
        label="Requirements"
        field="requirements"
        values={formData.requirements}
        onChange={handleArrayChange}
        onAdd={handleAddToArray}
        onRemove={handleRemoveFromArray}
      />

      <ArrayInputField
        label="Benefits"
        field="benefits"
        values={formData.benefits}
        onChange={handleArrayChange}
        onAdd={handleAddToArray}
        onRemove={handleRemoveFromArray}
      />

      <TextareaField
        label="Application Process"
        id="applicationProcess"
        name="applicationProcess"
        value={formData.applicationProcess}
        onChange={handleChange}
        rows={4}
        required
      />

      <InputField
        label="Expiration Date"
        id="expiresAt"
        name="expiresAt"
        type="date"
        value={formData.expiresAt}
        onChange={handleChange}
      />
      <p className="text-gray-500 text-sm italic mt-1">
        Defaults to 30 days from now if not specified.
      </p>

      <div className="mt-8">
        <button
          type="submit"
          className="inline-flex items-center px-5 py-3 border border-transparent text-sm font-medium rounded-md shadow-lg text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors">
          Create Recruitment
        </button>
      </div>
    </form>
  );
};

export default RecruitmentForm;
