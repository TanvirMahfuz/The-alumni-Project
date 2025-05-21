const ArrayInputField = ({
  label,
  field,
  values,
  onChange,
  onAdd,
  onRemove,
}) => (
  <div className="mb-5">
    <label className="block text-sm font-bold text-gray-200 mb-1">
      {label}
    </label>
    {values.map((value, index) => (
      <div key={index} className="mt-1 flex rounded-md shadow-sm">
        <input
          type="text"
          className="flex-1 block w-full min-w-0 rounded-none rounded-l-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
          value={value}
          onChange={(e) => onChange(e, index, field)}
        />
        {values.length > 1 && (
          <button
            type="button"
            onClick={() => onRemove(index, field)}
            className="relative inline-flex items-center space-x-2 px-3 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-teal-500 focus:border-teal-500">
            <span>-</span>
          </button>
        )}
      </div>
    ))}
    <div className="mt-2">
      <button
        type="button"
        onClick={() => onAdd(field)}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
        Add {label.toLowerCase()}
      </button>
    </div>
  </div>
);

export default ArrayInputField;