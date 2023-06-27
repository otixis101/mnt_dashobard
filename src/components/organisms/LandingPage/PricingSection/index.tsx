import { AboutSectionHeading } from "@/components/atoms/About/Primitives";
import PriceCard from "@/components/molecules/PriceCard";
import React from "react";

const PricingSection = () => (
  <section className="container my-28 px-4">
    <div className="mx-auto w-full max-w-[840px]">
      <AboutSectionHeading className="mx-auto text-center" as="h1">
        Pricing
      </AboutSectionHeading>
      <p className="mx-auto mt-2 max-w-full px-0 text-center text-2xl text-gray-500 max-md:max-w-[30ch] md:mt-6">
        simple transparent pricing. start for free and upgrade to get more
        value.
      </p>

      <div className="mt-8 flex flex-col gap-7 sm:mt-20 sm:flex-row sm:items-center sm:justify-center">
        <PriceCard plan="free" />
        <PriceCard plan="premium" />
      </div>
    </div>
  </section>
);

export default PricingSection;
