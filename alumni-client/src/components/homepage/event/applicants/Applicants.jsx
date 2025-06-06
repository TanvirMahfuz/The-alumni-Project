import React from "react";
import { useEventStore } from "../../../../store/useEventStore";
import Tag from "../../../common/Tag";
function Applicants() {
  const {selectedEvent} = useEventStore();
  return (
    <div className="w-full h-[calc(100vh-10rem)] flex flex-col gap-1 bg-white p-4 rounded-lg shadow-2xl overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-700 py-2 px-4">On Board</h1>
      {selectedEvent?.onBoard?.map((applicant) => (
        <>
          <Tag
            key={applicant.id}
            label={applicant.name}
            imageSrc={applicant.image}
            onClick={() => {}}
          />
          <hr className="text-gray-400" />
        </>
      ))}
    </div>
  );
}

export default Applicants;
