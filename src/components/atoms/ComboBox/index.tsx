import React, { FC } from "react";
import * as Select from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { cn } from "@/base/utils";

interface Props {
  label: string;
  onSelect: (value: string) => void;
  defaultValue?: string;
  data?: DataProps[];
  parentClass?: string;
}

export interface DataProps {
  name: string;
  value: string;
}

interface SelectItemProps {
  children: React.ReactNode;
  className?: string;
  value: string;
}

const SampleData: DataProps[] = [
  { name: "Ghana", value: "Ghana" },
  { name: "Togo", value: "Togo" },
  { name: "Benin", value: "benin" },
  { name: "South Africa", value: "southAfrica" },
  { name: "Tanzania", value: "tanzania" },
];

const SelectItem = React.forwardRef<HTMLInputElement, SelectItemProps>(
  ({ children, className, value, ...props }, ref) => (
    <Select.Item
      {...props}
      className={cn(
        "relative flex select-none items-center px-3 pl-[28px] leading-none data-[disabled]:pointer-events-none data-[highlighted]:outline-none",
        className
      )}
      value={value}
      ref={ref}
    >
      <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
        <CheckIcon />
      </Select.ItemIndicator>
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  )
);
SelectItem.displayName = "SelectItem";

const ComboBox: FC<Props> = ({
  label = "select country of origin",
  parentClass,
  data = SampleData,
  onSelect,
  defaultValue,
}) => (
  <Select.Root
    defaultValue={defaultValue}
    onValueChange={(value) => onSelect(value)}
  >
    <div className={cn("grid gap-2 text-sm text-black", parentClass)}>
      <span className="font-medium">{label}</span>
      <Select.Trigger
        style={{ margin: "auto" }}
        className={cn(
          "remove-outline m-auto ml-[-1.5rem] inline-flex w-full items-center justify-between rounded-lg border-2 border-black p-4 py-3 focus-visible:border-primary data-[placeholder]:text-pale-black"
        )}
        aria-label="Country"
      >
        <Select.Value className="w-full" placeholder={label} />
        <Select.Icon className="">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="z-[2] mt-14 overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <Select.Viewport className="bg-white p-[5px]">
            <Select.Group className="">
              {data.map(({ name, value }) => (
                <SelectItem
                  key={value}
                  className="remove-outline flex w-full cursor-pointer items-center rounded-md py-4 text-black data-[highlighted]:bg-primary/70 data-[highlighted]:text-white"
                  value={value}
                >
                  {name}
                </SelectItem>
              ))}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </div>
  </Select.Root>
);

export default ComboBox;
