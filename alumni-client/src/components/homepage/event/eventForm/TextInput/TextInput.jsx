import { useRef, useEffect } from "react";

function TextInput({ name, placeholder, value, onChange }) {
  const inputRef = useRef(null);

  // keep the ref value in sync with props if needed (optional)
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = value || "";
    }
  }, [value]);

  return (
    <div className="mt-2">
      <label htmlFor={name} className="font-bold">
        {name}
      </label>
      <input
        type="text"
        ref={inputRef}
        className="border-2 border-gray-300 rounded-lg p-2 w-full"
        id={name}
        placeholder={placeholder ?? "enter your text..."}
        name={name}
        defaultValue={value}
        onChange={onChange}
      />
    </div>
  );
}

export default TextInput;
