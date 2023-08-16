import React from "react";

import { BiArrowBack } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";

interface Props {
  onChange: (e?: any) => void;
}
const PhotoFlowHeader = ({ onChange }: Props) => (
  <header className="flex items-center justify-between">
    <form className="mr-auto flex  w-[35%] items-center md:flex">
      <Input label="" parentClass="w-[90%]" />
      <Button className="ml-[-10.2rem] mt-2 w-[10rem] md:h-12">Search</Button>
    </form>

    <Button className="w-[13rem] rounded-full" onClick={onChange}>
      <span>Add Photo</span>
      <AiOutlinePlus />
    </Button>

    <span className="ml-8">
      <BiArrowBack className="h-8 w-12 cursor-pointer md:h-12 md:w-14" />
    </span>
  </header>
);

export default PhotoFlowHeader;
