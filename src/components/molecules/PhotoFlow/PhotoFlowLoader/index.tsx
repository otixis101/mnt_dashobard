import { cn } from "@/base/utils";
import React from "react";

interface Props {
  className?: string;
}

const PhotoFlowLoader = ({ className }: Props) => (
  <div className={cn("grid h-[55vh] place-items-center", className)}>
    <div className="lds h-80 w-80">
      <div className="animate-lds absolute left-8 w-16 bg-black" />
      <div className="animate-lds animate-delay-[-0.24s] absolute left-32 w-16 bg-black" />
      <div className="animate-lds animate-delay-[-0.12s] absolute left-56 w-16 bg-black" />
    </div>
  </div>
);

export default PhotoFlowLoader;
