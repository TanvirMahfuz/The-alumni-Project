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
  submissionError: null, // general error state for form submission
  fetchError: null, // error state for fetch operations

  toggleSelectedEvent: (eventId) => {
    if (get().selectedEvent && get().selectedEvent._id === eventId) {
      set({ selectedEvent: null });
    } else {
      get().setSelectedEvent(eventId);
    }
  },

  setSelectedEvent: async (eventId) => {
    set({ fetchError: null });
    try {
      const event = get().events.find((event) => event._id === eventId);
      if (event) {
        const onBoard = await get().getOnBoardUsers(event._id);
        set({ selectedEvent: { ...event, onBoard } });
      } else {
        throw new Error("Event not found");
      }
    } catch (error) {
      set({ fetchError: error.message || "Failed to set selected event" });
      console.error("setSelectedEvent error:", error);
    }
  },

  setOpenForm: (openForm) => set({ openForm }),

  setEvents: (events) => set({ events }),

  addEvent: (event) =>
    set((state) => ({
      events: [...state.events, event],
    })),

  getEvents: async () => {
    set({ fetchError: null });
    try {
      const response = await fetch(`${API_BASE_URL}/event/allEvent`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch events");
      const data = await response.json();
      set({ events: data.data });
    } catch (error) {
      set({ fetchError: error.message || "Error fetching events" });
      console.error("getEvents error:", error);
    }
  },

  getEvent: async (eventId) => {
    set({ fetchError: null });
    try {
      const response = await fetch(`${API_BASE_URL}/event/${eventId}`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch event");
      const data = await response.json();
      return data.event;
    } catch (error) {
      set({ fetchError: error.message || "Error fetching event" });
      console.error("getEvent error:", error);
      return null;
    }
  },

  setOrganizer: (organizer) => set({ eventOrganizer: organizer }),

  getOrganizer: async (organizerId) => {
    set({ fetchError: null });
    try {
      const response = await fetch(`${API_BASE_URL}/user/info/${organizerId}`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch organizer");
      const data = await response.json();
      set({ eventOrganizer: data.user });
    } catch (error) {
      set({ fetchError: error.message || "Error fetching organizer" });
      console.error("getOrganizer error:", error);
      return null;
    }
  },

  saveEvent: async (event) => {
    set({ isLoading: true, submissionError: null });
    try {
      const response = await fetch(`${API_BASE_URL}/event/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save event");
      }

      const data = await response.json();
      set((state) => ({
        events: [...state.events, data.data],
        openForm: false,
      }));
      get().getEvents();
    } catch (error) {
      set({ submissionError: error.message || "Error saving event" });
      console.error("saveEvent error:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  setOnBoard: async (eventId) => {
    set({ fetchError: null });
    set({ isLoading: true });
    try {
      const data = {
        eventId,
        applicantId: useUserStore.getState().authUser._id,
      };
      const response = await fetch(`${API_BASE_URL}/event/onBoard`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to set onBoard");
      const res = await response.json();
      console.log(res);
      set({ isLoading: false })
      alert("You have been added to the onBoard list");
      return
    } catch (error) {
      set({ fetchError: error.message || "Error saving event onBoard" });
      set({ isLoading: false });
      console.error("setOnBoard error:", error);
      alert(error.message);
      return;
    }
  },

  getOnBoardUsers: async (eventId) => {
    set({ fetchError: null });
    try {
      const response = await fetch(
        `${API_BASE_URL}/event/onBoardUsers/${eventId}`,
        {
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error("Failed to fetch applicants");
      const data = await response.json();
      return data.data;
    } catch (error) {
      set({ fetchError: error.message || "Error fetching applicants" });
      console.error("getOnBoardUsers error:", error);
      return [];
    }
  },
}));
