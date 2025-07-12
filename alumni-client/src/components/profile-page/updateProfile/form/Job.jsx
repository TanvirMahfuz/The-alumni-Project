import React, { useEffect } from "react";
import { useUserStore } from "../../../../store/useUserStore";

function Job({ formData, setFormData }) {
  const { authUser } = useUserStore();

  useEffect(() => {
    if (authUser?.currentPost) {
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
    <div className="space-y-6 mt-6">
      <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
        Current Job
      </h3>

      {formData.currentPost?.length > 0 ? (
        formData.currentPost.map((job, index) => (
          <div
            key={index}
            className="relative p-5 border border-teal-600 rounded-lg bg-white/10 dark:bg-gray-800 space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-300">
                Job Title
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 text-gray-400 bg-white dark:bg-gray-900 border border-teal-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={job.title}
                onChange={(e) =>
                  handleJobChange(index, "title", e.target.value)
                }
                placeholder="Enter job title"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-300">
                Company
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 text-gray-400 bg-white dark:bg-gray-900 border border-teal-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={job.company}
                onChange={(e) =>
                  handleJobChange(index, "company", e.target.value)
                }
                placeholder="Enter company name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-300">
                  Start Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 text-gray-400 bg-white dark:bg-gray-900 border border-teal-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={job.startDate}
                  onChange={(e) =>
                    handleJobChange(index, "startDate", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                  End Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 text-gray-400 bg-white dark:bg-gray-900 border border-teal-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={job.endDate}
                  onChange={(e) =>
                    handleJobChange(index, "endDate", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-300">
                Description
              </label>
              <textarea
                rows={3}
                className="w-full px-4 py-2 text-gray-400 bg-white dark:bg-gray-900 border border-teal-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={job.description}
                onChange={(e) =>
                  handleJobChange(index, "description", e.target.value)
                }
                placeholder="Describe your responsibilities"
              />
            </div>

            <button
              onClick={() => removeJob(index)}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold transition-all"
              aria-label="Remove job"
              type="button">
              ×
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500 dark:text-gray-400">
          No current job listed
        </p>
      )}

      <button
        onClick={addNewJob}
        className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors duration-200"
        type="button">
        + Add Current Job
      </button>
    </div>
  );
}

export default Job;
