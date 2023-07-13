import React from "react";

import FirstForm from "@/components/molecules/AlmostThere/AlmostThereForms/FirstForm";
import AlmostThereHeader from "@/components/molecules/AlmostThere/AlmostThereHeader";

const AlmostFirstPage = () => (
  <section className="container">
    <div className="w-full space-y-5 max-md:py-10 max-md:pb-20 md:space-y-7">
      <AlmostThereHeader level={2} />
      <div className="mx-auto max-w-[95%] md:max-w-2xl">
        <FirstForm />
      </div>
    </div>
  </section>
);

export default AlmostFirstPage;
