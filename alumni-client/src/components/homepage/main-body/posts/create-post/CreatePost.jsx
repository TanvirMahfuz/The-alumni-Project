import React, { useEffect, useRef } from "react";
import avatar from "../../../../../assets/avatar.png";
import HiringForm from "./HiringForm.jsx";
import FileUpload from "./FileUpload.jsx";
import Avatar from "./Avatar.jsx";
import SendButton from "./SendButton";
import { useUserStore } from "../../../../../store/useUserStore.js";
import FakeInput from "./FakeInput.jsx";
import PostForm from "./form-body/PostForm.jsx";
import Modal from "../../../../common/Modal.jsx";
function CreatePost() {
  const { authUser } = useUserStore();
  const [formOpen, setFormOpen] = React.useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setFormOpen(false);
      }
    };

    if (formOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [formOpen]);

  return (
    <>
      <div className="bg-white  p-4 rounded-2xl" ref={formRef}>
        <div className="flex items-center gap-2 justify-center">
          <Avatar avatar={authUser?.image || avatar} />
          <FakeInput {...{ formOpen, setFormOpen }} />
        </div>
        {/* <div className="flex justify-between items-center mt-2 mx-8 gap-4">
          <div className="flex items-center">
            <div>
              <FileUpload name="images" />
            </div>
            <div>
              <HiringForm />
            </div>
          </div>
          <div>
            <SendButton />
          </div>
        </div> */}
      </div>
      <Modal isOpen={formOpen} onClose={() => setFormOpen(false)}>
        <PostForm setFormOpen={setFormOpen} />
      </Modal>
    </>
  );
}

export default CreatePost;
