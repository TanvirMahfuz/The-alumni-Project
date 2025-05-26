const InputField = ({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  required,
  ...rest
}) => (
  <div className="mb-5">
    <label
      htmlFor={id}
      className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full rounded-md border text-gray-800 dark:text-white border-gray-300 py-1 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 "
      required={required}
      {...rest}
    />
  </div>
);
export default InputField;
