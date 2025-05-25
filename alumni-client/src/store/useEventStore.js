import { create } from "zustand";
import { useUserStore } from "./useUserStore";

const API_BASE_URL =
  import.meta.env.VITE_ENVIRONMENT === "development"
    ? import.meta.env.VITE_DEVELOPMENT_URL
    : import.meta.env.VITE_DEPLOYMENT_URL;

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

  setSelectedEvent: async (eventId) => {
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

  addEvent: (event) =>
    set((state) => ({
      events: [...state.events, event],
    })),

  getEvents: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/event/allEvent`, {
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      set({ events: data.data });
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  },

  getEvent: async (eventId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/event/${eventId}`, {
        credentials: "include",
      });
      const data = await response.json();
      return data.event;
    } catch (error) {
      console.error("Error fetching event:", error);
      return null;
    }
  },

  setOrganizer: (organizer) => set({ eventOrganizer: organizer }),

  getOrganizer: async (organizerId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/user/info/${organizerId}`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      set({ eventOrganizer: data.user });
    } catch (error) {
      console.error("Error fetching organizer:", error);
      return null;
    }
  },

  saveEvent: async (event) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${API_BASE_URL}/event/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(event),
      });

      const data = await response.json();
      if (data) {
        console.log("Event saved:", data);
        set((state) => ({
          events: [...state.events, data.data],
        }));
        set({ openForm: false });
        get().getEvents();
      }
    } catch (error) {
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
      const response = await fetch(`${API_BASE_URL}/event/onBoard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const res = await response.json();
      console.log(res);
    } catch (error) {
      console.error("Error saving event onBoard:", error);
    }
  },

  getOnBoardUsers: async (eventId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/event/onBoardUsers/${eventId}`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching applicants:", error);
      return [];
    }
  },
}));
