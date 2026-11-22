import { useRef } from "react";

function TextArea({
  name,
  placeholder,
  value,
  onChange,
  rows = 4,
  required = false,
  error,
  className = "",
  ...props
}) {
  const textareaRef = useRef(null); // Create a ref for the textarea

  // You can access the textarea DOM element using textareaRef.current
  // For example, to focus on the textarea:
  const focusTextArea = () => {
    textareaRef.current.focus();
  };

  return (
    <div className={`mt-2 ${className}`}>
      <label htmlFor={name} className="block font-bold mb-2">
        {name}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Enter description"}
        rows={rows}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        required={required}
        ref={textareaRef} // Attach the ref to the textarea
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default TextArea;
