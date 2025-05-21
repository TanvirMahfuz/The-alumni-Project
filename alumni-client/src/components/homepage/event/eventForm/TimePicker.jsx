import React from "react";

function TimePicker({ value, onChange }) {
  const handleChange = (e) => {

    const selectedTime = e.target.value;
    console.log("value",value)
    console.log("Selected Time:", selectedTime);

    onChange?.(selectedTime);
  };

  return (
    <div className="mt-2">
      <label htmlFor="time" className="font-bold">
        Time
      </label>
      <input
        type="time"
        className="border-2 border-gray-300 rounded-lg p-2 w-full"
        name="time"
        id="time"
        value={value}
        onChange={handleChange} // Handle time change
      />
    </div>
  );
}

export default TimePicker;
