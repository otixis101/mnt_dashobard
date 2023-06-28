import { cn } from "@/base/utils";
import * as Switch from "@radix-ui/react-switch";
import { ElementRef, forwardRef } from "react";

type Props = React.ComponentPropsWithoutRef<typeof Switch.Root> & {
  label: string;
  class?: string;
};

export const SwitchWrapper = forwardRef<ElementRef<typeof Switch.Root>, Props>(
  (props, ref) => {
    const { id, label, className, class: wrapperClass, ...rest } = props;

    return (
      <label
        className={cn("flex items-center gap-4", wrapperClass)}
        htmlFor={id ?? "switch-group"}
      >
        <span>{label}</span>
        <Switch.Root
          ref={ref}
          {...rest}
          id={id ?? "switch-group"}
          className={cn(
            "relative h-[28px] w-[65px] cursor-default rounded-full bg-[#979797] outline-none data-[state=checked]:bg-midpup",
            className
          )}
        />
      </label>
    );
  }
);

SwitchWrapper.displayName = "SwitchWrapper";

export const SwitchThumb = forwardRef<
  ElementRef<typeof Switch.Thumb>,
  Switch.SwitchThumbProps
>((props, ref) => (
  <Switch.Thumb
    {...props}
    className={cn(
      "block h-[21px] w-[21px] translate-x-0.5 rounded-full bg-white transition-transform duration-300 will-change-transform data-[state=checked]:translate-x-[40px] data-[state=checked]:bg-primary",
      props.className
    )}
    ref={ref}
  />
));

SwitchThumb.displayName = "SwitchThumb";
