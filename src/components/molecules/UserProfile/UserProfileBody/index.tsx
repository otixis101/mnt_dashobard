import React, { useState } from "react";
import Image from "next/image";
// icons
import { RxDotFilled } from "react-icons/rx";
import { GoShieldCheck } from "react-icons/go";
import { AiFillStar } from "react-icons/ai";

import User from "public/assets/user-1.png";
import Tree from "public/assets/tree-icon.png";

import Button from "@/components/atoms/Button";
import UserProfileAlbums from "../UserProfileAlbums";
import UserProfileEditPopup from "../UserProfileEditPopup";
import UserProfileSettingPopup from "../UserProfileSettingPopup";

type ModeOptions = "edit" | "settings";

const Index = () => {
  const [mode, setMode] = useState<ModeOptions>("edit");
  const [openModal, setOpenModal] = useState<boolean>(false);

  const onChange = (modelOption?: ModeOptions) => {
    setOpenModal(true);
    setMode(modelOption as ModeOptions);
  };

  return (
    <>
      {openModal && mode === "edit" && (
        <UserProfileEditPopup
          mode={openModal}
          onChange={() => onChange()}
          imgSrc={User}
          uploadAction={() => onChange("settings")}
        />
      )}

      {openModal && mode === "settings" && (
        <UserProfileSettingPopup mode={openModal} onChange={() => onChange()} />
      )}
      <div className="flex w-full overflow-x-hidden md:w-[120%]">
        <div className="flex flex-col md:w-[60%] md:flex-row">
          <div className="flex flex-col items-center">
            <Image
              src={User}
              alt="user"
              className="md:h-68 mx-auto md:w-[60rem]"
            />
            <div className="my-4 flex w-full items-center">
              <Button
                intent="outline"
                className="mr-1 md:mr-2"
                onClick={() => onChange("edit")}
              >
                Edit
              </Button>
              <Button className="">settings</Button>
            </div>
          </div>

          <div className="flex flex-col rounded-md bg-gray-100 p-4 md:mx-8">
            <div className="mb-2">
              <span className="flex ">
                <h4 className="mr-2 text-[1.7rem] font-extrabold capitalize text-primary md:text-[2.2rem]">
                  Julian miller
                </h4>
                <div className="flex items-center text-gray-700">
                  <RxDotFilled className="text-xl text-black" />
                  <span className="text-black">spouse</span>
                  <AiFillStar className="text-yellow-500" />
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
              <h4 className="mb-1 block text-xl capitalize text-primary">
                About
              </h4>
              <p className="whitespace-normal break-normal text-justify text-lg leading-6 text-gray-600">
                Welcome to my profile! I&apos;m Dr. Julian Miller, a dedicated
                and compassionate medical doctor with a drive to make a positive
                impact in the field of healthcare. At 27 years old, I have had
                the privilege of achieving several notable milestones throughout
                my career.
              </p>
            </div>
            <div className="">
              <h4 className="mb-3 block text-xl capitalize text-primary">
                Interesting facts
              </h4>
              <div className="">
                <span className="m-2 mx-3 inline-block rounded-lg bg-[#877FB6] p-2">
                  Has a twin
                </span>
                <span className="m-2 mx-3 inline-block rounded-lg bg-[#F9D978] p-2">
                  Graduated top of her class
                </span>
                <span className="m-2 inline-block rounded-lg bg-[#ACF6AA] p-2">
                  Forbes 30 under 30
                </span>
                <span className="m-2 inline-block rounded-lg bg-[#F9D978] p-2">
                  Good citizen medal
                </span>
              </div>
            </div>

            <div className="my-2 w-full md:w-3/6">
              <h4 className="mb-3 block text-xl font-medium capitalize text-primary">
                family history
              </h4>
              <div className="flex items-center rounded-xl bg-gray-50 p-4">
                <div className="[&>span]:flex">
                  <span className="mb-1 items-center capitalize">
                    <RxDotFilled className="text-green-500" />
                    public family tree
                  </span>
                  <span className="my-1 text-xl font-medium capitalize text-primary">
                    julian family tree
                  </span>
                  <span>people: 12</span>
                  <span>media: 450</span>
                </div>
                <div className="ml-auto rounded-full bg-primary p-2">
                  <Image
                    src={Tree}
                    alt="tree logo"
                    className="h-[2rem] w-[2rem]"
                  />
                </div>
              </div>
            </div>

            <div className="my-2 flex w-full items-center rounded-xl bg-gray-50 p-4 md:w-3/6">
              <GoShieldCheck className="mr-3 h-[2rem] w-[2rem]" />
              <span className="flex flex-col">
                <p className="text-sm font-medium md:text-xl">Document vault</p>
                <span className="flex items-center">
                  <RxDotFilled className="leading-none text-gray-500" />
                  coming soon
                </span>
              </span>
            </div>
          </div>
        </div>

        <UserProfileAlbums />
      </div>
    </>
  );
};

export default Index;
