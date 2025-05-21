import React from "react";
import EventCard from "./EventCard";
import { useEventStore } from "../../../../store/useEventStore";
import { formatSmartDateTime } from "../../../../bin/DateTime";
function Group() {
  const { events, getEvents } = useEventStore();
  React.useEffect(() => {
    getEvents();
  }, [getEvents]);
  return (
    <div className="h-[calc(100vh-5rem)] flex gap-4 flex-wrap justify-around  my-4">
      {events &&
        events.map((event) => (
          <div
            className=""
            key={event._id}>
            <EventCard
              eventId={event._id}
              title={event.title ?? "Event Title"}
              date={event.date ? formatSmartDateTime(event.date) : "2023-09-23"}
              time={event.time ?? "12:00 PM"}
              location={event.location ?? "Event Location"}
              image={event.image ?? "https://via.placeholder.com/400x300"}
              description={event.description ?? "Event Description"}
              organizer={event.organizer ?? "Event Organizer"}
              category={event.category ?? "Event Category"}
              isFree={false}
              isFeatured={true}
            />
          </div>
        ))}
    </div>
  );
}

export default Group;
