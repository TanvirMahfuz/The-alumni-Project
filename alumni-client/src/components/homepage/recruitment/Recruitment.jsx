import { useEffect, useState } from "react";

import { useRecruitmentStore } from "../../../store/useRecruitmentStore.js";
import MobileLayout from "./mobile-layout/MobileLayout.jsx";
import DesktopLayout from "./desktop-layout/DesktopLayout.jsx";
import Header from "./Header/Header.jsx";
import RecruitmentForm from "./recruitment-form/RecruitmentForm.jsx";
import Modal from "../../common/Modal/Modal.jsx";
import EmptyState, { PAGE_SHELL } from "../../common/EmptyState/EmptyState.jsx";
import { FaBriefcase } from "react-icons/fa";
function Recruitment() {
  const [openPanelId, setOpenPanelId] = useState(null);
  const { recruitments, getRecruitments, formOpen, setFormOpen, isLoading } =
    useRecruitmentStore();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    getRecruitments().finally(() => setLoaded(true));
  }, [getRecruitments]);
  const isEmpty = loaded && !recruitments?.length;

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
      <div className={PAGE_SHELL}>
        <Header />
        {isEmpty ? (
          <EmptyState
            icon={FaBriefcase}
            title="No Job Posts Yet"
            message="There are no openings right now. Check back later or post a job for fellow alumni."
          />
        ) : (
          <>
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
          </>
        )}
      </div>
    </>
  );
}

export default Recruitment;
