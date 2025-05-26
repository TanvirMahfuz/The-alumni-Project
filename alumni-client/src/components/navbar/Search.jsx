import React from "react";
import Input from "../common/Input";
import ListBox from "../common/Listbox";
import Searchbox from "../common/Searchbox";
import Searchbutton from "./Searchbutton";
function Search() {
  return (
    // {/* Search Bar Centered */}
    <div className="flex w-[300px] sm:w-auto relative items-center border-2 rounded-3xl border-gray-200">
      <ListBox />
      <Searchbox />
      <Searchbutton />
    </div>
  );
}

export default Search;
