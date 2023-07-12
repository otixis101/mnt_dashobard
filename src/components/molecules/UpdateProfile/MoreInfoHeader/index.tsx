import React from "react";
import ProgressIndicator from "@/components/atoms/ProgressIndicator";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

interface Props {
  text: string;
  steps: number;
  currentStep: number;
  onPrevClick(): void;
  onNextClick(): void;
}

const MoreInfoHeader = (props: Props) => {
  const { currentStep, onPrevClick, onNextClick, steps, text } = props;

  return (
    <div className="relative mx-2">
      <div className="absolute -top-10 right-0 flex items-center gap-4 xl:top-0">
        {currentStep > 1 && (
          <button type="button" onClick={onPrevClick}>
            <BsArrowLeft className="h-8 w-8 cursor-pointer md:-translate-x-10 xl:h-12 xl:w-14" />
          </button>
        )}
        {currentStep < steps && (
          <button type="button" onClick={onNextClick}>
            <BsArrowRight className="h-8 w-8 cursor-pointer md:-translate-x-10 xl:h-12 xl:w-14" />
          </button>
        )}
      </div>
      <div className="mx-auto flex flex-col items-center justify-center">
        <h3 className="text-center text-xl font-medium text-gray-900 md:text-2xl">
          {text}
        </h3>
        <div className="mx-auto mt-8 w-full max-w-xl px-4">
          <ProgressIndicator steps={steps} currentStep={currentStep} />
        </div>
      </div>
    </div>
  );
};

export default MoreInfoHeader;
