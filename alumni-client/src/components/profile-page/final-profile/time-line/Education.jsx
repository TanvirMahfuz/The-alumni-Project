import React from "react";

function Education({data}) {
  const isEducation = data.length > 0;
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
    });
  return (
    <div className="space-y-10 mb-10">
      <h3 className="text-2xl text-gray-800 font-semibold mb-8">EDUCATION</h3>
      {data.map((item, index) => (
        <div key={index} className="flex gap-6 relative">
          {/* Timeline line and dot */}
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 bg-teal-600 rounded-full z-5"></div>
            {index !== data.length - 1 && (
              <div className="w-px bg-teal-300 flex-1 mt-1" />
            )}
          </div>

          {/* Content area split into two columns */}
          <div className="grid grid-cols-12 gap-4 flex-1">
            <div className="col-span-3 text-gray-400 ">
              <p className="font-[500] ">
                {formatDate(item.startDate)} - {formatDate(item.endDate)}
              </p>
              {/* <p>{isEducation ? item.institution : ""}</p> */}
            </div>
            <div className="col-span-8">
              <p className="font-semibold text-teal-600 ">
                {isEducation ? item.degree : item.post}
              </p>
              <p className="text-gray-600">
                {isEducation ? item.institute : item.company}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Education;
