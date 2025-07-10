import React from "react";

const options = [
  "conference",
  "workshop",
  "seminar",
  "training",
  "meeting",
  "webinar",
  "hackathon",
  "contest",
];

export default function DropDown({ value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
        Category
      </label>

      <div className="max-h-48 overflow-y-scroll rounded-md border border-gray-300 dark:border-gray-600 p-2 space-y-2 bg-white dark:bg-gray-800">
        {options.map((option) => (
          <label
            key={option}
            className={`flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition ${
              value === option
                ? "bg-blue-100 dark:bg-blue-600 text-blue-800 dark:text-white font-semibold"
                : "text-gray-700 dark:text-gray-300"
            }`}>
            <input
              type="radio"
              name="category"
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              className="form-radio text-blue-600 focus:ring-blue-500"
            />
            <span className="capitalize">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
