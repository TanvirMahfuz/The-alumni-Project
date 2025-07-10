import React from "react";
import { format } from "date-fns";

function JobBadge({ item }) {
  const formatDate = (date) => {
    try {
      return format(new Date(date), "MMM yyyy");
    } catch {
      return "";
    }
  };

  return (
    <div className="w-full">
      <p className="text-md text-gray-500">Employee at</p>
      <div className="mx-1 px-2 border-l-4 border-green-400">
        <p className="text-lg text-gray-700 font-semibold">
          {item?.title || "Unemployed"}
        </p>
        <p className="text-md text-gray-700">{item?.company || ""}</p>
        <p className="text-sm text-gray-700">
          {formatDate(item?.startDate)} – {item?.endDate ? formatDate(item.endDate) : "Present"}
        </p>
      </div>
    </div>
  );
}

export default JobBadge;



