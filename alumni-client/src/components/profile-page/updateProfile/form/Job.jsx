import React, { useEffect } from "react";
import { useUserStore } from "../../../../store/useUserStore";

function Job({ formData, setFormData }) {
  const { authUser } = useUserStore();

  useEffect(() => {
    if (authUser?.currentPost) {
      // Handle both array and single job cases
      const initialJobs = Array.isArray(authUser.currentPost)
        ? [...authUser.currentPost]
        : [authUser.currentPost].filter(Boolean);

      setFormData((prev) => ({
        ...prev,
        currentPost: initialJobs.map((job) => ({
          title: job.title || "",
          company: job.company || "",
          startDate: job.startDate || "",
          endDate: job.endDate || "",
          description: job.description || "",
        })),
      }));
    }
  }, [authUser, setFormData]);

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
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Job Title
              </label>
              <input
                type="text"
                className="border-b border-gray-300 p-2 focus:outline-none focus:border-blue-500"
                value={job.title}
                onChange={(e) =>
                  handleJobChange(index, "title", e.target.value)
                }
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Company
              </label>
              <input
                type="text"
                className="border-b border-gray-300 p-2 focus:outline-none focus:border-blue-500"
                value={job.company}
                onChange={(e) =>
                  handleJobChange(index, "company", e.target.value)
                }
              />
            </div>

            <div className="flex gap-3">
              <div className="flex-1 flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  className="border-b border-gray-300 p-2 focus:outline-none focus:border-blue-500"
                  value={job.startDate}
                  onChange={(e) =>
                    handleJobChange(index, "startDate", e.target.value)
                  }
                />
              </div>
              <div className="flex-1 flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  type="date"
                  className="border-b border-gray-300 p-2 focus:outline-none focus:border-blue-500"
                  value={job.endDate}
                  onChange={(e) =>
                    handleJobChange(index, "endDate", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                rows={3}
                className="border-b border-gray-300 p-2 focus:outline-none focus:border-blue-500"
                value={job.description}
                onChange={(e) =>
                  handleJobChange(index, "description", e.target.value)
                }
              />
            </div>

            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
              onClick={() => removeJob(index)}>
              ×
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No current job listed</p>
      )}

      <button
        onClick={addNewJob}
        className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors">
        + Add Current Job
      </button>
    </div>
  );
}

export default Job;
