import Button from "@/components/atoms/Button";
import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { cn } from "@/base/utils";
import PLANS from "../PriceCard/data";

interface Props {
  price: string | number;
  duration: string;
  onClick(): void;
}

const SubscriptionDetailsCard = ({ price, duration, onClick }: Props) => (
  <div
    className={cn(
      "flex flex-col items-center gap-10 rounded-lg bg-custom-black p-6 text-white"
    )}
  >
    <div className="w-full">
      <div className="mx-auto mt-2 w-fit gap-2 text-center text-midpup">
        <span className="text-3xl font-semibold">${price}</span>
      </div>
      <div className="mt-2 h-5">
        <div className="text-center text-sm font-bold text-midpup">
          Billed per {duration}
        </div>
      </div>
    </div>

    <div className="space-y-6">
      {PLANS.premium.map((feature) => (
        <div key={feature} className="flex items-center gap-3">
          <BsFillCheckCircleFill className="shrink-0 text-mnt-green" />
          <span>{feature}</span>
        </div>
      ))}
    </div>
    <Button className="text-white" onClick={onClick}>
      Get started
    </Button>
  </div>
);

export default SubscriptionDetailsCard;
