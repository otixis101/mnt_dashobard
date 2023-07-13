import React from "react";

import Button from "@/components/atoms/Button";
import { cn } from "@/base/utils";

interface Props {
  className: string;
}
const AlmostThereDropBox = ({ className }: Props) => (
  <div className={cn("", className)}>
    <span className="mb-6 text-gray-800">Upload images</span>
    <div className="mb-1 flex h-full flex-col items-center justify-center rounded-xl border-2 border-dotted border-gray-400 bg-[#F3F3F3]">
      <p className="mx-1">Drop files here to upload...</p>
      <Button
        intent="outline"
        className="w-1/2 rounded-full border-[1px] border-gray-100 bg-[#E8E8E8] p-4 text-[1rem] text-black"
      >
        Browse Files
      </Button>
    </div>
  </div>
);

export default AlmostThereDropBox;
