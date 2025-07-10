import React, { useState, useEffect, useRef } from "react";

const DatePicker = ({
  label = "Date",
  value,
  onChange,
  minDate,
  maxDate,
  required = false,
  error = "",
  className = "",
}) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  // Convert ISO string to YYYY-MM-DD
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date)) return "";
    return date.toISOString().split("T")[0];
  };

  // Handle changes from input
  const handleChange = (e) => {
    const selectedDate = e.target.value;
    if (selectedDate) {
      const isoDate = new Date(`${selectedDate}T00:00:00.000Z`).toISOString();
      onChange?.(isoDate);
    } else {
      onChange?.("");
    }
  };

  return (
    <div className={`mb-4 ${className}`}>
      <label
        htmlFor="date"
        className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
        {label}
      </label>
      <input
        ref={inputRef}
        id="date"
        name="date"
        type="date"
        value={formatDate(value)}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        min={minDate ? formatDate(minDate) : undefined}
        max={maxDate ? formatDate(maxDate) : undefined}
        required={required}
        className={`w-full px-3 py-2 rounded-md border bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
          error
            ? "border-red-500 ring-red-400"
            : focused
            ? "border-blue-500"
            : "border-gray-300 dark:border-gray-600"
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default DatePicker;
