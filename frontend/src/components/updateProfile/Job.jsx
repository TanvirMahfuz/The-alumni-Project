import React from "react";
import { Input, Button } from "@material-tailwind/react";
import { useAuthStore } from "../../store/useUserStore.js";

function Job({ formData, setFormData }) {
  const { authUser } = useAuthStore();

  React.useEffect(() => {
    if (authUser?.currentPost) {
      setFormData((prev) => ({
        ...prev,
        currentPost: authUser.currentPost ??  [],
      }));
    }
  }, [authUser]);

  const handleJobChange = (index, field, value) => {
    const updatedJobs = [...formData.currentPost];
    updatedJobs[index][field] = value;

    setFormData((prev) => ({
      ...prev,
      currentPost: updatedJobs,
    }));
  };

  const addNewJob = () => {
    const newJob = {
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    };

    setFormData((prev) => ({
      ...prev,
      currentPost: [...prev.currentPost, newJob],
    }));
  };

  const removeJob = (index) => {
    const updatedJobs = formData.currentPost.filter((_, i) => i !== index);

    setFormData((prev) => ({
      ...prev,
      currentPost: updatedJobs,
    }));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Current Job</h3>

      {formData.currentPost?.length > 0 ? (
        formData.currentPost.map((job, index) => (
          <div
            key={index}
            className="relative p-4 border border-gray-300 rounded-lg space-y-3">
            <Input
              variant="standard"
              label="Job Title"
              value={job.title}
              onChange={(e) => handleJobChange(index, "title", e.target.value)}
            />
            <Input
              variant="standard"
              label="Company"
              value={job.company}
              onChange={(e) =>
                handleJobChange(index, "company", e.target.value)
              }
            />
            <div className="flex gap-3">
              <Input
                type="date"
                variant="standard"
                label="Start Date"
                value={job.startDate}
                onChange={(e) =>
                  handleJobChange(index, "startDate", e.target.value)
                }
              />
              <Input
                type="date"
                variant="standard"
                label="End Date"
                value={job.endDate}
                onChange={(e) =>
                  handleJobChange(index, "endDate", e.target.value)
                }
              />
            </div>
            <Input
              variant="standard"
              label="Description"
              value={job.description}
              onChange={(e) =>
                handleJobChange(index, "description", e.target.value)
              }
            />
            <button
              color="red"
              size="sm"
              variant="text"
              className="absolute top-2 right-2 !p-1"
              onClick={() => removeJob(index)}>
              ×
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No current job listed</p>
      )}

      <Button
        color="black"
        size="sm"
        onClick={addNewJob}
        className="mt-2 px-2 py-1">
        + Add Current Job
      </Button>
    </div>
  );
}

export default Job;
