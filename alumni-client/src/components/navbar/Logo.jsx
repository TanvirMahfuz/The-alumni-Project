import { Link } from "react-router-dom";

const Logo = () => (
  <>
    <Link to="/" className="hidden xl:flex text-2xl">
      <img src="./connect-main-logo.png" width="160px" alt="main-logo" />
    </Link>
    <Link to="/" className="flex xl:hidden sm:flex text-2xl mr-2">
      <img src="logo-mini.PNG" width="36px" alt="icon-logo" />
    </Link>
  </>
);

export default Logo;
