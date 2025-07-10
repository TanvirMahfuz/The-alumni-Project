import React from "react";
import Group from "./group/Group.jsx";
import Header from "./Header";
import EventForm from "./eventForm/EventForm";
import Modal from "../../common/Modal.jsx";
import Applicants from "./applicants/Applicants.jsx";
import { useEventStore } from "../../../store/useEventStore.js";

function Events() {
  const { isLoading, openForm, setOpenForm, selectedEvent } = useEventStore();

  return (
    <div className="h-screen overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header openForm={openForm} setOpenForm={setOpenForm} />

      {openForm && (
        <Modal isOpen={openForm} onClose={() => setOpenForm(false)}>
          {isLoading ? (
            <div className="w-full h-full flex flex-col justify-center items-center space-y-4 bg-gray-100 dark:bg-gray-800 rounded-md mt-[8%]">
              {/* Spinner */}
              <svg
                className="animate-spin -ml-1 mr-3 h-10 w-10 text-cyan-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-label="Loading spinner"
                role="img">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>

              {/* Text */}
              <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 select-none">
                Creating Your Event...
              </p>
            </div>
          ) : (
            <EventForm openForm={openForm} setOpenForm={setOpenForm} />
          )}
        </Modal>
      )}

      {selectedEvent ? (
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8">
            <Group />
          </div>
          <div className="col-span-4">
            <Applicants />
          </div>
        </div>
      ) : (
        <Group />
      )}
    </div>
  );
}

export default Events;
