import React, { useState } from "react";
import Image from "next/image";

import User from "public/assets/user-1.png";

// icons
import { AiFillStar } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";

import ToggleBtn from "@/components/atoms/ToggleBtn";

const UserProfileBody = () => {
  const [mode, setMode] = useState<boolean>(false);

  const onChangeMode = () => setMode((prevMode) => !prevMode);

  return (
    <div className="">
      <div className="">
        <Image src={User} alt="user" className="h-56 w-56" />
      </div>
      <div className="my-3.5 flex w-[70%] flex-shrink-0 flex-grow-0 rounded-lg bg-[#EEE] p-6">
        <div className="m-1 w-[50%] flex-shrink-0 flex-grow-0">
          <div className="mb-3 flex flex-col leading-6">
            <span className="flex items-center">
              <h5 className="mr-2 text-[2rem] font-bold capitalize text-primary">
                Julian Miller
              </h5>
              <span className="flex items-center">
                <span role="img" className="mr-0.5 text-sm">
                  ⚫
                </span>
                <span className="text-black">premium</span>
                <AiFillStar className="text-yellow-500" />
              </span>
            </span>
            <span className="text-gray-950">julianMiller@gmail.com</span>
          </div>
          <div className="mb-3">
            <h3 className="text-lg font-semibold capitalize text-primary">
              Privary settings
            </h3>
            <div className="rounded-2xl bg-[#fff] p-4">
              <ul>
                <li className="my-4">
                  <ToggleBtn
                    labelClass="mr-auto font-medium capitalize"
                    label="Make Family tree private"
                    onChangeState={onChangeMode}
                    state={mode}
                  />
                </li>
                <li className="my-4">
                  <ToggleBtn
                    labelClass="mr-auto font-medium capitalize"
                    label="get notified about new member"
                    onChangeState={onChangeMode}
                    state={mode}
                  />
                </li>
                <li className="my-4">
                  <ToggleBtn
                    labelClass="mr-auto font-medium capitalize"
                    label="show profile in public search"
                    onChangeState={onChangeMode}
                    state={mode}
                  />
                </li>
              </ul>
            </div>
          </div>
          <span className="mb-2 block text-lg font-medium text-primary">
            Change Password
          </span>
          <span className="mb-2 block text-lg font-medium text-primary">
            Manage Subscription
          </span>
          <h5 className="mb-2 block text-black">
            Premium Membership: USD $10/mo
          </h5>
          <h5 className="capitalize text-black">
            renewed:{" "}
            <span className="text-lg font-medium text-primary">
              April 10,2023
            </span>
          </h5>
        </div>
        <div className="m-1 flex-1">
          <h4 className="mb-2 font-semibold text-black">Billed with:</h4>
          <div className="relative m-2 flex items-center overflow-hidden rounded-3xl bg-[#5724EB] py-10 text-[#FFFFFF] before:absolute before:bottom-[-7rem] before:right-[-6rem] before:h-[10rem] before:w-[10rem] before:rounded-full before:bg-[#EAE5FB] before:content-[''] ">
            <div className="flex w-[70%] flex-col p-4">
              <span className="mb-6 capitalize">Card details</span>
              <span className="mb-4">
                <span className="mr-3">Mastercard</span>
                <span>**** 6756</span>
              </span>
              <span className="mb-2 flex">
                <span className="mr-auto capitalize">jane miller</span>
                <span>12/26</span>
              </span>
            </div>
            <div className="mx-auto h-[4rem] w-[4rem] rounded-xl bg-[#EAE5FB]" />
          </div>
          <h4 className="my-2 text-lg font-medium capitalize text-[#5724EB]">
            update payment method
          </h4>
          <span className="my-1 mb-3 block text-sm capitalize text-black">
            Cancel subscription
          </span>
          <div className="flex cursor-pointer items-center text-black">
            <span>
              <FiLogOut className="mr-2 text-lg" />
            </span>
            <span className="text-sm capitalize">Log out</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserProfileBody;
