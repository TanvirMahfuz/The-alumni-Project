
import { useState } from "react";
import { profileIcon, ChevronDownIcon, companyIcon } from "../../assets/icons";
const options = [
  { id: 1, name: "user", icon: profileIcon },
  { id: 2, name: "company",icon:companyIcon },
];

export default function ListBox() {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [showOptions, setShowOptions] = useState(false);
  return (
    <div className=" w-15 cursor-pointer">
      <button
        className="flex justify-around items-center py-1 bg-gray-600 w-full rounded-lg hover:bg-gray-500 hover:cursor-pointer transition-colors duration-200"
        onClick={() => setShowOptions(!showOptions)}>
        {selectedOption.icon} <span>{ChevronDownIcon}</span>
      </button>
      {showOptions && (
        <div className="absolute z-10 bg-gray-600 w-1/4 md:w-1/8 rounded-lg mt-2 ">
          {options.map((option) => (
            <div
              key={option.id}
              className="flex gap-2 items-center m-1 py-1 px-2 rounded-lg hover:bg-gray-400 cursor-pointer transition-colors duration-200"
              onClick={() => {
                setSelectedOption(option);
                setShowOptions(false);
              }}>
              {option.icon}
              <span>{option.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
