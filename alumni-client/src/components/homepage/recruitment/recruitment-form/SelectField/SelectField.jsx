const SelectField = ({
  label,
  id,
  name,
  value,
  onChange,
  options,
  required,
  ...rest
}) => (
  <div className="mb-5">
    <label
      htmlFor={id}
      className="block text-sm font-[600] text-gray-700 dark:text-gray-200 mb-1">
      {label}
    </label>
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
      required={required}
      {...rest}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);
export default SelectField;
