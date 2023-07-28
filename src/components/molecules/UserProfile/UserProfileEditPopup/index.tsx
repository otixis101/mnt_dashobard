/* eslint-disable react/button-has-type */
import React, { useState } from "react";
import Popup from "@/components/atoms/Popup";
import Image, { StaticImageData } from "next/image";

import { IoMdClose } from "react-icons/io";
import Button from "@/components/atoms/Button";
import { RxDotFilled } from "react-icons/rx";
import Input from "@/components/atoms/Input";

interface Props {
  mode: boolean;
  onChange: (e?: boolean) => void;
  imgSrc: string | StaticImageData;
  uploadAction: () => void;
}

const data = [
  { id: "1", name: "Has a twin" },
  { id: "2", name: "Graduated Top of the Class" },
  { id: "3", name: "Forbes 30 under 30" },
];

const UserProfileEditPopup = ({
  mode,
  onChange,
  imgSrc,
  uploadAction,
}: Props) => {
  const [interests, setinterests] = useState(data);

  const onFilter = (id: string) => {
    const newInterests = interests.filter((interest) => interest.id !== id);
    setinterests(newInterests);
  };

  return (
    <Popup open={mode} onChangeState={onChange}>
      <div className="flex flex-col md:flex-row">
        <div className="flex py-4 md:w-[30%]">
          <div className="flex flex-col items-center">
            <Image
              src={imgSrc}
              alt="user"
              className="h-36 w-32 md:h-48 md:w-48"
            />
            <Button intent="outline" className="my-4" onClick={uploadAction}>
              upload
            </Button>
          </div>
          <div className="m-2 block md:hidden">
            <span className="flex flex-col">
              <h4 className="mr-2 text-[1.1rem] font-extrabold capitalize text-primary md:text-[2.2rem]">
                Jude okeke
              </h4>
              <div className="flex items-center text-gray-700">
                <RxDotFilled className="text-primary" />
                spouse
              </div>
            </span>
            <span className="mb-2 block text-sm font-medium capitalize text-gray-600 md:text-xl">
              Abia state, Nigeria
            </span>
            <span className="text-[.8rem] font-medium text-gray-600 md:text-xl">
              <span className="flex items-center">
                4th june 1980
                <RxDotFilled />
                42 years
              </span>
            </span>
          </div>
        </div>
        <div className="flex flex-1 flex-col rounded-md p-4 md:mx-2">
          <div className="mb-2 hidden md:block">
            <span className="flex ">
              <h4 className="mr-2 text-[1.7rem] font-extrabold capitalize text-primary md:text-[2.2rem]">
                Jude okeke
              </h4>
              <div className="flex items-center text-gray-700">
                <RxDotFilled className="text-primary" />
                spouse
              </div>
            </span>
            <span className="mb-2 block text-lg font-medium capitalize text-gray-600 md:text-xl">
              Abia state, Nigeria
            </span>
            <span className="text-lg font-medium text-gray-600 md:text-xl">
              <span className="flex items-center">
                4th june 1980
                <RxDotFilled />
                42 years
              </span>
            </span>
          </div>
          <div className="mb-3">
            <h4 className="block text-xl capitalize text-primary md:mb-1">
              About
            </h4>
            <p className="whitespace-normal break-normal rounded-xl border border-primary p-3 text-justify text-lg leading-6 text-gray-600">
              Welcome to my profile! I&apos;m Dr. Julian Miller, a dedicated and
              compassionate medical doctor with a drive to make a positive
              impact in the field of healthcare. At 27 years old, I have had the
              privilege of achieving several notable milestones throughout my
              career.
            </p>
          </div>
          <form>
            <Input
              className="w-full"
              label="add Interesting facts"
              labelClass="mb-3 block text-xl capitalize text-primary"
            />
            <h4 className="mb-3 block text-xl capitalize text-primary">
              Interesting facts
            </h4>
            <div className="">
              {interests.map((interest) => (
                <span key={interest.id} className="flex items-center">
                  <span className="m-2 mx-1 inline-block rounded-lg bg-[#877FB6] p-2">
                    {interest.name}
                  </span>
                  <button onClick={() => onFilter(interest.id)}>
                    <IoMdClose />
                  </button>
                </span>
              ))}
            </div>
            <Button className="mb-2 rounded-md">Save</Button>
          </form>
        </div>
      </div>
    </Popup>
  );
};

export default UserProfileEditPopup;
