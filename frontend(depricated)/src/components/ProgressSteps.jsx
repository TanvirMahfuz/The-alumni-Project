import React from "react";
import {Stepper, Step, Button, Typography} from "@material-tailwind/react";
import { LightBulbIcon } from "@heroicons/react/24/solid";
import {
  CogIcon,
  UserIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";

export function ProgressSteps({ activeStep, setActiveStep, isLastStep, setIsLastStep, isFirstStep, setIsFirstStep}) {


  return (
    <div className="w-full py-4 gap-2">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}

      >
        <Step onClick={() => setActiveStep(0)}>
          <UserIcon className="h-5 w-5" />
        </Step>
        <Step onClick={() => setActiveStep(1)}>
          <i class="bi bi-mortarboard-fill"></i>
        </Step>
        <Step onClick={() => setActiveStep(2)}>
          <BuildingLibraryIcon className="h-5 w-5" />
        </Step>
        <Step onClick={() => setActiveStep(3)}>
          <i class="bi bi-lightbulb"></i>
        </Step>
        <Step onClick={() => setActiveStep(4)}>
          <i class="bi bi-bookmark-star-fill"></i>
        </Step>
        <Step onClick={() => setActiveStep(5)}>
          <i class="bi bi-patch-check"></i>

        </Step>
      </Stepper>
    </div>
  );
}
