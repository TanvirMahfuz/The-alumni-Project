import React, { useEffect } from "react";
import { Button } from "@material-tailwind/react";

import { useAuthStore } from "../store/useUserStore.js";
import { useUserUpdateStore } from "../store/useUserUpdateStore.js";

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

const UpdateProfile = () => {
  const {
    initializeFormData,
    formData,
    handleSubmit,
  } = useUserUpdateStore();
  async function submitForm(e) {
    const res = await handleSubmit(e);
    if(res){
      alert("Profile Updated Successfully")
      window.location.reload();
    }
  }
  useEffect(() => {
    initializeFormData();
  }, [initializeFormData]);

  return (
    <div className="px-8 py-4">
      <form className="space-y-4" onSubmit={submitForm}>
        <Introduction />
        <FileUploads />
        <Contacts />
        <Education />
        <Job />
        {formData.jobExperience ? <Experience /> : null}
        <Skills />
        <Projects />
        {formData.currentlyWorkingOn ? <CurrentlyWorkingOn /> : null}
        {formData.haveWorkedIn ? <WorkedOn /> : null}
        <FutureInterests/>
        <Participation />
        <br />
        <Button type="submit">Save Profile</Button>
      </form>
    </div>
  );
};

export default UpdateProfile;
