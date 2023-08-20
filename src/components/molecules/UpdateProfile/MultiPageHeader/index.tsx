import React from "react";
import ProgressIndicator from "@/components/atoms/ProgressIndicator";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { cn } from "@/base/utils";

interface Props {
  text: string;
  steps: number;
  currentStep: number;
  onPrevClick(): void;
  onNextClick?(): void;
  className?: string;
}

const MultiPageHeader = (props: Props) => {
  const { currentStep, onPrevClick, onNextClick, steps, text, className } =
    props;

  return (
    <div className="relative mx-2 !overflow-hidden">
      <div className="absolute right-0 flex items-center gap-4 -top-10 xl:top-0">
        {currentStep > 1 && (
          <button type="button" onClick={onPrevClick}>
            <BsArrowLeft className="w-8 h-8 cursor-pointer md:-translate-x-10 xl:h-12 xl:w-14" />
          </button>
        )}
        {onNextClick && currentStep < steps && (
          <button type="button" onClick={onNextClick}>
            <BsArrowRight className="w-8 h-8 cursor-pointer md:-translate-x-10 xl:h-12 xl:w-14" />
          </button>
        )}
      </div>
      <div className="flex flex-col items-center justify-center mx-auto">
        <h3
          className={cn(
            "text-center text-xl font-medium text-gray-900 md:text-2xl",
            className
          )}
        >
          {text}
        </h3>
        <div className="w-full max-w-xl px-4 mx-auto mt-8">
          <ProgressIndicator steps={steps} currentStep={currentStep} />
        </div>
      </div>
    </div>
  );
};

export default MultiPageHeader;
