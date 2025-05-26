const CheckboxField = ({ label, name, checked, onChange }) => (
  <div className="mb-5 flex items-start">
    <div className="flex items-center h-5">
      <input
        id={name}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="focus:ring-teal-500 h-4 w-4 text-teal-600 border border-teal-300 rounded"
      />
    </div>
    <div className="ml-3 text-sm">
      <label
        htmlFor={name}
        className="font-[600] text-gray-700 dark:text-gray-200">
        {label}
      </label>
    </div>
  </div>
);
export default CheckboxField;
