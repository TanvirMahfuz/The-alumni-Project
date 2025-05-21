import React from "react";

function Link() {
  return (
    <div className="flex items-start gap-2.5">
      <img
        className="w-8 h-8 rounded-full"
        src="/docs/images/people/profile-picture-3.jpg"
        alt="Jese image"
      />
      <div className="flex flex-col w-full max-w-[320px] leading-1.5">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            Bonnie Green
          </span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            11:46
          </span>
        </div>
        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
          Check out this open-source UI component library based on Tailwind CSS:
        </p>
        <p className="text-sm font-normal pb-2.5 text-gray-900 dark:text-white">
          <a
            href="https://github.com/themesberg/flowbite"
            className="text-blue-700 dark:text-blue-500 underline hover:no-underline font-medium break-all">
            https://github.com/themesberg/flowbite
          </a>
        </p>
        <a
          href="#"
          className="bg-gray-50 dark:bg-gray-600 rounded-xl p-4 mb-2 hover:bg-gray-200 dark:hover:bg-gray-500">
          <img
            src="https://flowbite.com/docs/images/og-image.png"
            className="rounded-lg mb-2"
            alt="Flowbite preview"
          />
          <span className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            GitHub - themesberg/flowbite: The most popular and open source libra
            ...
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">
            github.com
          </span>
        </a>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Delivered
        </span>
      </div>
    </div>
  );
}

export default Link;
