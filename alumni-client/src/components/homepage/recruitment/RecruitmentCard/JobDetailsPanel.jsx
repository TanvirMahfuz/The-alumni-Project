import JobHeader from "./JobHeader";
import JobMetaInfo from "./JobMetaInfo";
import JobPerks from "./JobPerks";
import { useRecruitmentStore } from "../../../../store/useRecruitmentStore";
import { Link } from "react-router-dom";
const JobDetailsPanel = ({
  _id,
  applyLink,
  position,
  company,
  location,
  salary,
  type,
  perks,
  logo,
  isUrgent,
  description,
  requirements,
  benefits,
  applicationProcess,
  onClose,
}) => {
  console.log(_id)
  const { reviewResume } = useRecruitmentStore();
  function mergePerksAndBenefits(perks, benefits) {
    if (!perks) perks = [];
    if (!benefits) benefits = [];
    return [...perks, ...benefits];
  }
  return (
    <div className="flex items-center justify-end bg-opacity-50 ">
      <div className="">
        <div className="flex">
          <div className="max-w-md">
            <div className="h-full flex flex-col bg-white rounded-lg shadow-xl overflow-y-scroll">
              <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                <JobHeader position={position} onClose={onClose} />

                <div className="mt-4">
                  <JobMetaInfo
                    company={company}
                    logo={logo}
                    location={location}
                    type={type}
                    isUrgent={isUrgent}
                    salary={salary}
                    panelView
                    perks={perks}
                  />

                  {description && (
                    <div className="mt-6">
                      <h3 className="text-md font-medium text-gray-900">
                        Job Description
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 whitespace-pre-line">
                        {description}
                      </p>
                    </div>
                  )}

                  {requirements && (
                    <div className="mt-6">
                      <h3 className="text-md font-medium text-gray-900">
                        Requirements
                      </h3>
                      <ul className="mt-1 text-sm text-gray-600 list-disc pl-5 space-y-1">
                        {requirements.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {benefits && (
                    <JobPerks
                      perks={mergePerksAndBenefits(perks, benefits)}
                      className="mt-6"
                      heading="Benefits & Perks"
                    />
                  )}

                  {applicationProcess && (
                    <div className="mt-6">
                      <h3 className="text-md font-medium text-gray-900">
                        Application Process
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 whitespace-pre-line">
                        {applicationProcess}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className=" flex gap-4 border-t border-gray-200 px-4 py-6 sm:px-6">
                <button
                  className="w-full bg-violet-600 border border-transparent rounded-lg py-3 px-4 text-base font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => reviewResume(_id)}>
                  request review
                </button>

                <button 
                className="w-full bg-blue-600 border border-transparent rounded-lg py-3 px-4 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => window.open(applyLink, "_blank")}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPanel;
