import React from "react";
import { Link } from "react-router-dom";
function Contacts() {
  return (
    <div className="flex justify-center w-full">
      <div className="flex gap-4 items-center">
        <Link>github</Link>
        <Link>facebook</Link>
        <Link>linkedin</Link>
        <Link>portfolio</Link>
      </div>
    </div>
  );
}

export default Contacts;
