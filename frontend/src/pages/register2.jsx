import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { ProgressSteps } from "../components/ProgressSteps.jsx";
import RegistrationForm from "../components/RegistrationForm.jsx";
import Layout from "../laytout/layout.jsx";

function Demo2() {
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(true);
  
  useEffect(() => {
    setIsFirstStep(activeStep === 0);
    setIsLastStep(activeStep === 5);
  }, [activeStep]);

  return (
    <>
    <Layout>
      <div className="max-w-screen w-full mx-auto px-4 pt-8 flex flex-col items-center justify-center">
        <div className="w-10/12 mx-10">
          <ProgressSteps
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            isLastStep={isLastStep}
            setIsLastStep={setIsLastStep}
            isFirstStep={isFirstStep}
            setIsFirstStep={setIsFirstStep}
            
          />
        </div>
      </div>

      <div className="p-0 md:p-6 grid grid-cols-12">
        <div className="col-span-1 xl:col-span-2 h-full rounded-2xl flex items-center justify-center z-10 transition-all duration-500 transform hover:scale-105 hover:translate-x-[15px]">
          <div
            onClick={() => {
              if (activeStep > 0) {
                setActiveStep((cur) => cur - 1);
              }
            }}
            disabled={isFirstStep}
            className="cursor-pointer text-6xl h-full w-full flex items-center justify-center "
          >
            <i className="bi bi-chevron-compact-left"></i>
          </div>
        </div>

        <div className="col-span-10 xl:col-span-8 max-w-screen w-full mx-auto px-4 py-8 flex flex-col items-center justify-center">
          <div className="w-10/12 min-w-sm bg-white rounded-2xl">
            <RegistrationForm activeStep={activeStep}/>
          </div>
        </div>

        <div className="col-span-1 xl:col-span-2 h-full rounded-2xl flex items-center justify-center transition-all duration-500 transform hover:scale-105 hover:translate-x-[-15px]">
          <div
            onClick={() => {
              if (activeStep < 5) {
                setActiveStep((cur) => cur + 1);
              }
            }}
            disabled={isLastStep}
            className="cursor-pointer text-6xl h-full w-full flex items-center justify-center"
          >
            <i className="bi bi-chevron-compact-right"></i>
          </div>
        </div>
      </div>
      </Layout>
    </>
  );
}

export default Demo2;
