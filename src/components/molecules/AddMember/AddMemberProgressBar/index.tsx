import React from "react";
import { cn } from "@/base/utils";

interface Props {
  level: number;
}
const AddMemberProgressBar = ({ level }: Props) => (
  <div className="relative z-[1] w-full">
    <ul className="counter-reset-step">
      {Array.from({ length: 3 }, (_, i) => (
        <li
          key={i}
          className={cn(
            "before:counter-increment-step relative z-10 float-left w-2/6 text-center before:mx-auto before:mb-4 before:block before:h-[3rem] before:w-[3rem] before:rounded-full before:border-2 before:border-gray-300 before:text-center before:font-medium before:leading-[44px]",
            level >= i + 1 && "active"
          )}
        />
      ))}
    </ul>
  </div>
);
export default AddMemberProgressBar;
