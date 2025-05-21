const JobPerks = ({ perks, maxDisplay, className = "", heading }) => {
  const perksToShow = maxDisplay ? perks.slice(0, maxDisplay) : perks;
  const remainingCount = maxDisplay ? perks.length - maxDisplay : 0;
  return (
    <div className={className}>
      {heading && (
        <h3 className="text-md font-medium text-gray-900">{heading}</h3>
      )}
      <div className="mt-2 flex flex-wrap gap-2">
        {perksToShow.map((perk, index) => (
          <span
            key={index}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {perk}
          </span>
        ))}
        {remainingCount > 0 && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            +{remainingCount} more
          </span>
        )}
      </div>
    </div>
  );
};

export default JobPerks;
