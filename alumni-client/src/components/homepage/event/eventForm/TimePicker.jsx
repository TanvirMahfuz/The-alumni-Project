import React, { useState } from "react";

function TimePicker({ label = "Time", value, onChange }) {
  const [focused, setFocused] = useState(false);

  const handleChange = (e) => {
    const selectedTime = e.target.value;
    onChange?.(selectedTime);
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="time"
        className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
        {label}
      </label>
      <input
        type="time"
        id="time"
        name="time"
        value={value || ""}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full px-3 py-2 rounded-md border bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
          focused ? "border-blue-500" : "border-gray-300 dark:border-gray-600"
        }`}
      />
    </div>
  );
}

export default TimePicker;
