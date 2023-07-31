import React from "react";

import { cn } from "@/base/utils";

interface Props {
  className?: string;
  label?: string;
  innerClass?: string;
  onHandleImagePicker?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserProfileDropBox = ({
  className,
  label,
  innerClass,
  onHandleImagePicker,
}: Props) => (
  <div className={cn("", className)}>
    {label && <span className="mb-6 text-gray-800">Upload images</span>}
    <div
      className={cn(
        innerClass,
        "mb-1 flex h-full flex-col items-center justify-center rounded-xl border-2 border-dotted border-gray-400 bg-[#F3F3F3]"
      )}
    >
      <p className="mx-1">Drop files here to upload...</p>
      <div className="my-8">
        <label
          htmlFor="file"
          className="w-1/2 rounded-full border-[1px] border-gray-100 bg-[#E8E8E8] p-4 text-[1rem] text-black"
        >
          Browse File
        </label>
        <input
          type="file"
          id="file"
          onChange={onHandleImagePicker}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  </div>
);

export default UserProfileDropBox;
