import {Slider} from "@material-tailwind/react";

export function DefaultSlider() {
  return (
    <div className="w-full flex items-center justify-center">
      <Slider defaultValue={50} />
    </div>
  );
}
