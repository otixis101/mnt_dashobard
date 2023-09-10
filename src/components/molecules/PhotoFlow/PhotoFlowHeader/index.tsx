import React from "react";

import { AiOutlinePlus } from "react-icons/ai";

import Button from "@/components/atoms/Button";
import BackArrow from "@/components/atoms/BackButton";

interface Props {
  onChange: (e?: any) => void;
}
const PhotoFlowHeader = ({ onChange }: Props) => (
  <header className="flex items-center justify-between">
    <Button className="w-[13rem] rounded-full" onClick={onChange}>
      <span>Add Photo</span>
      <AiOutlinePlus />
    </Button>
    <BackArrow />
  </header>
);

export default PhotoFlowHeader;
