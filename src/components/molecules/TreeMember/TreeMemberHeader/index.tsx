import React from "react";

// icons
import { RxCaretRight } from "react-icons/rx";
import BackArrow from "@/components/atoms/BackButton";

const TreeMemberHeader = () => (
  <header className="">
    <nav className="flex items-center justify-between">
      <h3 className="flex items-center text-xl font-bold">
        Dashboard
        <span>
          <RxCaretRight />
        </span>
        <span className="capitalize">Tree member</span>
      </h3>
      <BackArrow />
    </nav>
  </header>
);

export default TreeMemberHeader;
