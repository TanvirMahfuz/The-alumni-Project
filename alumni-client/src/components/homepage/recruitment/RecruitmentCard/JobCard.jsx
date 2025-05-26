import JobMetaInfo from "./JobMetaInfo";
import JobPerks from "./JobPerks";

const JobCard = ({
  position,
  company,
  location,
  salary,
  type,
  perks,
  benefits,
  logo,
  isUrgent,
  onLearnMore,
}) => {
  function mergePerksAndBenefits(perks, benefits) {
    if (!perks) perks = [];
    if (!benefits) benefits = [];
    return [...perks, ...benefits];
  }
  return (
    <div className="w-full min-w-84 h-auto bg-white  p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start space-x-3">
        <div className="flex-1 min-w-0">
          <JobMetaInfo
            position={position}
            company={company}
            location={location}
            type={type}
            isUrgent={isUrgent}
            salary={salary}
          />

          {perks && (
            <JobPerks
              perks={mergePerksAndBenefits(perks, benefits)}
              maxDisplay={3}
            />
          )}
        </div>
      </div>

      <div className="mt-5 flex justify-between items-center">
        <button
          onClick={onLearnMore}
          className="text-sm font-medium text-blue-400 hover:text-blue-600 focus:outline-none">
          Learn more →
        </button>
        <button className="px-3 py-1 bg-blue-600 text-white text-sm font-[400] rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
          Quick apply
        </button>
      </div>
    </div>
  );
};

export default JobCard;
