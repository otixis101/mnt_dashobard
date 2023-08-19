import React, { useState } from "react";
import { cn } from "@/base/utils";
import { IoMdInformationCircle } from "react-icons/io";
import { BsEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

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
  parentClass?: string;
  required?: boolean;
  password?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const [ show, setShow ] = useState(false);
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
    parentClass,
    hintClass,
    required,
    password,
    ...prop
  } = props;

  return (
    <div className={cn("space-y-2 w-full", parentClass)}>
      <label
        className={cn("grid grid-cols-1 gap-2 text-sm text-black", labelClass)}
      >
        <p className="font-medium flex items-center align-middle content-center gap-1">
          {label}
          {" "}
          {required && <span className="text-red-500 flex content-center" >*</span>}
        </p>
        <span className={cn(
          "flex justify-between content-center align-middle w-full border-2 border-black rounded-lg p-4 py-3 outline-transparent placeholder:text-pale-black focus-visible:border-primary focus-visible:outline-none sm:py-4",
          isError && "border-danger-1",
          className
        )}>
          <p className="w-full">
            <input
              {...prop}
              ref={ref}
              type={type && password ? "password" : type}
              name={name}
              className="w-full outline-transparent focus-visible:outline-none"
              id={id ?? name}
            />
          </p>
          {
            password && <button
              aria-label={show ? "Hide Password" : "Show Password"}
              type="button"
              onClick={() => setShow((c) => !c)}
              className="text-[hsla(0,_0%,_20%,_1)]"
            >
              {show ? <BsFillEyeSlashFill size={20} /> : <BsEyeFill size={20} />}
            </button>
          }
        </span>
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
