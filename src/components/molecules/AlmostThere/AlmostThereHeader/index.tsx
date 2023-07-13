import React from "react";
import { BiArrowBack } from "react-icons/bi";

import AddMemberProgressBar from "../../AddMember/AddMemberProgressBar";

interface Props {
  level: number;
}
const AlmostThereHeader = ({ level }: Props) => (
  <div className="relative mx-2 flex justify-between">
    <BiArrowBack className="absolute right-0 top-0 hidden h-8 w-8 cursor-pointer sm:block md:-translate-x-10 lg:h-12 lg:w-14" />
    <div className="mx-auto flex w-full flex-col justify-center">
      <h3 className="max-w-[45ch] text-center text-xl font-medium capitalize text-gray-900 md:text-2xl">
        Almost there
      </h3>
      <div className="mx-auto mt-3 w-10/12">
        <AddMemberProgressBar level={level} />
      </div>
    </div>
  </div>
);

export default AlmostThereHeader;
