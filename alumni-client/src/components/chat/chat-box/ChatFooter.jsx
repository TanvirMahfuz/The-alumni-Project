import React from "react";
import { xMarkIcon } from "../../../assets/icons";
import Input from "../../common/Input";
import ImageInput from "../../common/ImageInput";
import ImagePreview from "../../common/ImagePreview";

import { useChatStore } from "../../../store/useChatStore";

function ChatFooter() {
  const [formdata, setFormdata] = React.useState({
    text: "",
    images:[]
  });
  const { sendMessage } = useChatStore();
const handleChange = (e) => {
  const { name, value, files } = e.target;
  if (name === "images") {
    const newImages = [];

    Array.from(files).forEach((file) => {
        
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormdata((prev) => ({
          ...prev,
          images: [...(prev.images || []), reader.result],
        }));
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    });
  } else {
    setFormdata((prev) => ({ ...prev, [name]: value }));
  }
};
function handleSubmit(e) {
  e.preventDefault()
    sendMessage(formdata);
    setFormdata({
      text: "",
      images: [],
    });
  }

  return (
    <>

      {formdata.images.length>0 && <ImagePreview
        images={formdata.images}
        setImages={(imgs) => setFormdata((prev) => ({ ...prev, images: imgs }))}
      />}
      <div className="flex m-4 mt-2 p-4 w-full justify-center items-center rounded-2xl bg-gray-700">
        <ImageInput onChange={handleChange} name="images" multiple={true} />
        <div className="w-11/12">
          <Input
            placeholder="type message"
            value={formdata.text}
            name="text"
            onChange={handleChange}
          />
        </div>
        <div className="hover:bg-gray-600 px-3 py-1 text-lg rounded-xl shadow-md transition-all ease-in-out duration-250 cursor-pointer" onClick={handleSubmit}>send</div>
      </div>
    </>
  );
}

export default ChatFooter;
