import React from "react";
import { BiArrowBack } from "react-icons/bi";
import MoreInfoProgressBar from "../MoreInfoProgressBar";

const MoreInfoHeader = () => (
  <div className="relative mx-2 flex justify-between">
    <BiArrowBack className="absolute right-0 top-0 hidden h-8 w-8 cursor-pointer sm:block md:-translate-x-10 lg:h-12 lg:w-14" />
    <div className="mx-auto flex flex-col items-center justify-center">
      <h3 className="max-w-[45ch] text-center text-xl font-medium text-gray-900 md:text-2xl">
        Welcome, we need some more information about you
      </h3>
      <div className="mx-auto w-10/12">
        <MoreInfoProgressBar progress="half" />
      </div>
    </div>
  </div>
);

export default MoreInfoHeader;
