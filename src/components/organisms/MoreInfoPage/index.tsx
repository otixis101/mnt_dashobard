import React from "react";
import MoreInfoForm from "@/components/molecules/MoreInfo/MoreInfoForm";
import MoreInfoHeader from "@/components/molecules/MoreInfo/MoreInfoHeader";

const MoreInfoPage = () => (
  <section className="relative flex items-center justify-center px-4 md:min-h-[calc(100vh-100px)]">
    <div className="w-full space-y-5 max-md:py-10 max-md:pb-20 md:space-y-7">
      <MoreInfoHeader />
      <div className="mx-auto max-w-[90%] md:max-w-2xl">
        <MoreInfoForm />
      </div>
    </div>
  </section>
);

export default MoreInfoPage;
