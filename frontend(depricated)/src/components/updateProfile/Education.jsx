import React from "react";
import { Input, Button } from "@material-tailwind/react";
import { useUserUpdateStore } from "../../store/useUserUpdateStore.js";
import { useAuthStore } from "../../store/useUserStore.js";

function Education({ formData, setFormData }) {
  const { authUser } = useAuthStore();
  const [education, setEducation] = React.useState([]);

  React.useEffect(() => {
    if (authUser?.education?.length > 0) {
      const initialEducation = authUser.education.map((edu) => ({
        institute: edu.institute || "",
        degree: edu.degree || "",
        startDate: edu.startDate || "",
        endDate: edu.endDate || "",
      }));
      setEducation(initialEducation);
      setFormData((prev) => ({
        ...prev,
        education: initialEducation,
      }));
    }
  }, [authUser]);

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...education];
    updatedEducation[index][field] = value;

    setEducation(updatedEducation);
    setFormData((prev) => ({
      ...prev,
      education: updatedEducation,
    }));
  };

  const addNewEducation = () => {
    const newEducation = {
      institute: "",
      degree: "",
      startDate: "",
      endDate: "",
    };

    setEducation((prev) => [...prev, newEducation]);
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, newEducation],
    }));
  };

  const removeEducation = (index) => {
    const updatedEducation = education.filter((_, i) => i !== index);

    setEducation(updatedEducation);
    setFormData((prev) => ({
      ...prev,
      education: updatedEducation,
    }));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Education</h3>

      {education.map((item, index) => (
        <div
          key={index}
          className="relative p-4 border border-gray-300 rounded-lg space-y-3">
          <Input
            label="Institute"
            variant="standard"
            value={item.institute}
            onChange={(e) =>
              handleEducationChange(index, "institute", e.target.value)
            }
          />
          <Input
            label="Degree"
            variant="standard"
            value={item.degree}
            onChange={(e) =>
              handleEducationChange(index, "degree", e.target.value)
            }
          />
          <div className="flex gap-3">
            <Input
              type="date"
              variant="standard"
              label="Start Date"
              value={item.startDate}
              onChange={(e) =>
                handleEducationChange(index, "startDate", e.target.value)
              }
            />
            <Input
              type="date"
              variant="standard"
              label="End Date"
              value={item.endDate}
              onChange={(e) =>
                handleEducationChange(index, "endDate", e.target.value)
              }
            />
          </div>
          <button
            color="red"
            size="sm"
            variant="text"
            className="absolute top-2 right-2 !p-1"
            onClick={() => removeJob(index)}>
            ×
          </button>
        </div>
      ))}

      <Button onClick={addNewEducation} className=" px-2 py-1 bg-gray-900">
        + Add Education
      </Button>
    </div>
  );
}

export default Education;
