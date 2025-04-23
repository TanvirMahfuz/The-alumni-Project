import React from "react";
import { Typography } from "@material-tailwind/react";
const ModeSelector = ({ mode, setMode }) => {

  const handleMode = (e) => {
    setMode({
      post: false,
      profile: false,
      edit: false,
      [e.target.dataset.value]: true,
    });
  };
  
    const modeLabels = {
      profile: "Profile",
      post: "My Posts",
      edit: "Edit Profile",
    };

    return (
      <div className="flex gap-8 justify-start m-4 mb-1 px-4">
        {Object.entries(modeLabels).map(([key, label]) => (
          <div key={key}>
            {mode[key] ? (
              <Typography className="bg-gray-900 py-2 px-4 rounded-2xl text-white font-semibold text-lg">
                {label}
              </Typography>
            ) : (
              <Typography
                className="py-2 px-4 rounded-2xl font-semibold text-lg"
                onClick={handleMode}
                data-value={key}>
                {label}
              </Typography>
            )}
          </div>
        ))}
      </div>
    );

};

export default ModeSelector;
