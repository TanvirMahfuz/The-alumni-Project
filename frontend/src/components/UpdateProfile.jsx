import React, { useEffect,useState } from "react";
import { Button,Spinner } from "@material-tailwind/react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import { useAuthStore } from "../store/useUserStore.js";

import Introduction from "./updateProfile/Introduction.jsx";
import FileUploads from "./updateProfile/FileUploads.jsx";
import Contacts from "./updateProfile/Contacts.jsx";
import Education from "./updateProfile/Education.jsx";
import Job from "./updateProfile/Job.jsx";
import Experience from "./updateProfile/Experience.jsx";
import Skills from "./updateProfile/Skills.jsx";
import Projects from "./updateProfile/Projects.jsx";
import CurrentlyWorkingOn from "./updateProfile/CurrentlyWorkingOn.jsx";
import WorkedOn from "./updateProfile/WorkedOn.jsx";
import FutureInterests from "./updateProfile/FututureInterests.jsx";
import Participation from "./updateProfile/Participation.jsx";
let emptyUser = {
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
};
const UpdateProfile = ({pro_id}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(emptyUser);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { authUser } = useAuthStore();

  async function submitForm(e) {
    e.preventDefault()
    setIsSubmitting(true);
    console.log(formData);
    try {
      const res = await axios.put("/server/user/updateUser?id="+pro_id, formData);
      if(res){
        alert("Profile Updated Successfully");
        setIsSubmitting(false);
        window.location.reload();
      }
      
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);

    }
  }
  return (
    <div className="px-8 py-4">
      <form className="space-y-4" onSubmit={submitForm}>
        <Introduction {...{ formData, setFormData }} />
        <FileUploads {...{ formData, setFormData }} />
        <Contacts {...{ formData, setFormData }} />
        <Education {...{ formData, setFormData }} />
        <Job {...{ formData, setFormData }} />
        <Experience {...{ formData, setFormData }} />
        <Skills {...{ formData, setFormData }} />
        <CurrentlyWorkingOn {...{ formData, setFormData }} />
        <WorkedOn {...{ formData, setFormData }} />
        <FutureInterests {...{ formData, setFormData }} />
        <Projects {...{ formData, setFormData }} />
        <Participation {...{ formData, setFormData }} />

        <br />
        <Button
          type="submit"
          className="mt-6 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
          ripple={true}
          fullWidth={true}
          disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Spinner className="h-4 w-4" />
              Saving...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5">
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6 6 0 00-5.98 6.496A5.25 5.25 0 006.75 20.25H18a4.5 4.5 0 002.206-8.423 3.75 3.75 0 00-4.133-4.303A6.001 6.001 0 0010.5 3.75zm2.03 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v4.94a.75.75 0 001.5 0v-4.94l1.72 1.72a.75.75 0 101.06-1.06l-3-3z"
                  clipRule="evenodd"
                />
              </svg>
              Save Profile
            </span>
          )}
        </Button>
      </form>
    </div>
  );
};

export default UpdateProfile;
