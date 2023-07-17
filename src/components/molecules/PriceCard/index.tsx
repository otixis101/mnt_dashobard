import { AboutSectionHeading } from "@/components/atoms/About/Primitives";
import Button from "@/components/atoms/Button";
import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { cn } from "@/base/utils";
import { GiRoundStar } from "react-icons/gi";
// eslint-disable-next-line import/no-cycle
import PLANS from "./data";

export interface PriceCardProps {
  plan: "free" | "premium";
  showYearPrice?: boolean;
}

const PriceCard = ({ plan, showYearPrice }: PriceCardProps) => (
  <div
    className={cn(
      "flex h-max flex-col items-center gap-10 rounded-lg p-6",
      plan === "premium" && "bg-custom-black text-white",
      plan === "free" && "bg-midpup"
    )}
  >
    {plan === "free" ? (
      <AboutSectionHeading as="h2" className="text-center text-4xl">
        Free
      </AboutSectionHeading>
    ) : (
      <div>
        <h2 className="text-center text-2xl font-semibold">Premium</h2>
        <div className="mt-2 flex items-center gap-2 text-midpup">
          <GiRoundStar className="text-3xl" />
          <span className="text-3xl font-semibold">
            {showYearPrice ? "$99/yr" : "$9.99/mo"}
          </span>
        </div>
        <div className="mt-2 h-5">
          {showYearPrice && (
            <div className="text-center text-sm font-bold text-midpup">
              $144 Billed Yearly
            </div>
          )}
        </div>
      </div>
    )}

    <div className="space-y-6">
      {PLANS[plan].map((feature) => (
        <div key={feature} className="flex items-center gap-3">
          <BsFillCheckCircleFill className="shrink-0 text-mnt-green" />
          <span>{feature}</span>
        </div>
      ))}
    </div>
    <Button className="text-white">Get started</Button>
  </div>
);

export default PriceCard;
