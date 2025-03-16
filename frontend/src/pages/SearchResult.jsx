import React from "react";
import { useLocation} from "react-router-dom";
import { useState, useEffect } from "react";
import { profilePlaceHolder } from "../assets/images";
import Layout from "../laytout/layout";
import axios from "axios";
import { Link } from "react-router-dom";
function SearchResult() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState({
    value: queryParams.get("value"),
    option: queryParams.get("option"),
  });

  useEffect(() => {
    const value = queryParams.get("value");
    const option = queryParams.get("option");
    if (value && option) {
      console.log("search parameters are updating to ",value, option);
      setSearch({ value, option });
    }
  }, [location.search]);

  useEffect(() => {
    console.log(
      "usetate changes detected. attempting to fetch data for ",
      search)

      console.log("fetching data for ",search);
      const fetchData = async () => {
        try {
          const res = await axios.get(
            `/api/api/v1/search/search?category=${search.option}&value=${search.value}`
          );
          console.log(res.data);
          setSearchResults(res.data.results);
        } catch (err) {
          console.log(err.message);
        }
      };

      fetchData();
    }, [search]);

  return (
    <Layout>
      <div className="mt-3 flex flex-col space-y-3 items-center justify-center">
        <div className="flex items-center w-full sm:max-w-100 md:max-w-150">
          <div className="bg-amber-300 h-1 flex-grow"></div>
          <h1 className="text-xl font-light mx-2">Currently Working</h1>
          <div className="bg-amber-300 h-1 flex-grow"></div>
        </div>
        {searchResults?.map((result, index) => (
          <div className="bg-white rounded-lg shadow-md p-4 w-full sm:max-w-sm md:max-w-md lg:min-w-150">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-x-0 sm:space-x-4">
              <img
                src={result.image ? result.image : profilePlaceHolder}
                alt="Profile"
                className="w-16 h-16 sm:w-18 sm:h-18 rounded-full"
              />

              {/* Job Details */}
              <div className="text-center sm:text-left">
                <h2 className="text-lg font-bold">
                  {result.name ? result.name : "Alice in wonderland"}
                  <span className="text-gray-400 text-xs">
                    {" "}
                    • {result.session ? result.session : "2019-2020"}
                  </span>
                </h2>
                <p className="text-gray-500 text-xs">
                  {result.currentPost.title
                    ? result.currentPost.title
                    : "Unemployed"}
                  <span className="block sm:inline">
                    {" "}
                    | since{" "}
                    {result.currentPost.startDate
                      ? result.currentPost.startDate
                      : "2020"}
                  </span>
                </p>

                {/* Company Name */}
                <div className="mt-1 text-sm text-gray-600 flex justify-center sm:justify-start items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                    />
                  </svg>
                  <p>
                    {result.currentPost.company
                      ? result.currentPost.company
                      : ""}
                  </p>
                </div>
              </div>
            </div>
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
              <Link
                className="h-8 bg-gradient-to-r from-[#4DA9BE] to-cyan-600 text-white px-2.5 rounded-3xl cursor-pointer flex items-center justify-center"
                to={`/profile?id=${result?._id ? result._id : ""}`}>
                View Profile
              </Link>
            </div>
          </div>
        ))}

      </div>

      <div className="flex flex-col mt-3 space-y-3 items-center justify-center">
        <div className="flex items-center w-full sm:max-w-100 md:max-w-150">
          <div className="bg-amber-300 h-1 flex-grow"></div>
          <h1 className="text-xl font-light mx-2">Previous Experiences</h1>
          <div className="bg-amber-300 h-1 flex-grow"></div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 w-full sm:max-w-sm md:max-w-md lg:min-w-150">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-x-0 sm:space-x-4">
            <img
              src={profilePlaceHolder}
              alt="Profile Picture"
              className="w-16 h-16 sm:w-18 sm:h-18 rounded-full"
            />
            <div className="text-center sm:text-left">
              <h2 className="text-lg font-bold">
                Alice in Wonderland
                <span className="text-gray-400 text-xs">• 2019-20</span>
              </h2>
              <p className="text-gray-500 text-xs">
                Junior Software Engineer
                <span className="block sm:inline">| since 2020</span>
              </p>
              <div className="mt-1 text-sm text-gray-600 flex justify-center sm:justify-start items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                  />
                </svg>
                <p>Dynamic Solutions and Innovations</p>
              </div>
            </div>
          </div>
          {/* Experiences Section */}
          <div className="mt-2 p-3 bg-gray-100 text-gray-600 text-sm flex justify-center lg:justify-start space-x-2 rounded-md">
            <p className="text-center sm:text-left">
              <span className="text-sky-600 italic bg-sky-100 font-semibold underline">
                Experience:
              </span>{" "}
              <span>Intern Developer</span> at{" "}
              <span className="font-semibold">SkyTech Bd</span> ||{" "}
              <span>2022-23</span>
            </p>
          </div>
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
            <button className="h-8 bg-gradient-to-r from-[#4DA9BE] to-cyan-600 text-white px-2.5 rounded-3xl cursor-pointer">
              View Profile
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SearchResult;
