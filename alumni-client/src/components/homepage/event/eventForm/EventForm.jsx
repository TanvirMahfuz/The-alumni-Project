import React, { useState } from "react";
import TextInput from "./TextInput";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import DropDown from "./DropDown";
import TextArea from "./TextArea";
import FileUpload from "./FileUpload";
import SubmitButton from "./SubmitButton";
import CloseButton from "./CloseButton";
import { useEventStore } from "../../../../store/useEventStore";
import { convertTo12HourFormat } from "../../../../bin/DateTime";
const EventForm = ({ openForm, setOpenForm }) => {
  const { saveEvent } = useEventStore();
  const [formData, setFormData] = useState({
    title: "",
    date: null,
    time: null,
    category: "",
    description: "",
    image: null,
  });

  function handleSubmit(e) {
    e.preventDefault();
    saveEvent({...formData,time:convertTo12HourFormat(formData.time)});
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (selectedDate) => {
    setFormData({ ...formData, date: selectedDate });
  };

  const handleTimeChange = (time) => {
    setFormData({ ...formData, time });
  };

  const handleCategoryChange = (category) => {
    setFormData({ ...formData, category });
  };

  const handleImageUpload = (image) => {
    setFormData({ ...formData, image });
  };

  return (
    <div className="pt-0 flex flex-col mx-auto">
      <CloseButton {...{ openForm, setOpenForm }} />
      <form
        onSubmit={handleSubmit}
        className="w-full bg-gray-600 p-4 rounded-lg shadow-2xl">
        <TextInput
          name="title"
          placeholder="Enter event title"
          value={formData.title}
          onChange={handleChange}
        />
        <TextInput
          name="location"
          placeholder="Enter event location"
          value={formData.location}
          onChange={handleChange}
        />
        <DatePicker value={formData.date} onChange={handleDateChange} />
        <TimePicker value={formData.time} onChange={handleTimeChange} />
        <DropDown value={formData.category} onChange={handleCategoryChange} />
        <TextArea
          name="description"
          placeholder="Enter description"
          value={formData.description}
          onChange={handleChange}
        />
        <FileUpload onFileUpload={handleImageUpload} />
        <SubmitButton />
      </form>
    </div>
  );
};

export default EventForm;
