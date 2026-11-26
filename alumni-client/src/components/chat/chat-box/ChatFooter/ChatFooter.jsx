import { sendIcon } from "../../../../assets/icons.jsx";
import React, { useRef } from "react";
import Input from "../../../common/Input/Input";
import ImageInput from "../../../common/ImageInput/ImageInput";
import ImagePreview from "../../../common/ImagePreview/ImagePreview";

import { useChatStore } from "../../../../store/useChatStore";
import UploadUnavailable from "../../../common/UploadUnavailable/UploadUnavailable";
import "./ChatFooter.css";

function ChatFooter() {
  const [formdata, setFormdata] = React.useState({
    text: "",
    images:[]
  });
  const { sendMessage } = useChatStore();
  const [showUploadNotice, setShowUploadNotice] = React.useState(false);

  React.useEffect(() => {
    if (!showUploadNotice) return;
    const timer = setTimeout(() => setShowUploadNotice(false), 3000);
    return () => clearTimeout(timer);
  }, [showUploadNotice]);
const handleChange = (e) => {
  const { name, value, files } = e.target;
  if (name === "images") {
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
const sendIconRef = useRef(null);
const sendingRef = useRef(false);

// Paper plane flies out to the right, then slides back in from the left
const playSendAnimation = () => {
  const el = sendIconRef.current;
  if (!el?.animate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  el.animate(
    [
      { transform: "translateX(0)", opacity: 1 },
      { transform: "translateX(140%)", opacity: 0, offset: 0.45 },
      { transform: "translateX(-140%)", opacity: 0, offset: 0.46 },
      { transform: "translateX(0)", opacity: 1 },
    ],
    { duration: 650, easing: "ease-in-out" }
  );
};

async function handleSubmit(e) {
  e.preventDefault();
    if (!formdata.text.trim() && formdata.images.length === 0) return;
    // Ignore Enter/click repeats while the previous send is still in flight
    if (sendingRef.current) return;
    sendingRef.current = true;
    playSendAnimation();
    try {
      const sent = await sendMessage(formdata);
      if (sent) {
        setFormdata({ text: "", images: [] });
      }
    } finally {
      sendingRef.current = false;
    }
  }

  return (
    <>
      {formdata.images.length > 0 && (
        <ImagePreview
          images={formdata.images}
          setImages={(imgs) =>
            setFormdata((prev) => ({ ...prev, images: imgs }))
          }
        />
      )}
      {showUploadNotice && (
        <UploadUnavailable compact className="mx-3 md:mx-8 mt-2" />
      )}
      <div className="chat-footer-row flex gap-1 md:gap-0 px-2 py-2 md:m-4 md:mt-2 md:mr-0 md:p-4 md:pr-0 justify-center items-center border-t border-gray-200 dark:border-gray-700 md:border-0">
        <ImageInput
          onChange={handleChange}
          name="images"
          multiple={true}
          onUnavailable={() => setShowUploadNotice(true)}
        />
        <form className="message-bar flex-1 min-w-0" onSubmit={handleSubmit}>
          <Input
            placeholder="type message"
            value={formdata.text}
            name="text"
            onChange={handleChange}
          />
        </form>
        {/* Blue icon, lifts on hover; hovering it nudges the message bar left (ChatFooter.css) */}
        <button
          type="button"
          onClick={handleSubmit}
          aria-label="Send message"
          title="Send"
          className="send-btn shrink-0 text-[#2992FE] p-1 rounded-lg overflow-hidden cursor-pointer hover:translate-y-[-5px] hover:scale-105 transition-all ease-in-out duration-250 [&_svg]:size-7">
          <span ref={sendIconRef} className="block">
            {sendIcon}
          </span>
        </button>
      </div>
    </>
  );
}

export default ChatFooter;
