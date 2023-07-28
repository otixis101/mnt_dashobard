import React from "react";
import { BiArrowBack } from "react-icons/bi";
import ProgressIndicator from "@/components/atoms/ProgressIndicator";

interface Props {
  name: string;
}
const AddMemberHeader = ({ name }: Props) => (
  <div className="relative mx-2 flex justify-between">
    <BiArrowBack className="absolute right-0 top-0 hidden h-8 w-8 cursor-pointer sm:block md:-translate-x-10 lg:h-12 lg:w-14" />
    <div className="mx-auto w-full">
      <h3 className="max-w-[45ch] text-center text-xl font-medium text-gray-900 md:text-2xl">
        Add a {name} to family tree
      </h3>
      <div className="-full mx-auto mt-10 max-w-2xl">
        <ProgressIndicator currentStep={1} steps={3} />
      </div>
    </div>
  </div>
);

export default AddMemberHeader;
