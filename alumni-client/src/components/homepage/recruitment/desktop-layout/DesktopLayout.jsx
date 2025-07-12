import React from "react";
import JobCard from "../RecruitmentCard/JobCard";
import JobDetailsPanel from "../RecruitmentCard/JobDetailsPanel";
function DesktopLayout({
  recruitments,
  openPanelId,
  setOpenPanelId,

}) {
  return (
    <div className="hidden lg:block">
      {!openPanelId && (
        <>
          <div className="grid mt-8 grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            {recruitments.map((job) => (
              <JobCard
                key={job._id}
                {...job}
                onLearnMore={() => setOpenPanelId(job._id)}
              />
            ))}
          </div>
        </>
      )}

      {openPanelId && (
        <div className="grid grid-cols-2 2xl:grid-cols-3 gap-4">
          <div className="col-span-1 2xl:col-span-2 h-screen overflow-y-auto">
            <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4">
              {recruitments.map((job) => (
                <JobCard
                  key={job._id}
                  {...job}
                  onLearnMore={() => setOpenPanelId(job._id)}
                />
              ))}
            </div>
          </div>
          <div className="col-span-1">
            <JobDetailsPanel
              {...recruitments.find((job) => job._id === openPanelId)}
              onClose={() => setOpenPanelId(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default DesktopLayout;
