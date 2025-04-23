import {useState} from "react";
import {PhotoIcon} from "@heroicons/react/24/solid";
import {Input, Textarea, Typography,Button} from "@material-tailwind/react";
import Form1 from "./RegForm/Form1.jsx";
import Form2 from "./RegForm/Form2.jsx";
import Form3 from "./RegForm/Form3.jsx";
import Form4 from "./RegForm/Form4.jsx";
import Form5 from "./RegForm/Form5.jsx";
import Form6 from "./RegForm/Form6.jsx";
import axios from "axios";
import { toFormdata } from "../assets/toFormdata.js";
import { useNavigate } from "react-router-dom";
export default function RegistrationForm({ activeStep }) {
  let [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    currentPost: {
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    },
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
    skills: [
      {
        title: "",
        image: "",
        level: 0,
      },
    ],
    futureInterests: [""],
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
  });
  const [file, setFile] = useState(null);
  const navigate = useNavigate()
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (user.name === "" || user.email === "" || user.password === ""  || user.confirmPassword === "" 
      || user.confirmPassword !== user.password 
    ) {
      alert("your data has inconsistency. Check if the required fields are filled in properly and try again");
      return;
    }
    const formData = await toFormdata(user);
    const data = Object.fromEntries(formData);
    console.log("the form data: ",data);
    axios.post("/api/api/v1/user/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    }).then((res) => {
      console.log(res);
        alert("Registration successful!");
        navigate("/log-in");
    })
    .catch (err => console.log(err.message));
    
  };
  return (
    <div className="max-w-4xl mx-auto lg:p-6">
      <form className="max-w-4xl mx-auto p-6" onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {" "}
          {activeStep == 0 && <Form1 user={user} setUser={setUser} file={file} setFile={setFile} />}
        </div>
        <div>{activeStep == 1 && <Form2 user={user} setUser={setUser} />}</div>
        <div>{activeStep == 2 && <Form3 user={user} setUser={setUser} />}</div>
        <div>{activeStep == 3 && <Form4 user={user} setUser={setUser} />}</div>
        <div>{activeStep == 4 && <Form5 user={user} setUser={setUser} />}</div>
        <div>{activeStep == 5 && <Form6 user={user} setUser={setUser} />}</div>

        {activeStep == 5 && (
          <div className="flex justify-center mt-8">
            <Button
              type="submit"

            >
              Register
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
