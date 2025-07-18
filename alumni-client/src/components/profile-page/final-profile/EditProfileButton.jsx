import React from 'react'

const EditProfileButton = ({ onEditClick }) => {
  return (
    <button className="flex items-center space-x-1 text-teal-600 border-dashed border-2 border-teal-600 px-3 py-1 rounded-md bg-teal-50 dark:bg-gray-800 hover:bg-teal-500 hover:text-white cursor-pointer transition"
      onClick={onEditClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
        />
      </svg>

      <span className="text-[15px]">Edit Profile</span>
    </button>
  );
};

export default EditProfileButton