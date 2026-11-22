const JobHeader = ({ position, onClose }) => {
  return (
    <div className="flex items-start justify-between">
      <h2 className="text-lg font-medium text-gray-900">{position}</h2>
      <button
        type="button"
        className="text-gray-400 hover:text-gray-500"
        onClick={onClose}>
        <span className="sr-only">Close panel</span>
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default JobHeader;
