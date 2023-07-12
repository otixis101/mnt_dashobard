import React from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { cn } from "@/base/utils";
import { IoMdInformationCircle } from "react-icons/io";

type Options = (string | number)[] | readonly (string | number)[];

interface Props extends React.ComponentProps<typeof RadioGroup.Root> {
  options: Options;
  label: string;
  /** class for the wrapper - RadioGroup.Root */
  class?: string;
  /** class for the item - RadioGroup.Item */
  className?: string;
  /** class for the indicator - RadioGroup.Indicator */
  radioElementClass?: string;
  indicatorClass?: string;
  radioLabel?: string;
  parentClass?: string;
  hint?: string;
  isError?: boolean;
  hintClass?: string;
  /** Pass custom icon to hint icon or true to show default icon */
  hintIcon?: React.ReactNode | true;
}

const Radio = (props: Props) => {
  const {
    class: wrapperClass,
    className,
    indicatorClass,
    options,
    radioLabel,
    radioElementClass,
    parentClass,
    label,
    hint,
    hintIcon,
    isError,
    hintClass,
    ...rootProps
  } = props;
  return (
    <div className="space-y-2">
      <div
        className={cn(
          "grid grid-cols-1 gap-2.5 text-sm text-black",
          parentClass
        )}
      >
        {/** guidelines from https://www.magentaa11y.com/checklist-web/radio/ */}
        <legend className="font-medium">{label}</legend>
        <RadioGroup.Root
          {...rootProps}
          className={cn("flex flex-wrap gap-4", wrapperClass)}
        >
          {options.map((ele) => {
            const stringEle = String(ele);

            return (
              <div
                className={cn("flex items-center gap-2", radioElementClass)}
                key={ele}
              >
                <RadioGroup.Item
                  className={cn(
                    "h-4 w-4 cursor-default rounded-full border border-[#727272] bg-white outline-none focus:outline-none data-[state='checked']:border-[#3182CE] data-[state='checked']:bg-[#3182CE]",
                    className
                  )}
                  value={stringEle}
                  id={stringEle}
                >
                  <RadioGroup.Indicator
                    className={cn(
                      "relative flex h-full w-full items-center justify-center after:block after:h-[60%] after:w-[60%] after:rounded-[50%] after:bg-white after:content-['']",
                      indicatorClass
                    )}
                  />
                </RadioGroup.Item>
                <label
                  className={cn("leading-none", radioLabel)}
                  htmlFor={stringEle}
                >
                  {ele}
                </label>
              </div>
            );
          })}
        </RadioGroup.Root>
      </div>
      {hint && (
        <div
          className={cn(
            "flex items-start gap-1 text-sm text-pale-black",
            isError && "text-danger-1",
            hintClass
          )}
        >
          {hintIcon
            ? hintIcon === true && <IoMdInformationCircle size={20} />
            : hintIcon}
          {hint}
        </div>
      )}
    </div>
  );
};

export default Radio;
