import { AboutSectionHeading } from "@/components/atoms/About/Primitives";
import PriceCard from "@/components/molecules/PriceCard";
import { SwitchWrapper, SwitchThumb } from "@/components/molecules/Switch";
import React, { useState } from "react";

interface Props {
  onChange(checked: boolean): void;
  value: boolean;
}

const Switcher = ({ onChange, value }: Props) => (
  <div className="flex items-center justify-center gap-4 text-custom-black sm:text-xl">
    <SwitchWrapper onCheckedChange={onChange} checked={value} label="Price">
      <SwitchThumb />
    </SwitchWrapper>
    <div className="mt-1 flex flex-col sm:mt-2">
      <p>Pay yearly </p>
      <span className="text-xs text-primary">Save up to 20%</span>
    </div>
  </div>
);

const PricingSection = () => {
  const [checked, setChecked] = useState(false);

  return (
    <section id="pricing" className="container my-28 px-4">
      <div className="mx-auto w-full max-w-[840px]">
        <AboutSectionHeading className="mx-auto text-center" as="h1">
          Pricing
        </AboutSectionHeading>
        <p className="mx-auto mt-2 max-w-full px-0 text-center text-2xl text-gray-500 max-md:max-w-[30ch] md:mt-6">
          simple transparent pricing. start for free and upgrade to get more
          value.
        </p>

        <div className="mt-8 hidden sm:block">
          <Switcher value={checked} onChange={setChecked} />
        </div>
        <div className="mt-8 flex flex-col gap-7 sm:mt-14 sm:flex-row sm:items-center sm:justify-center">
          <PriceCard plan="free" />
          <div className="sm:hidden">
            <Switcher value={checked} onChange={setChecked} />
          </div>
          <PriceCard plan="premium" showYearPrice={checked} />
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
