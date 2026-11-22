
import { FaGithub, FaFacebook, FaLinkedin, FaGlobe } from "react-icons/fa";

const icons = {
  facebook: FaFacebook,
  github: FaGithub,
  linkedin: FaLinkedin,
  portfolio: FaGlobe,
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
              className="flex items-center text-teal-500 hover:text-teal-200">
              <Icon className="mr-2 text-xl" />
              <span className="font-medium capitalize">{key}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

