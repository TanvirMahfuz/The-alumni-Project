import React from "react";
import { useEventStore } from "../../../../store/useEventStore";
const EventCard = ({
  eventId,
  title,
  date,
  time,
  location,
  image,
  description,
  organizer,
  category,
  isFree,
  isFeatured,
}) => {
  const { eventOrganizer, getOrganizer, setOnBoard, toggleSelectedEvent } =
    useEventStore();
  React.useEffect(() => {
    getOrganizer(organizer);
  }, [getOrganizer, organizer]);
  return (
    <div className="w-full min-w-100 max-w-sm bg-stone-50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Event Image with Badges */}
      <div className="relative h-48 bg-white ">
        <img
          className="w-full h-full object-cover opacity-30"
          src="/no-img-event.png"
          alt={`${title} event`}
        />
        {console.log(image)}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-2">
          {isFeatured && (
            <span className="bg-yellow-500  text-xs px-2 py-1 rounded-full font-semibold">
              Featured
            </span>
          )}
          {isFree && (
            <span className="bg-green-500  text-xs px-2 py-1 rounded-full font-semibold">
              Free
            </span>
          )}
          {category && (
            <span className="bg-blue-500  text-xs px-2 py-1 rounded-full font-semibold">
              {category}
            </span>
          )}
        </div>

        {/* on board */}
        <div
          className="absolute top-2 right-2 px-2 text-sm font-bold rounded-full  bg-gray-300 hover:bg-gray-800 cursor-pointer "
          onClick={() => {
            toggleSelectedEvent(eventId);
          }}>
          i
        </div>
      </div>

      {/* Event Content */}
      <div className="p-5">
        {/* Date & Time */}
        <div className="flex items-center text-sm text-gray-400 mb-2">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {date} • {time}
        </div>

        {/* Title & Description */}
        <h3 className="text-gray-700  font-semibold text-xl mb-2">
          {title}
        </h3>
        {description && (
          <p className="text-gray-400 font-[300]  text-sm mb-4 line-clamp-2">
            {description}
          </p>
        )}

        {/* Location & Organizer */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500 ">
            <svg
              className="w-4 h-4 mr-1"
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
            {location}
          </div>
          {organizer && (
            <div className="flex items-center text-sm text-gray-500 ">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Organized by {eventOrganizer?.name}
            </div>
          )}
        </div>

        {/* Action Button */}
        <button
          className="w-full mt-2 my-1.5 bg-purple-600 hover:bg-purple-700  font-medium py-1.5 px-3.5 rounded-lg"
          onClick={() => setOnBoard(eventId)}>
          on board
        </button>
      </div>
    </div>
  );
};

export default EventCard;
