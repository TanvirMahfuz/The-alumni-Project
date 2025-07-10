import React, { useState } from "react";
import { useEventStore } from "../../../../store/useEventStore.js";
import { convertTo12HourFormat } from "../../../../bin/DateTime.js";
import CloseButton from "./CloseButton.jsx";
import TextInput from "./TextInput.jsx";
import DatePicker from "./DatePicker.jsx";
import TimePicker from "./TimePicker.jsx";
import DropDown from "./DropDown.jsx";
import TextArea from "./TextArea.jsx";
import SubmitButton from "./SubmitButton.jsx";
import ImageUpload from "./ImageUpload.jsx"; // Custom image uploader

const EventForm = ({ openForm, setOpenForm }) => {
  const { saveEvent, submissionError } = useEventStore();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    date: null,
    time: null,
    category: "",
    description: "",
    image: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    saveEvent({ ...formData, time: convertTo12HourFormat(formData.time) });
  };

  return (
    <div className="relative">
      <CloseButton {...{ openForm, setOpenForm }} />
      <form
        onSubmit={handleSubmit}
        className=" bg-stone-50 dark:bg-gray-800 p-6 rounded-xl shadow-xl space-y-6 transition-colors duration-300">
        {/* Show error message if exists */}
        {submissionError && (
          <div className="p-3 text-sm text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-200 rounded-md border border-red-300">
            {submissionError}
          </div>
        )}

        {/* Grid Section for Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextInput
            name="Title"
            placeholder="Enter event title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <TextInput
            name="Location"
            placeholder="Enter event location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />

          <DatePicker
            value={formData.date}
            onChange={(date) => setFormData({ ...formData, date })}
          />
          <TimePicker
            value={formData.time}
            onChange={(time) => setFormData({ ...formData, time })}
          />
          <DropDown
            value={formData.category}
            onChange={(category) => setFormData({ ...formData, category })}
          />
          <ImageUpload
            image={formData.image}
            setImage={(img) => setFormData({ ...formData, image: img })}
          />
        </div>

        {/* Description & Submit */}
        <div className="mt-4">
          <TextArea
            name="Description"
            placeholder="Enter description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        <div className="pt-4">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
};

export default EventForm;
