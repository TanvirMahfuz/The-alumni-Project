import React from "react";
import { useNavigate } from "react-router-dom";
import Contacts from "./form/Contacts";
import Experience from "./form/Experience";
import FutureInterests from "./form/FututureInterests";
import CurrentlyWorkingOn from "./form/CurrentlyWorkingOn";
import Introduction from "./form/Introduction";
import Job from "./form/Job";
import Participation from "./form/Participation";
import Projects from "./form/Projects";
import Skills from "./form/Skills";
import WorkedOn from "./form/WorkedOn";
import FileUploads from "./form/FileUploads";
import { useUserStore } from "../../../store/useUserStore";
import Education from "./form/Education";
function UpdateProfile() {
  const navigate = useNavigate();
  const { authUser,updateUser,isUpdating } = useUserStore();
  const [formData, setFormData] = React.useState({});
  React.useEffect(() => {
    if (authUser) {
      setFormData({
        ...formData,
        ...authUser,

      });
    }
  }, [authUser]);
  const handleSubmit = async () => {
    const res = await updateUser(formData);
    if(res){
      alert("Profile updated successfully");
      navigate("/profile");
    }
    else{
      alert("something went wrong");
    }
  };
  return (
    <div className="w-full flex bg-white text-black justify-center items-center">
      <div className="w-full  p-6 bg-white text-black rounded-lg space-y-6">
        <h2 className="text-2xl text-white font-bold mb-4">Update Profile</h2>
        <Contacts {...{ formData, setFormData }} />
        <Introduction {...{ formData, setFormData }} />
        <Education {...{ formData, setFormData }} />
        <Experience {...{ formData, setFormData }} />
        <WorkedOn {...{ formData, setFormData }} />
        <CurrentlyWorkingOn {...{ formData, setFormData }} />
        <FutureInterests {...{ formData, setFormData }} />

        <Job {...{ formData, setFormData }} />

        <Participation {...{ formData, setFormData }} />

        <Projects {...{ formData, setFormData }} />

        <Skills {...{ formData, setFormData }} />

        <FileUploads {...{ formData, setFormData }} />

        <div>
          {isUpdating ? (
            "Updating..."
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center space-x-1 text-white  px-3 py-1 rounded-md bg-teal-600 hover:bg-teal-500 cursor-pointer transition">
              Update Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
