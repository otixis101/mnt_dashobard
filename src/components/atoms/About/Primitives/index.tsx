import { cn } from "@/base/utils";

interface Props {
  children: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const headingClass =
  "max-w-[20ch] text-[30px] font-extrabold text-primary !leading-[1.12] md:text-4xl lg:text-5xl";

/** styled class:
 *  ```tsx
 * export const headingClass = "max-w-[20ch] text-[30px] font-extrabold text-primary !leading-[1.12] md:text-4xl lg:text-5xl";
 *  ```
 */
export const AboutSectionHeading = (props: Props) => {
  const { children, className, as: As = "h4" } = props;

  return <As className={cn(headingClass, className)}>{children}</As>;
};

export const textClass =
  "max-w-[25ch] text-lg md:text-[22px] lg:text-3xl font-medium";

/** styled class:
 *  ```tsx
 * export const textClass = "max-w-[25ch] text-lg md:text-[22px] lg:text-3xl font-medium";
 *  ```
 */
export const AboutSectionText = (props: Props) => {
  const { children, className, as: As = "p" } = props;

  return <As className={cn(textClass, className)}>{children}</As>;
};
