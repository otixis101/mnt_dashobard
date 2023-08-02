import { cva, VariantProps } from "class-variance-authority";
import { IconType } from "react-icons";
import { FaPlus } from "react-icons/fa";
import { cn } from "@/base/utils";
import React from "react";
import ButtonOrLink, {
  Ref,
  type Props as ButtonOrLinkProps,
} from "./ButtonOrLink";

const buttonStyles = cva(
  /* using max-w so it can scale down if it needs more width */
  "flex items-center w-full max-w-[250px] md:h-14 justify-center p-4 rounded-lg font-medium text-sm md:text-lg md:max-w-[343px] gap-2",
  {
    variants: {
      intent: {
        primary:
          "bg-primary text-white disabled:shadow-[inset_999px_999px_0px_rgba(255,_255,_255,_0.2)] disabled:cursor-not-allowed disabled:isolate disabled:bg-pale-purple",
        outline:
          "border-primary border-2 text-primary disabled:border-pale-purple disabled:text-pale-purple",
        whiteOutline: "border-white border-2 text-white disabled:border-white",
        // gradientOutline: "disabled:cursor-not-allowed",
      },
      roundedFull: {
        true: "rounded-full",
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  }
);

type Props = ButtonOrLinkProps &
  VariantProps<typeof buttonStyles> & {
    loading?: boolean;
    showIcon?: boolean;
    icon?: IconType;
  };

const Button = React.forwardRef<Ref, Props>(
  (
    {
      intent,
      roundedFull,
      loading,
      children,
      className,
      icon: Icon,
      showIcon,
      ...props
    },
    ref
  ) => (
    <ButtonOrLink
      {...props}
      className={cn(buttonStyles({ intent, roundedFull, className }))}
      ref={ref}
    >
      {loading ? (
        <div role="status">
          <svg
            aria-hidden="true"
            className="mr-2 inline h-4 w-4 animate-spin fill-mnt-orange text-white"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading</span>
        </div>
      ) : (
        <>
          {children}
          {showIcon ? Icon ? <Icon size={15} /> : <FaPlus size={15} /> : null}
        </>
      )}
    </ButtonOrLink>
  )
);

Button.displayName = "Button";

export default Button;
