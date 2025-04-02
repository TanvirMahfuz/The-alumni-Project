import { create } from "zustand";
import { useAuthStore } from "./useUserStore.js";


export const useUserUpdateStore = create((set, get) => ({
  formData: {},
  emptyUser:{
  name: "",
  session: "",
  email: "",
  password: "",
  image: "",
  bio: "",
  education: [
    {
      degree: "",
      institute: "",
      startDate: "",
      endDate: "",
    },
  ],
  contacts: {
    github: "",
    linkedin: "",
    facebook: "",
    portfolio: "",
  },
  isAdmin: false,
  currentPost: [
    {
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ],
  jobExperience: [
    {
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ],
  currentlyWorkingIn: [
    {
      title: "none",
      techStack: "",
      description: "",
    },
  ],
  haveWorkedIn: [
    {
      title: "none",
      techStack: "",
      description: "",
    },
  ],
  skills: [
    {
      title: "",
      image: "",
      level: "",
    },
  ],
  futureInterests: [],
  participatedIn: [
    {
      title: "",
      institute: "",
      startDate: "",
      endDate: "",
    },
  ],
  availableForWork: false,
  projects: [
    {
      projectName: "",
      projectDescription: "",
      projectLink: "",
    },
  ],
  resume: "",
  posts: [],
},

  printFormData: () => {
    console.log("Zustand connected");
  },

  initializeFormData: () => {
    set({ formData: emptyUser });
  },
  setFormData: (data) => {
    set({ formData: data });
  },

  handleChange: (e) => {
    const { name, value, type, checked } = e.target;
    set((state) => ({
      formData: {
        ...state.formData,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  },

  handleNestedChange: (section, key, value) => {
    set((state) => ({
      formData: {
        ...state.formData, 
        [section]: {

          ...(state.formData[section] || {}), 
          [key]: value,
        },
      },
    }));
  },

  handleArrayChange: (section, index, key, value) => {
    set((state) => {
      const updatedArray = [...(state.formData[section] || [])];
      if (updatedArray[index]) {
        updatedArray[index][key] = value;
      }
      return { formData: { ...state.formData, [section]: updatedArray } };
    });
  },

  addToArray: (section, defaultItem) => {
    set((state) => ({
      formData: {
        ...state.formData,
        [section]: [...(state.formData[section] || []), defaultItem],
      },
    }));
  },

  removeFromArray: (section, index) => {
    set((state) => ({
      formData: {
        ...state.formData,
        [section]: (state.formData[section] || []).filter(
          (_, i) => i !== index
        ),
      },
    }));
  },

  handleSubmit:async (e) => {
    e.preventDefault();
    console.log("Updated formData:", get().formData);
    const res = await useAuthStore.getState().updateProfile(get().formData);
    return res
  },
}));
