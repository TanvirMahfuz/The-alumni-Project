import React, { useState, useRef, useEffect } from "react";

const DatePicker = ({
  label = "Select Date",
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

  // Keep input in sync with parent value
  useEffect(() => {
    if (inputRef.current && value) {
      inputRef.current.value = new Date(value).toISOString().split("T")[0];
    }
  }, [value]);

  const handleChange = () => {
    const selectedDate = inputRef.current.value;
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
        className={`block text-sm font-medium mb-1 ${
          error ? "text-red-600" : "text-gray-700"
        }`}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <input
        ref={inputRef}
        type="date"
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        min={
          minDate ? new Date(minDate).toISOString().split("T")[0] : undefined
        }
        max={
          maxDate ? new Date(maxDate).toISOString().split("T")[0] : undefined
        }
        required={required}
        className={`w-full px-3 py-2 rounded-md border focus:outline-none sm:text-sm ${
          error
            ? "border-red-500 text-red-900"
            : focused
            ? "border-blue-500"
            : "border-gray-300"
        }`}
      />

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default DatePicker;
