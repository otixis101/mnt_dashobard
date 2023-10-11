import Button from "@/components/atoms/Button";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

const UploadButton = () => (
  <Button className="w-auto px-3 text-sm  flex justify-center ">

    <AiOutlinePlus /> Upload File
  </Button>

);

export default UploadButton;
