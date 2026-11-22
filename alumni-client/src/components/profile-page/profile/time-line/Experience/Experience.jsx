import React from "react";

function Experience({ data }) {
  const hasExperience = data?.length > 0;

  const formatDate = (dateString) =>
    dateString
      ? new Date(dateString).toLocaleDateString("en-US", {
          year: "numeric",
        })
      : "Present";

  return (
    <div className="space-y-10 mb-10">
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
        EXPERIENCE
      </h3>

      {hasExperience &&
        data.map((item, index) => (
          <div key={index} className="flex gap-6 relative">
            {/* Timeline */}
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 bg-teal-600 rounded-full z-10" />
              {index !== data.length - 1 && (
                <div className="w-px bg-teal-300 dark:bg-teal-700 flex-1 mt-1" />
              )}
            </div>

            {/* Content */}
            <div className="grid grid-cols-12 gap-4 flex-1">
              <div className="col-span-3 text-gray-500 dark:text-gray-400">
                <p className="font-medium">
                  {formatDate(item.startDate)} – {formatDate(item.endDate)}
                </p>
              </div>
              <div className="col-span-8">
                <p className="font-semibold text-teal-600 dark:text-teal-400">
                  {item.title}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  {item.company}
                </p>
                {item.description?.trim() && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Experience;
