import React from "react";
import * as Switch from "@radix-ui/react-switch";
import { cn } from "@/base/utils";

interface Props {
  label?: string;
  state: boolean;
  wrapperClass?: string;
  labelClass?: string;
  onChangeState?: (c: boolean) => void;
}

const ToggleBtn = ({
  label,
  state,
  wrapperClass,
  labelClass,
  onChangeState,
}: Props) => (
  <div
    className={cn("flex items-center", wrapperClass)}
    style={{ display: "flex", alignItems: "center" }}
  >
    {label && (
      <label
        className={cn(
          "pr-[15px] text-[15px] leading-none text-black",
          labelClass
        )}
        htmlFor="toggle-mode"
      >
        {label}
      </label>
    )}
    <Switch.Root
      onCheckedChange={onChangeState}
      checked={state}
      className="bg-blackA9 shadow-blackA7 relative flex h-[12px] w-[42px] cursor-default items-center rounded-full outline-none focus:shadow-black data-[state=checked]:bg-[#EAE5FB] data-[state=unchecked]:outline-gray-900"
      id="toggle-mode"
    >
      <Switch.Thumb className="shadow-blackA7 block h-[23px] w-[23px] translate-x-[-.1rem] rounded-full bg-white transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[20px] data-[state=checked]:bg-[#5724EB] data-[state=unchecked]:bg-black" />
    </Switch.Root>
  </div>
);

export default ToggleBtn;
