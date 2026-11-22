const TextareaField = ({
  label,
  id,
  name,
  value,
  onChange,
  rows = 3,
  required,
  ...rest
}) => (
  <div className="mb-5">
    <label
      htmlFor={id}
      className="block text-bold font-medium text-gray-200 mb-1">
      {label}
    </label>
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm resize-none"
      required={required}
      {...rest}></textarea>
  </div>
);

export default TextareaField;
