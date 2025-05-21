import React from "react";
import Input from "../common/Input";
import ListBox from "../common/Listbox";
import Searchbox from "../common/Searchbox";
import Searchbutton from "./Searchbutton";
function Search() {
  return (
    <div className=" mx-auto w-1/2 flex gap-2 justify-center items-center">
      <ListBox />
      <Searchbox />
      <Searchbutton />
    </div>
  );
}

export default Search;
