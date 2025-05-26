import React from "react";

const FacultyCard = ({
  name,
  position,
  department,
  image,
  email,
  phone,
  researchInterests,
  officeLocation,
  isActive,
}) => {
  console.log(phone);
  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Faculty Image */}
      <div className="relative h-48 bg-gray-100">
        <img
          className="w-full h-full object-contain bg:white overflow-y-auto "
          src={image || "https://via.placeholder.com/400x300"}
          alt={`Portrait of ${name}`}
        />
        {isActive && (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            Active
          </span>
        )}
      </div>

      {/* Faculty Info */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800">{name}</h3>
          <p className="text-gray-600">{position}</p>
          <p className="text-sm text-blue-600">{department}</p>
        </div>

        {/* Contact Info */}
        <div className="mb-4">
          <div className="flex items-center text-sm text-gray-600 mb-1">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            {email}
          </div>
          {phone &&
            phone.map((number, index) => (
              <div
                key={index}
                className="flex items-center text-sm text-gray-600">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {number}
              </div>
            ))}
        </div>

        {/* Research Interests */}
        {researchInterests && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-1">
              Research Interests
            </h4>
            <div className="flex flex-wrap gap-1">
              {researchInterests.map((interest, index) => (
                <span
                  key={index}
                  className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Office Location */}
        {officeLocation && (
          <div className="flex items-center text-sm text-gray-600">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Office: {officeLocation}
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyCard;
