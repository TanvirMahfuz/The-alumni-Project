import { create } from "zustand";

import { useUserStore } from "./useUserStore";

export const useEventStore = create((set, get) => ({
  events: [],

  selectedEvent: null,

  eventOrganizer: null,

  openForm: false,

  isLoading: false,

  submissionError: null,

  toggleSelectedEvent: (eventId) => {
    console.log("toggling event");

    if (get().selectedEvent && get().selectedEvent._id === eventId) {
      set({ selectedEvent: null });
    } else {
      get().setSelectedEvent(eventId);
    }
  },

  setSelectedEvent:async  (eventId) => {
    console.log("setting event");
    const event = get().events.find((event) => event._id === eventId);
    if (event) {
      const onBoard = await get().getOnBoardUsers(event._id);
      console.log("event", { ...event, onBoard });
      set({ selectedEvent: { ...event, onBoard } });
    } else {
      console.error("Event not found");
    }
  },

  setOpenForm: (openForm) => set({ openForm }),

  setEvents: (events) => set({ events }),

  // Add a new event to the state
  addEvent: (event) =>
    set((state) => ({
      events: [...state.events, event],
    })),

  // Fetch all events from the backend
  getEvents: async () => {
    try {
      const response = await fetch("api/event/allEvent");

      const data = await response.json();

      set({ events: data.data });
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  },

  // Fetch a single event by ID
  getEvent: async (eventId) => {
    try {
      const response = await fetch(`/api/event/${eventId}`);

      const data = await response.json();

      return data.event;
    } catch (error) {
      console.error("Error fetching event:", error);

      return null;
    }
  },

  // Set the event organizer
  setOrganizer: (organizer) => set({ eventOrganizer: organizer }),
  // Fetch event organizer's information by ID

  getOrganizer: async (organizerId) => {
    try {
      const response = await fetch(`/api/user/info/${organizerId}`);
      const data = await response.json();

      set({ eventOrganizer: data.user });
    } catch (error) {
      console.error("Error fetching organizer:", error);
      return null;
    }
  },

  // Save a new event and update the state
  saveEvent: async (event) => {
    set({ isLoading: true });
    try {
      const response = await fetch("/api/event/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });

      const data = await response.json();
      if (data) {
        console.log("Event saved:", data);
        set((state) => ({
          events: [...state.events, data.data],
        }));
        set({ openForm: false });
        set({ isLoading: false });
        get().getEvents();
      }
    } catch (error) {
      set({ isLoading: false });
      set({ submissionError: error });
      console.error("Error saving event:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  setOnBoard: async (eventId) => {
    try {
      const data = {
        eventId,
        applicantId: useUserStore.getState().authUser._id,
      };
      const response = await fetch("/api/event/onBoard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await response.json();
      console.log(res);
    } catch (error) {
      console.error("Error saving event:", error);
    }
  },

  getOnBoardUsers: async (eventId) => {
    try {
      const response = await fetch(`/api/event/onBoardUsers/${eventId}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching applicants:", error);
      return [];
    }
  },
}));
