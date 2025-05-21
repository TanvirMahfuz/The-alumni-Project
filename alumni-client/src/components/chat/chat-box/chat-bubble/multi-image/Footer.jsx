const Footer = () => (
  <div className="flex justify-between items-center">
    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
      Delivered
    </span>
    <button className="text-sm text-blue-700 dark:text-blue-500 font-medium inline-flex items-center hover:underline">
      <svg
        className="w-3 h-3 me-1.5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 16 18">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"
        />
      </svg>
      Save all
    </button>
  </div>
);

export default Footer;
