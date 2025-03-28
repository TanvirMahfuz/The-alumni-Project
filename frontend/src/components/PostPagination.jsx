import React from "react";
import {IconButton, Typography} from "@material-tailwind/react";
import {ArrowRightIcon, ArrowLeftIcon} from "@heroicons/react/24/outline";

export function SimplePagination({
  totalPages,
  currentPage,
  setCurrentPage,
  array,
  setArray,
  valueArray,
}) {
  const [active, setActive] = React.useState(currentPage);
  const next = () => {
    if (active === totalPages) return;
    setActive(active + 1);
    setCurrentPage(active + 1);
    setArray(valueArray.slice(12 * currentPage, 12 * currentPage + 12));
  };

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
    setCurrentPage(active - 1);

    setArray(valueArray.slice(12 * (currentPage - 2), 12 * (currentPage - 1)));
  };

  return (
    <div className="flex items-center gap-8">
      <IconButton
        size="sm"
        variant="outlined"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
      <Typography color="gray" className="font-normal">
        Page <strong className="text-gray-900">{active}</strong> of{" "}
        <strong className="text-gray-900">{totalPages}</strong>
      </Typography>
      <IconButton
        size="sm"
        variant="outlined"
        onClick={next}
        disabled={active === totalPages}
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
    </div>
  );
}
