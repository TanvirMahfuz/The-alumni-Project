import { sendIcon } from "../../../../../assets/icons";
function SendButton({ handleClick }) {
  return (
    <div className="flex items-center justify-center bg-gray-700  hover:bg-gray-800 rounded-2xl">
      <button
        className="px-4 py-2 transition-all duration-200 ease-in-out flex items-center gap-2 hover:cursor-pointer "
        onClick={handleClick}>
        <span>post</span>
        {sendIcon}
      </button>
    </div>
  );
}
export default SendButton;
