/* eslint-disable jsx-a11y/label-has-for */
import { cn } from "@/base/utils";
import React, { ComponentProps, ComponentRef } from "react";
import { IoMdInformationCircle } from "react-icons/io";
import PhoneNumberInput, {
  type Props as PhoneInputProps,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface Props extends PhoneInputProps<ComponentProps<"input">> {
  label: string;
  labelClass?: string;
  wrapperClass?: string;
  /** Pass custom icon to hint icon or true to show default icon */
  hintIcon?: React.ReactNode | true;
  hintClass?: string;
  isError?: boolean;
  hint?: string;
}

/** @see https://catamphetamine.gitlab.io/react-phone-number-input/ */
const PhoneInput = React.forwardRef<
  ComponentRef<typeof PhoneNumberInput>,
  Props
>((props, ref) => {
  const {
    onChange,
    value,
    label,
    wrapperClass,
    labelClass,
    hintClass,
    hintIcon,
    hint,
    isError,
  } = props;

  return (
    <div
      className={cn("grid grid-cols-1 gap-2 text-sm text-black", wrapperClass)}
    >
      {/* check tailwind config for extra styles */}
      <div className={cn("mnt", "space-y-2")}>
        <label className={cn("grid gap-2 text-sm text-black", labelClass)}>
          <span className="font-medium">{label}</span>
        </label>
        <PhoneNumberInput
          {...props}
          onChange={onChange}
          value={value}
          ref={ref}
        />
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
});

PhoneInput.displayName = "PhoneInput";

export default PhoneInput;
