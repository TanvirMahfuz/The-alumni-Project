import React from "react";
import JobCard from "../RecruitmentCard/JobCard";
import JobDetailsPanel from "../RecruitmentCard/JobDetailsPanel";
function MobileLayout({ recruitments, openPanelId, setOpenPanelId }) {
  return (
    <div className="lg:hidden">
      <div className="grid grid-cols-2">
        {!openPanelId && (
          <>
            
            <div className="col-span-2">
              {" "}
              <div className="grid sm:grid-cols-2 gap-4">
                {recruitments.map((job) => (
                  <JobCard
                    key={job._id}
                    {...job}
                    onLearnMore={() => setOpenPanelId(job._id)}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {openPanelId && (
          <>
            <div className="grid grid-cols-1 gap-4">
              {recruitments.map((job) => (
                <JobCard
                  key={job._id}
                  {...job}
                  onLearnMore={() => setOpenPanelId(job._id)}
                />
              ))}
            </div>

            {openPanelId && (
              <div className="fixed inset-0 z-50">
                {/* Semi-transparent overlay without full black */}
                <div
                  className="absolute inset-0 bg-gray-500/30 backdrop-blur-sm"
                  onClick={() => setOpenPanelId(null)}
                />

                {/* Side panel */}
                <div className="absolute top-15 right-5 h-[calc(100vh-5rem)] w-full max-w-md">
                  <div className="h-full bg-white shadow-xl overflow-y-auto rounded-lg">
                    <JobDetailsPanel
                      {...recruitments.find((job) => job._id === openPanelId)}
                      onClose={() => setOpenPanelId(null)}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default MobileLayout;
