import React, { useEffect, useState } from "react";

import { cn } from "@/base/utils";
import ProgressIndicator from "@/components/atoms/ProgressIndicator";

interface Props {
  className?: string;
  name?: string;
  step?: boolean;
  // innerClass?: string;
  onHandleImagePicker?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserProfileDropBox = ({
  className,
  name,
  step,
  onHandleImagePicker,
}: Props) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    // Implementing the setInterval method
    if (step && count < 100) {
      interval = setInterval(() => {
        setCount(count + 1);
      }, 100);
    }
    // Clearing the interval
    return () => clearInterval(interval);
  }, [step, count]);

  return (
    <div className={cn("", className)}>
      {!step && <span className="mb-2 block text-gray-800">Upload images</span>}
      <div className="relative mb-1 flex h-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dotted border-gray-400 bg-[#F3F3F3] focus-within:border-primary hover:border-primary">
        {step ? (
          <div className="flex w-[90%] flex-col p-6">
            <div className="my-4 w-full max-w-xl px-4">
              <ProgressIndicator steps={10} currentStep={count} />
            </div>
            <p className="mx-1 text-xl font-medium capitalize">
              upload complete
            </p>
            <button
              type="button"
              className="m-auto mt-2 w-1/2 rounded-full border-[1px] border-gray-100 bg-[#E8E8E8] px-5 py-1.5 text-xl text-black md:w-1/6"
              tabIndex={-1}
            >
              ok
            </button>
          </div>
        ) : (
          <>
            <input
              type="file"
              id="file"
              name={name}
              accept="image/*"
              className="absolute inset-0 opacity-0"
              onChange={onHandleImagePicker}
            />
            <p className="mx-1">Drop files here to upload...</p>
            <button
              type="button"
              className="mt-2 w-1/2 rounded-full border-[1px] border-gray-100 bg-[#E8E8E8] px-5 py-1.5 text-black"
              tabIndex={-1}
            >
              Browse Files
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfileDropBox;
