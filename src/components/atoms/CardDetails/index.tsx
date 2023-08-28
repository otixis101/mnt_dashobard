import { cn } from "@/base/utils";
import type { ReactNode } from "react";

type StringOrReactNode = string | ReactNode;

interface Props {
  cardName: StringOrReactNode;
  cardLastNumber?: StringOrReactNode;
}

const CardDetails = ({ cardLastNumber, cardName }: Props) => (
  <div
    className={cn(
      "relative flex items-center overflow-hidden rounded-2xl bg-primary px-4 py-5 text-[#FFFFFF] md:rounded-3xl",
      "before:absolute before:inset-0 before:-bottom-3 before:bg-cover before:bg-bottom",
      "before:bg-[url('/assets/atm-spirals.png')]"
    )}
  >
    <div className="z-[1] space-y-4 p-3 md:space-y-8">
      <h5 className="text-sm font-medium capitalize">Card details</h5>
      <p className="flex items-center gap-2 tracking-wide">
        {[0, 1, 2].map((n) => (
          <span className="mt-1" key={n}>
            ****{" "}
          </span>
        ))}
        {cardLastNumber}
      </p>
      <div className="translate-y-3 text-lg capitalize">
        <div className="-mt-2">{cardName}</div>
      </div>
    </div>
    <div className="z-[1] ml-auto h-12 w-12 -translate-x-3 -translate-y-3 rounded-lg bg-[#ABA1E4] md:h-16 md:w-16" />
    <div
      style={{ backgroundImage: `` }}
      className="absolute inset-0 hidden bg-cover bg-bottom"
    />
  </div>
);

export default CardDetails;
