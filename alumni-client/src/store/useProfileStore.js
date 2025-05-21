import { create } from "zustand";

export const useProfileStore = create((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
  getProfile: async () => {
    const profile = await fetch("/api/user/profile")
      .then((res) => res.json())
      .then((data) => data.user)
      .catch((err) => console.log(err));
    set({ profile });
  },
}));
