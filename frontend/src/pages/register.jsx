import axios from "axios";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {DefaultPagination} from "../components/DefaultPagination";
import {Input, Textarea, Typography, Button} from "@material-tailwind/react";
function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: null,
    bio: "",
    contacts: {
      github: "",
      linkedin: "",
      facebook: "",
      portfolio: "",
    },
    isAdmin: false,
    currentPost: "",
    jobExperience: [
      {
        title: "",
        company: "",
        years: 0,
      },
    ],
    haveWorkedIn: "",
    currentlyWorkingIn: "",
    futureInterests: "",
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
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    console.log(formData);
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleNestedChange = (e, parentKey, index) => {
    const {name, value} = e.target;
    setFormData((prevData) => {
      const updatedNested = [...prevData[parentKey]];
      updatedNested[index] = {...updatedNested[index], [name]: value};
      return {
        ...prevData,
        [parentKey]: updatedNested,
      };
    });
  };
  const handleContactChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      contacts: {
        ...prevData.contacts,
        [name]: value,
      },
    }));
  };

  const addJobExperience = () => {
    setFormData((prevData) => ({
      ...prevData,
      jobExperience: [
        ...prevData.jobExperience,
        {title: "", company: "", years: 0},
      ],
    }));
  };

  const addProject = () => {
    setFormData((prevData) => ({
      ...prevData,
      projects: [
        ...prevData.projects,
        {projectName: "", projectDescription: "", projectLink: ""},
      ],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = new FormData();

    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("confirmPassword", formData.confirmPassword);

    data.append("bio", formData.bio);
    data.append("contacts", JSON.stringify(formData.contacts));
    data.append("isAdmin", formData.isAdmin);
    data.append("currentPost", formData.currentPost);
    data.append("jobExperience", JSON.stringify(formData.jobExperience));
    data.append("haveWorkedIn", JSON.stringify(formData.haveWorkedIn));
    data.append("profileImage", formData.image);
    data.append("currentlyWorkingIn", formData.currentlyWorkingIn);
    data.append("futureInterests", formData.futureInterests);
    data.append("availableForWork", formData.availableForWork);
    data.append("projects", JSON.stringify(formData.projects));
    data.append("resume", formData.resume);

    data = Object.fromEntries(data);
    console.log(data);

    axios
      .post("/api/api/v1/user/register", data, {
        headers: {"Content-Type": "multipart/form-data"},
      })
      .then((res) => {
        if (res.status !== 200) {
          navigate("/register");
        } else {
          navigate("/log-in");
        }
      })
      .catch((err) => {
        console.error("Error submitting form:", err);
        navigate("/register");
      });
  };

  return (
    <div className="flex items-center justify-center h-screen rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-center flex-col p-6 space-y-4 md:space-y-6 sm:p-8 min-w-1/3  bg-gray-50 rounded-lg shadow dark:bg-gray-800 dark:border dark:border-gray-700">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Sign up to ICT Alumni (Step {step} of 4)
        </h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 md:space-y-6 w-full max-h-[40vh] min-h-[35vh] overflow-auto p-2"
        >
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <>
              <div>
                <Input
                  variant="outlined"
                  label="Your Name"
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Input
                  variant="outlined"
                  label="email"
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  label="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
              </div>
              <div>
                <Input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  label="confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
              </div>
            </>
          )}

          {/* Step 2: Profile Information */}
          {step === 2 && (
            <>
              <div className="w-1/4">
                <label
                  htmlFor="profileImage"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {file ? file.name : "Upload image"}
                </label>
                <Input
                  type="file"
                  name="profileImage"
                  id="profileImage"
                  onChange={handleImageChange}
                  label="Upload image"
                />
              </div>
              <div>
                <label
                  htmlFor="bio"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Bio
                </label>
                <Textarea
                  name="bio"
                  id="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  label="Write a short bio about yourself"
                />
              </div>
              <div>
                <label
                  htmlFor="currentPost"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Current Position
                </label>
                <Textarea
                  type="text"
                  name="currentPost"
                  id="currentPost"
                  value={formData.currentPost}
                  onChange={handleChange}
                  label="job title"
                  size="md"
                />
              </div>
            </>
          )}

          {/* Step 3: Job Experience and Projects */}
          {step === 3 && (
            <>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Job Experience
                </label>
                {formData.jobExperience.map((exp, index) => (
                  <div key={index} className="mb-4 space-y-4  p-2">
                    <Input
                      type="text"
                      name="title"
                      label="Job Title"
                      value={exp.title}
                      onChange={(e) =>
                        handleNestedChange(e, "jobExperience", index)
                      }
                    />
                    <Input
                      type="text"
                      name="company"
                      label="Company"
                      value={exp.company}
                      onChange={(e) =>
                        handleNestedChange(e, "jobExperience", index)
                      }
                    />
                    <Input
                      type="number"
                      name="years"
                      label="Years"
                      value={exp.years}
                      onChange={(e) =>
                        handleNestedChange(e, "jobExperience", index)
                      }
                    />
                  </div>
                ))}
                <Button type="button" onClick={addJobExperience}>
                  Add Job Experience
                </Button>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Projects
                </label>
                {formData.projects.map((project, index) => (
                  <div key={index} className="mb-4 space-y-4  p-2">
                    <Input
                      type="text"
                      name="projectName"
                      label="Project Name"
                      value={project.projectName}
                      onChange={(e) => handleNestedChange(e, "projects", index)}
                    />
                    <Textarea
                      type="text"
                      name="projectDescription"
                      label="Project Description"
                      value={project.projectDescription}
                      onChange={(e) => handleNestedChange(e, "projects", index)}
                    />
                    <Input
                      type="text"
                      name="projectLink"
                      label="Project Link"
                      value={project.projectLink}
                      onChange={(e) => handleNestedChange(e, "projects", index)}
                    />
                  </div>
                ))}
                <Button type="button" onClick={addProject}>
                  Add Project
                </Button>
              </div>
            </>
          )}

          {/* Step 4: Contacts and Final Details */}
          {step === 4 && (
            <>
              <div className="space-y-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Contacts
                </label>

                <div>
                  <Input
                    type="text"
                    name="github"
                    label="GitHub URL"
                    value={formData.contacts.github}
                    onChange={(e) => handleContactChange(e)}
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    name="linkedin"
                    label="LinkedIn URL"
                    value={formData.contacts.linkedin}
                    onChange={(e) => handleContactChange(e)}
                  />
                </div>

                <div>
                  <Input
                    type="text"
                    name="facebook"
                    label="Facebook URL"
                    value={formData.contacts.facebook}
                    onChange={(e) => handleContactChange(e)}
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    name="portfolio"
                    label="Portfolio URL"
                    value={formData.contacts.portfolio}
                    onChange={(e) => handleContactChange(e)}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="resume"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Resume URL
                </label>
                <div>
                  <Input
                    type="text"
                    name="resume"
                    id="resume"
                    value={formData.resume}
                    onChange={handleChange}
                    label="Resume URL"
                  />
                </div>
              </div>
            </>
          )}

          {step === 4 && (
            <div className="flex justify-center">
              <Button type="submit">Submit</Button>
            </div>
          )}
        </form>
        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <DefaultPagination step={step} setStep={setStep} />
        </div>
        <Typography variant="small" className="mt-2 flex justify-center">
          Already have an account?
          <Typography
            as="a"
            href="/log-in"
            variant="small"
            color="blue-gray"
            className="ml-1 font-bold"
          >
            Sign in
          </Typography>
        </Typography>
      </div>
    </div>
  );
}

export default Register;
