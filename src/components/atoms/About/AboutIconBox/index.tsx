import { cn } from "@/base/utils";
import Image from "next/image";

interface Props {
  icon: string;
  text: string;
  variant?: "white" | "gray";
  className?: string;
}

const AboutIconBox = (props: Props) => {
  const { icon, text, variant = "gray", className } = props;

  return (
    <div
      className={cn(
        "flex min-h-[80px] max-w-[405px] items-center gap-2 rounded-2xl bg-[hsla(0,_0%,_90%,_1)] px-3 py-3 lg:min-h-[130px] lg:gap-4 lg:rounded-3xl lg:px-5 lg:py-7",
        variant === "white" &&
          "bg-white shadow-[0px_0px_12px_2px_rgba(0,_0,_0,_0.25)]",
        className
      )}
    >
      <Image
        className="h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20"
        src={icon}
        alt={text}
      />
      <p className="max-w-[18ch] text-base font-medium text-black md:text-lg lg:text-2xl">
        {text}
      </p>
    </div>
  );
};

export default AboutIconBox;
