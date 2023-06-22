import { cn } from "@/base/utils";
import React from "react";
import { IoMdInformationCircle } from "react-icons/io";

interface Props extends React.ComponentPropsWithoutRef<"input"> {
  label: string;
  hint?: string;
  /** errors are considered as being hints, enable hints and errors at the same time
   *  using as standalone, you should have
   * @example
   * ```tsx
   * <Input {...props} hint={error.name} isError={Boolean(error.name)} />
   * ```
   */
  isError?: boolean;
  /** Pass custom icon to hint icon or true to show default icon */
  hintIcon?: React.ReactNode | true;
  labelClass?: string;
  hintClass?: string;
}

const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    label,
    type = "text",
    name,
    id,
    isError,
    hint,
    className,
    labelClass,
    hintIcon,
    hintClass,
  } = props;

  return (
    <div className="space-y-2">
      <label className={cn("grid gap-2 text-sm text-black", labelClass)}>
        <span className="font-medium">{label}</span>
        <input
          {...props}
          ref={ref}
          type={type}
          name={name}
          className={cn(
            "rounded-lg border-2 border-black p-4 py-3 outline-transparent placeholder:text-pale-black focus-visible:border-primary focus-visible:outline-none sm:py-4",
            isError && "border-danger-1",
            className
          )}
          id={id ?? name}
        />
      </label>
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

Input.displayName = "Input";

export default Input;
