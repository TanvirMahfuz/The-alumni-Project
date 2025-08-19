import React from "react";
import EventCard from "./EventCard";
import { useEventStore } from "../../../../store/useEventStore";
import { formatSmartDateTime } from "../../../../bin/DateTime";

function Group() {
  const { events, getEvents } = useEventStore();

  React.useEffect(() => {
    getEvents();
  }, [getEvents]);

  if (!events || events.length === 0) {
    return (
      <div className="h-[calc(100vh-5rem)] flex flex-col justify-center items-center text-center p-6 text-gray-600 dark:text-gray-200">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
          alt="No events"
          className="w-32 h-32 mb-4 opacity-80"
        />
        <h2 className="text-2xl font-semibold mb-2">No Events Yet</h2>
        <p className="max-w-md">
          Looks like there are no events currently available. Please check back
          later or create a new event.
        </p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-5rem)] mt-8 flex gap-4 flex-wrap justify-around my-4">
      {console.log(events)}
      {events && events.map((event) => (
        <div key={event?._id}>
          <EventCard
            eventId={event?._id}
            title={event?.title ?? "Event Title"}
            date={event?.date ? formatSmartDateTime(event.date) : "2023-09-23"}
            time={event?.time ?? "12:00 PM"}
            location={event?.location ?? "Event Location"}
            image={event?.image ?? "https://via.placeholder.com/400x300"}
            description={event?.description ?? "Event Description"}
            organizer={event?.organizer ?? "Event Organizer"}
            category={event?.category ?? "Event Category"}
            isFree={false}
            isFeatured={true}
          />
        </div>
      ))}
    </div>
  );
}

export default Group;
