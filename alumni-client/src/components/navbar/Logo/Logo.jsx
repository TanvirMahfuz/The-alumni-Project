import { Link } from "react-router-dom";
import { useThemeStore } from "../../../store/useThemeStore";

const Logo = () => {
  const { isDark } = useThemeStore();

  return (
    <>
      <Link to="/" className="hidden xl:flex text-2xl">
        {isDark ? (
          <img src="/connect_dark_desktop.png" width="160px" alt="main-logo" />
        ) : (
          <img src="/connect_light_desktop.png" width="160px" alt="main-logo" />
        )}
      </Link>
      <Link to="/" className="flex xl:hidden sm:flex text-2xl mr-2">
        {isDark ? (
          <img src="/connect_dark_mobile_2.png" width="36px" alt="main-logo" />
        ) : (
          <img src="/connect_light_mobile_2.png" width="36px" alt="main-logo" />
        )}
      </Link>
    </>
  );
};

export default Logo;
