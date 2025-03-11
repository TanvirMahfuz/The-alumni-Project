import React from "react";
import {Button, IconButton} from "@material-tailwind/react";
import {ArrowRightIcon, ArrowLeftIcon} from "@heroicons/react/24/outline";

export function DefaultPagination(props) {
  const [active, setActive] = React.useState(1);

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: "gray",
    onClick: () => {
      setActive(index);
      props.setStep(index);
    },
  });

  const next = () => {
    if (active === 4) return;

    setActive(active + 1);
    props.setStep(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    console.log(active);
    setActive(active - 1);
    props.setStep(active - 1);
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        <IconButton {...getItemProps(1)}>1</IconButton>
        <IconButton {...getItemProps(2)}>2</IconButton>
        <IconButton {...getItemProps(3)}>3</IconButton>
        <IconButton {...getItemProps(4)}>4</IconButton>
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={next}
        disabled={active === 4}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
