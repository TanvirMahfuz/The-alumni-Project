import { useEffect, useState } from "react";

import { useRecruitmentStore } from "../../../store/useRecruitmentStore.js";
import MobileLayout from "./mobile-layout/MobileLayout.jsx";
import DesktopLayout from "./desktop-layout/DesktopLayout.jsx";
import Header from "./Header.jsx";
import RecruitmentForm from "./recruitment-form/RecruitmentForm.jsx";
import Modal from "../../common/Modal.jsx";
function Recruitment() {
  const [openPanelId, setOpenPanelId] = useState(null);
  const { recruitments, getRecruitments, formOpen, setFormOpen, isLoading } =
    useRecruitmentStore();
  console.log(formOpen, isLoading);
  useEffect(() => {
    getRecruitments();
  }, [getRecruitments]);

  return (
    <>
      {formOpen && (
        <Modal isOpen={formOpen} onClose={() => setFormOpen(false)}>
          {isLoading ? (
            <div className="flex justify-center items-center h-screen">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
            </div>
          ) : (
            <RecruitmentForm />
          )}
        </Modal>
      )}
      <div className="m-4 mt-8 pe-4">
        <Header />
        {/* Desktop Layout */}
        <DesktopLayout
          recruitments={recruitments}
          openPanelId={openPanelId}
          setOpenPanelId={setOpenPanelId}
        />

        {/* Mobile Layout */}
        <MobileLayout
          recruitments={recruitments}
          openPanelId={openPanelId}
          setOpenPanelId={setOpenPanelId}
        />
      </div>
    </>
  );
}

export default Recruitment;
