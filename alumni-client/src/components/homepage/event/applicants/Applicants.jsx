import React from "react";
import { useEventStore } from "../../../../store/useEventStore";
import Tag from "../../../common/Tag";

function Applicants() {
  const { selectedEvent } = useEventStore();

  return (
    <div className="w-full h-[calc(100vh-10rem)] flex flex-col gap-3 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-2xl overflow-y-auto transition-colors duration-300">
      <h1 className="text-2xl font-semibold text-gray-700 dark:text-white py-2 px-4">
        On Board
      </h1>

      {selectedEvent?.onBoard?.length > 0 ? (
        selectedEvent.onBoard.map((applicant) => (
          <div key={applicant._id || applicant.id} className="px-4">
            <Tag
              label={applicant.name}
              imageSrc={applicant.image}
              onClick={() => {}}
            />
            <hr className="border-t border-gray-300 dark:border-white/20 my-2" />
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-300 mt-4">
          No applicants on board yet.
        </p>
      )}
    </div>
  );
}

export default Applicants;
