import React, { useState } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { cn } from "@/base/utils";

interface Props {
  defaultValue: string;
  onChangeValue?: (e: string) => void;
  data?: typeof sampleData;
  wrapperClass?: string;
}

const sampleData = [
  { name: "male", id: 1 },
  { name: "female", id: 2 },
  { name: "other", id: 3 },
];

const RadioGroupBtn = ({
  defaultValue,
  onChangeValue,
  wrapperClass,
  data = sampleData,
}: Props) => {
  const [active, setActive] = useState(1);

  const onGetValue = (val: string, id: number) => {
    setActive(id);
    if (onChangeValue) onChangeValue(val);
  };

  return (
    <RadioGroup.Root
      className={cn("flex  gap-2.5", wrapperClass)}
      defaultValue={defaultValue}
      aria-label="View density"
      // onValueChange={onChangeValue}
    >
      {data.map(({ name, id: unique }, i) => (
        <div className="flex items-center" key={unique}>
          <RadioGroup.Item
            className={cn(
              "shadow-blackA7 hover:bg-violet3 h-[25px] w-[25px] cursor-default rounded-full border border-gray-300 bg-white outline-none focus:shadow-[0_0_0_2px] focus:shadow-black",
              active === i + 1 && "data-[state=checked]:bg-[#5724EB]"
            )}
            value={defaultValue}
            id={unique.toString()}
            onClick={() => onGetValue(name, unique)}
          >
            <RadioGroup.Indicator className="relative flex h-full w-full items-center justify-center after:block after:h-[12.5px] after:w-[12.5px] after:rounded-[50%] after:bg-gray-100 after:content-['']" />
          </RadioGroup.Item>
          <label
            className="pl-[15px] text-[17px] capitalize leading-none text-black"
            htmlFor={unique.toString()}
          >
            {name}
          </label>
        </div>
      ))}
    </RadioGroup.Root>
  );
};

export default RadioGroupBtn;
