import { useState, useEffect, useRef } from "react";

export default function DropDown({ value, onChange }) {
  const selectRef = useRef(null);

  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.focus();
    }
  }, []);

  return (
    <>
      <div className="font-bold mt-2">Category</div>
      <div className="w-1/2 cursor-pointer mt-1">
        <select
          ref={selectRef} // Attach the ref to the select element
          value={value}
          onChange={(e) => onChange(e.target.value)} // Handle selection change
          className="bg-white dark:bg-gray-500 rounded-lg py-2 px-1 text-gray-800">
          <option value="conference">Conference</option>
          <option value="workshop">Workshop</option>
          <option value="seminar">Seminar</option>
          <option value="training">Training</option>
          <option value="meeting">Meeting</option>
          <option value="webinar">Webinar</option>
          <option value="hackathon">Hackathon</option>
          <option value="contest">Contest</option>
        </select>
      </div>
    </>
  );
}
