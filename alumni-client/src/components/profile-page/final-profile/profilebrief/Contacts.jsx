
import {
  facebookIcon,
  githubIcon,
  linkedInIcon,
  globeIcon,
} from "../../../../assets/icons.jsx";

const icons = {
  facebook: facebookIcon,
  github: githubIcon,
  linkedin: linkedInIcon,
  portfolio: globeIcon,
};

export default function Contacts({ contacts }) {
  if (!contacts || typeof contacts !== "object") return null;

  return (
    <div className="mt-10">
      <div className="flex flex-wrap gap-4 ">
        {Object.entries(contacts).map(([key, url]) => {
          if (!url) return null;
          const Icon = icons[key];
          return (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-700 hover:text-gray-800">
              <span className="w-6 h-6">{Icon}</span>
              <span className="font-medium capitalize">{key}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

