import { create } from "zustand";
import { API_BASE_URL, readError } from "../config/api";


export const useRecruitmentStore = create((set, get) => ({
  formOpen: false,
  isLoading: false,
  recruitments: [],
  formError: null,
  reviewMessage: null,

  setFormOpen: (open) => set({ formOpen: open, formError: null }),

  setIsLoading: (loading) => set({ isLoading: loading }),

  setJobs: (jobs) => set({ jobs }),

  setJob: (job) =>
    set((state) => ({ recruitments: [...state.recruitments, job] })),

  getRecruitments: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/recruitment`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch jobs");
      const data = await response.json();
      set({ recruitments: Array.isArray(data.data) ? data.data : [] });
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
      const message = response.ok
        ? "Your resume was sent for review."
        : await readError(response, "Could not send your resume");
      alert(message);
    } catch (error) {
      console.error("Error reviewing resume:", error);
      alert("Could not reach the server");
    }
  },

  createJobPost: async (formData) => {
    set({ isLoading: true, formError: null });
    // Drop blank list entries and an empty expiry date before sending
    const clean = (list) => (list || []).map((v) => v.trim()).filter(Boolean);
    const { expiresAt, ...rest } = formData;
    const jobData = {
      ...rest,
      perks: clean(rest.perks),
      requirements: clean(rest.requirements),
      benefits: clean(rest.benefits),
      ...(expiresAt ? { expiresAt } : {}),
    };
    try {
      const response = await fetch(`${API_BASE_URL}/recruitment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(jobData),
      });
      if (!response.ok) {
        throw new Error(await readError(response, "Failed to create job post"));
      }
      const data = await response.json();
      set({
        recruitments: [...get().recruitments, data.data],
        formOpen: false, // close form on success
      });
    } catch (error) {
      set({ formError: error.message || "Failed to create job post" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
