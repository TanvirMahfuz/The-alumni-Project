const Header = ({ name, time }) => (
  <div className="flex items-center space-x-2 rtl:space-x-reverse">
    <span className="text-sm font-semibold text-gray-900 dark:text-white">
      {name}
    </span>
    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
      {time}
    </span>
  </div>
);
export default Header;
