import React from "react";
import Group from "./group/Group.jsx";
import Header from "./Header";
import EventForm from "./eventForm/EventForm";
import Modal from "../../common/Modal.jsx"
import Applicants from "./applicants/Applicants.jsx";
import { useEventStore } from "../../../store/useEventStore.js";
function Events() {
  const { isLoading,openForm, setOpenForm,selectedEvent } = useEventStore()
  return (
    <div className="h-screen overflow-y-auto">
      <Header {...{ openForm, setOpenForm }} />
      {openForm && (
        <Modal isOpen={openForm} onClose={() => setOpenForm(false)}>
          {isLoading ? (
            <div className="h-full w-full flex justify-center items-center text-lg font-bold">
              Creating Your Event...
            </div>
          ) : (
            <EventForm {...{ openForm, setOpenForm }} />
          )}
        </Modal>
      )}

      {selectedEvent ? (
        <div className="grid grid-cols-12">
          <div className="col-span-8">
            <Group />
          </div>
          <div className="col-span-4">
            <Applicants />
          </div>
        </div>
      ):(<Group/>)}
      
    </div>
  );
  
}

export default Events;
