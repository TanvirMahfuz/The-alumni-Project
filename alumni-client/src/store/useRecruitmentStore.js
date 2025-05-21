import { create } from "zustand";

export const useRecruitmentStore = create((set, get) => ({
  formOpen: false,
  setFormOpen: (open) => {
    set({ formOpen: open });
    console.log(get().formOpen);
  },
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
  recruitments: [],

  setJobs: (jobs) => set({ jobs }),
  setJob: (job) =>
    set((state) => ({ recruitments: [...state.recruitments, job] })),

  getRecruitments: async () => {
    try {
      const response = await fetch("/api/recruitment");
      const data = await response.json();
      set({ recruitments: data.data });
    } catch (error) {
      console.error("Error fetching recruitments:", error);
    }
  },

  reviewResume: async (id) => {
    try {
      console.log(id);
      const response = await fetch(`/api/recruitment/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
      const response = await fetch("/api/recruitment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });
      const data = await response.json();
      console.log(data.data);
      set({ recruitments: [...get().recruitments, data.data] }); // Use get() to access the current state
      set({ formOpen: false }); // Close the form on successful creation
    } catch (error) {
      console.error("Error creating job post:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
