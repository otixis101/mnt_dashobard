import React from "react";

// icons
import { RxCaretRight } from "react-icons/rx";

import BackArrow from "@/components/atoms/BackButton";

const Index = () => (
  <header className="my-3 space-y-4">
    <nav className="flex items-center justify-start gap-x-2">
      <BackArrow />
      <h3 className="flex items-center font-medium max-md:mb-10 md:text-xl">
        Dashboard
        <span>
          <RxCaretRight />
        </span>
        <span className="capitalize">your account</span>
      </h3>
    </nav>
  </header>
);

export default Index;
