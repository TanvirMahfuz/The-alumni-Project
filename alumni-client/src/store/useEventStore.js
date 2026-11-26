import { create } from "zustand";
import { API_BASE_URL, readError } from "../config/api";
import { useUserStore } from "./useUserStore";


export const useEventStore = create((set, get) => ({
  events: [],
  selectedEvent: null,
  eventOrganizer: null,
  openForm: false,
  isLoading: false,
  onBoardingId: null, // event currently being joined (per-card spinner)
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
      set({ events: Array.isArray(data.data) ? data.data : [] });
    } catch (error) {
      set({ fetchError: error.message || "Error fetching events" });
      console.error("getEvents error:", error);
    }
  },

  getEvent: async (eventId) => {
    set({ fetchError: null });
    try {
      const response = await fetch(`${API_BASE_URL}/event/getOne/${eventId}`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch event");
      const data = await response.json();
      return data.data;
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
        throw new Error(await readError(response, "Failed to save event"));
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
    if (!useUserStore.getState().authUser) {
      alert("Please log in to join this event");
      return;
    }
    set({ fetchError: null, onBoardingId: eventId });
    try {
      const data = { eventId };
      const response = await fetch(`${API_BASE_URL}/event/onBoard`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(await readError(response, "Failed to join event"));
      }
      // Refresh the open applicants panel if it shows this event
      if (get().selectedEvent?._id === eventId) {
        const onBoard = await get().getOnBoardUsers(eventId);
        set({ selectedEvent: { ...get().selectedEvent, onBoard } });
      }
      alert("You have been added to the onBoard list");
    } catch (error) {
      set({ fetchError: error.message || "Error saving event onBoard" });
      alert(error.message);
    } finally {
      set({ onBoardingId: null });
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
