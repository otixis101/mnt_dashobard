import { AboutSectionHeading } from "@/components/atoms/About/Primitives";
import PriceCard from "@/components/molecules/PriceCard";
import React from "react";

const PricingSection = () => (
  <section className="container my-40 max-sm:px-4">
    <div className="mx-auto w-full md:w-4/6">
      <AboutSectionHeading className="mx-auto text-center" as="h1">
        Pricing
      </AboutSectionHeading>
      <p className="mx-auto mt-2 max-w-full px-0 text-center text-2xl text-gray-500 md:mt-6">
        simple transparent pricing. start for free and upgrade to get more
        value.
      </p>

      <div className="mt-8 flex flex-col gap-10 md:mt-20 md:flex-row md:items-center md:justify-center">
        <PriceCard plan="free" />
        <PriceCard plan="premium" />
      </div>
    </div>
  </section>
);

export default PricingSection;
