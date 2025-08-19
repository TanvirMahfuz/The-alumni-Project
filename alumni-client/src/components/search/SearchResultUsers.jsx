import React from "react";
import { Link } from "react-router-dom";
import { profileIcon as profilePlaceHolder } from "../../assets/icons.jsx";
import {formatDate} from "date-fns"
function SearchResultUsers({ searchResults }) {
  console.log(searchResults)
  if(!searchResults){
    return(
      <div>
      We are sorry. There was no result found!
      </div>
    )
  }

  return (
    <div className="mt-3 flex flex-col space-y-3 items-center justify-center">
      <div className="flex items-center w-full sm:max-w-100 md:max-w-150">
        <div className="bg-amber-300 h-1 flex-grow"></div>
        <h1 className="text-xl text-black font-light mx-2">User Results</h1>
        <div className="bg-amber-300 h-1 flex-grow"></div>
      </div>

      {searchResults?.map((result, index) => (
        <div
          key={result._id || index}
          className="bg-white rounded-lg shadow-md p-4 w-full sm:max-w-sm md:max-w-md lg:min-w-150">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-x-0 sm:space-x-4">
            <img
              src={result?.image || profilePlaceHolder}
              alt={
                result?.name
                  ? `${result?.name} profile picture`
                  : "Profile placeholder"
              }
              className="w-16 h-16 sm:w-18 sm:h-18 rounded-full object-cover"
            />

            <div className="text-center sm:text-left">
              <Link
                className="w-full flex justify-center items-center gap-1 "
                to={`/profile/${result?._id || ""}`}>
                <span className="text-lg text-black font-semibold">
                  {result?.name || "Alice in Wonderland"}
                </span>{" "}
                <span className="text-gray-400 text-xs font-medium">
                  • {result?.session || "2019-2020"}
                </span>
              </Link>

              <p className="text-gray-500 text-xs">
                {result?.currentPost?.[0]?.title || "Unemployed"}
                <span className="block sm:inline">
                  {" "}
                  | since{" "}
                  {result?.currentPost?.[0]?.startDate ? format(new Date(result.currentPost[0].startDate), "MMM yyyy"): "N/A"}

                </span>
              </p>

              <div className="mt-1 text-sm text-gray-600 flex justify-center sm:justify-start items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                  />
                </svg>
                <p>{result?.currentPost?.[0]?.company || ""}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-1 flex justify-center sm:justify-end space-x-3">
            <button className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#000"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#fff"
                className="size-9">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                />
              </svg>
            </button>
            <Link to={`/profile/${result?._id}`} className="h-8 bg-gradient-to-r from-sky-400 to-cyan-600 text-white px-2.5 rounded-3xl cursor-pointer flex justify-center items-center">
              View Profile
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchResultUsers;
