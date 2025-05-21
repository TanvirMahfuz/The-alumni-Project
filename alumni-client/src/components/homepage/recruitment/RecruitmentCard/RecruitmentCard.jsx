import { useState } from "react";
import JobCard from "./JobCard";
import JobDetailsPanel from "./JobDetailsPanel";

const RecruitmentCard = (props) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <>
      <JobCard {...props} onLearnMore={() => setIsPanelOpen(true)} />
      {isPanelOpen && (
        <JobDetailsPanel {...props} onClose={() => setIsPanelOpen(false)} />
      )}
    </>
  );
};

export default RecruitmentCard;
