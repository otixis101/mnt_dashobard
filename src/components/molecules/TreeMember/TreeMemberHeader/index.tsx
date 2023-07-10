import React from "react";

// icons
import { RxCaretRight } from "react-icons/rx";
import { BiArrowBack } from "react-icons/bi";

import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";

const TreeMemberHeader = () => (
  <header className="">
    <form className="mx-auto flex hidden w-[70%] items-center md:flex">
      <Input label="" parentClass="w-[90%]" />
      <Button className="ml-[-10.2rem] mt-2 w-[10rem] md:h-12">Search</Button>
    </form>
    <nav className="flex items-center justify-between">
      <h3 className="flex items-center text-xl font-bold">
        Dash board
        <span>
          <RxCaretRight />
        </span>
        <span className="capitalize">Tree member</span>
      </h3>
      <span>
        <BiArrowBack className="h-8 w-12 cursor-pointer md:h-12 md:w-14" />
      </span>
    </nav>
  </header>
);

export default TreeMemberHeader;
