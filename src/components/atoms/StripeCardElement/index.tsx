import { cn } from "@/base/utils";
import { CardElement } from "@stripe/react-stripe-js";
import { StripeCardElementChangeEvent } from "@stripe/stripe-js";
import { useState } from "react";

interface Props {
  label: string;
  /** class for the input */
  className?: string;
  /** class for the wrapper */
  class?: string;
  required?: string;
  labelClass?: string;
  hintClass?: string;
  id?: string;
  onChange(complete: boolean): void;
}

const StripeCardElement = (props: Props) => {
  const {
    className,
    label,
    required,
    class: wrapperClass,
    labelClass,
    hintClass,
    id,
    onChange,
  } = props;

  const [focusWithin, setFocusWithin] = useState(false);

  const [hint, setHint] = useState<string>();

  const onChangeHandler = (e: StripeCardElementChangeEvent) => {
    if (e.error) {
      setHint(e.error.message);
    } else {
      setHint(undefined);
    }

    onChange(e.complete);
  };

  return (
    <div className={cn("w-full space-y-2", wrapperClass)}>
      <div
        className={cn("grid grid-cols-1 gap-2 text-sm text-black", labelClass)}
      >
        <p className="flex content-center items-center gap-1 align-middle font-medium">
          {label}{" "}
          {required && (
            <span className="flex content-center text-red-500">*</span>
          )}
        </p>
        <div
          className={cn(
            "rounded-lg border-2 p-4 py-3 outline-none placeholder:text-pale-black sm:py-4",
            !focusWithin ? "border-black" : "border-primary",
            hint && "border-danger-1",
            className
          )}
        >
          <CardElement
            onFocus={() => setFocusWithin(true)}
            onBlur={() => setFocusWithin(false)}
            onChange={(e) => onChangeHandler(e)}
            id={id}
            options={{}}
          />
        </div>
      </div>
      <div
        className={cn(
          "flex items-start gap-1 text-sm text-pale-black transition-all duration-300",
          "overflow-hidden text-danger-1 opacity-0",
          !hint ? "max-h-0" : "max-h-52 opacity-100",
          hintClass
        )}
      >
        {hint}
      </div>
    </div>
  );
};

export default StripeCardElement;
