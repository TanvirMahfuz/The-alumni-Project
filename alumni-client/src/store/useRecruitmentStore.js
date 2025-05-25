import { create } from "zustand";

// Base API URLs depending on environment
const API_BASE_URL =
  import.meta.env.VITE_ENVIRONMENT === "development"
    ? import.meta.env.VITE_DEVELOPMENT_URL
    : import.meta.env.VITE_DEPLOYMENT_URL;

export const useRecruitmentStore = create((set, get) => ({
  formOpen: false,
  isLoading: false,
  recruitments: [],

  setFormOpen: (open) => {
    set({ formOpen: open });
    console.log(get().formOpen);
  },

  setIsLoading: (loading) => set({ isLoading: loading }),

  setJobs: (jobs) => set({ jobs }),

  setJob: (job) =>
    set((state) => ({ recruitments: [...state.recruitments, job] })),

  getRecruitments: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/recruitment`, {
        credentials: "include",
      });
      const data = await response.json();
      set({ recruitments: data.data });
    } catch (error) {
      console.error("Error fetching recruitments:", error);
    }
  },

  reviewResume: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/recruitment/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error reviewing resume:", error);
    }
  },

  createJobPost: async (jobData) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${API_BASE_URL}/recruitment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(jobData),
      });
      const data = await response.json();
      console.log(data.data);
      set({ recruitments: [...get().recruitments, data.data] });
      set({ formOpen: false }); // close form on success
    } catch (error) {
      console.error("Error creating job post:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
