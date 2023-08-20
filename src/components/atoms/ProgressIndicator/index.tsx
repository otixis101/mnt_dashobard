import React from "react";
import * as RadixProgress from "@radix-ui/react-progress";
import { cn } from "@/base/utils";

interface Props {
  currentStep: number;
  steps: number;
  /** className for the wrapper */
  class?: string;
  /** className for the indicator */
  className?: string;
}

const ProgressIndicator = (props: Props) => {
  const { currentStep, steps, class: wrapperClass, className } = props;

  const percentage = `${100 - (currentStep / steps) * 100}%`;

  return (
    <RadixProgress.Root
      className={cn(
        "relative h-[7px] w-full !overflow-hidden rounded-full bg-[hsla(0,_0%,_85%,_1)]",
        wrapperClass
      )}
      style={{
        // Fix overflow clipping in Safari
        // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
        transform: "translateZ(0)",
      }}
      value={currentStep}
    >
      <RadixProgress.Indicator
        className={cn(
          "ease-[cubic-bezier(0.65, 0, 0.35, 1)] h-full w-full rounded-full bg-primary transition-transform duration-[660ms]",
          className
        )}
        style={{ transform: `translateX(-${percentage})` }}
      />
    </RadixProgress.Root>
  );
};

export default ProgressIndicator;
