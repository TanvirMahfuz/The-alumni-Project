import React from "react";

function VoiceText() {
  return (
    <div className="flex items-start gap-2.5">
      <img
        className="w-8 h-8 rounded-full"
        src="/docs/images/people/profile-picture-3.jpg"
        alt="Jese image"
      />
      <div className="flex flex-col gap-2.5 w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            Bonnie Green
          </span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            11:46
          </span>
        </div>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <button
            className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            type="button">
            <svg
              className="w-4 h-4 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 12 16">
              <path d="M3 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm7 0H9a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Z" />
            </svg>
          </button>
          <svg
            aria-hidden="true"
            className="w-[145px] md:w-[185px] md:h-[40px]"
            viewBox="0 0 185 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect
              y="17"
              width="3"
              height="6"
              rx="1.5"
              fill="#6B7280"
              className="dark:fill-white"
            />
            <rect
              x="7"
              y="15.5"
              width="3"
              height="9"
              rx="1.5"
              fill="#6B7280"
              className="dark:fill-white"
            />
            <rect
              x="21"
              y="6.5"
              width="3"
              height="27"
              rx="1.5"
              fill="#6B7280"
              className="dark:fill-white"
            />
            <rect
              x="14"
              y="6.5"
              width="3"
              height="27"
              rx="1.5"
              fill="#6B7280"
              className="dark:fill-white"
            />
            <rect
              x="28"
              y="3"
              width="3"
              height="34"
              rx="1.5"
              fill="#6B7280"
              className="dark:fill-white"
            />
            <rect
              x="35"
              y="3"
              width="3"
              height="34"
              rx="1.5"
              fill="#6B7280"
              className="dark:fill-white"
            />
            <rect
              x="42"
              y="5.5"
              width="3"
              height="29"
              rx="1.5"
              fill="#6B7280"
              className="dark:fill-white"
            />
            <rect
              x="49"
              y="10"
              width="3"
              height="20"
              rx="1.5"
              fill="#6B7280"
              className="dark:fill-white"
            />
            <rect
              x="56"
              y="13.5"
              width="3"
              height="13"
              rx="1.5"
              fill="#6B7280"
              className="dark:fill-white"
            />
            <rect
              x="63"
              y="16"
              width="3"
              height="8"
              rx="1.5"
              fill="#6B7280"
              className="dark:fill-white"
            />
            <rect x="66" y="16" width="8" height="8" rx="4" fill="#1C64F2" />
          </svg>
          <span className="inline-flex self-center items-center p-2 text-sm font-medium text-gray-900 dark:text-white">
            3:42
          </span>
        </div>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Delivered
        </span>
      </div>
      <button
        id="dropdownMenuIconButton"
        data-dropdown-toggle="dropdownDots"
        data-dropdown-placement="bottom-start"
        className="shrink-0 inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
        type="button">
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 4 15">
          <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
      </button>
      <div
        id="dropdownDots"
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-40 dark:bg-gray-700 dark:divide-gray-600">
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownMenuIconButton">
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Reply
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Forward
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Copy
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Report
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Delete
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default VoiceText;
