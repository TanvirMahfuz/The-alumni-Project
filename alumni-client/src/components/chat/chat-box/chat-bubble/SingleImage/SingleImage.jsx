import React from "react";

function SingleImage() {
  return <div className="flex items-start gap-2.5">
  <img
    className="h-8 w-8 rounded-full"
    src="/docs/images/people/profile-picture-3.jpg"
    alt="Jese image"
  />
  <div className="flex flex-col gap-2.5">
    <div className="flex items-center space-x-2 rtl:space-x-reverse">
      <span className="text-sm font-semibold text-gray-900 dark:text-white">
        Bonnie Green
      </span>
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
        11:46
      </span>
    </div>
    <div className="leading-1.5 flex w-full max-w-[320px] flex-col">
      <p className="text-sm font-normal text-gray-900 dark:text-white">
        This is the new office 3
      </p>
      <div className="group relative mt-2">
        <div className="absolute w-full h-full bg-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
          <button
            data-tooltip-target="download-image"
            className="inline-flex items-center justify-center rounded-full h-10 w-10 bg-white/30 hover:bg-white/50 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50"
          >
            <svg
              className="w-5 h-5 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"
              />
            </svg>
          </button>
          <div
            id="download-image"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
          >
            Download image
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
        </div>
        <img
          src="/docs/images/blog/image-2.jpg"
          className="rounded-lg"
          alt="Blog preview"
        />
      </div>
    </div>
    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
      Delivered
    </span>
  </div>
</div>;
}

export default SingleImage;
