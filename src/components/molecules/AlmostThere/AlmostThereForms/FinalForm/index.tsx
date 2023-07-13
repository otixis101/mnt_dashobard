import React from "react";

import Image from "next/image";
import Button from "@/components/atoms/Button";

import User from "public/assets/user-profile.svg";
import { RxDotFilled } from "react-icons/rx";

const FinalForm = () => (
  <form>
    <h4 className="mb-4 max-w-[45ch] text-left text-lg font-medium capitalize text-gray-900 md:text-xl">
      Add a profile image and about
    </h4>
    <div className="flex flex-col">
      <div className="flex">
        <div className="m-2 flex h-36 flex-col rounded-xl bg-[#D9D9D9] p-2 md:h-60 md:p-6">
          <Image
            src={User}
            alt="user"
            className="mx-auto h-20 w-[10rem] md:h-28"
          />
          <Button
            intent="outline"
            className="gap-0 border-black p-1 capitalize text-black md:my-4 md:gap-1 md:p-2"
          >
            Upload
          </Button>
        </div>
        <div className="mx-4">
          <div className="mb-4">
            <span className="flex ">
              <h4 className="text-[1.7rem] font-extrabold capitalize text-primary md:text-[2.2rem]">
                Jude okeke
              </h4>
            </span>
            <span className="mb-2 block text-lg font-medium capitalize text-gray-600 md:text-xl">
              Abia state, Nigeria
            </span>
            <span className="font-medium text-gray-600 md:text-lg md:text-xl">
              <span className="flex items-center">
                4th june 1980
                <RxDotFilled />
                42 years
              </span>
            </span>
          </div>
          <div className="hidden flex-col md:flex">
            <label
              className="mb-2 text-lg capitalize text-primary"
              htmlFor="textarea"
            >
              say something about jude
            </label>
            <textarea
              className="w-[26rem] rounded-xl border-2 border-primary p-6"
              id="textarea"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:hidden">
        <label
          className="mb-2 text-lg capitalize text-primary"
          htmlFor="textarea"
        >
          say something about jude
        </label>
        <textarea
          className="rounded-xl border-2 border-primary p-6 md:w-[26rem]"
          id="textarea"
        />
      </div>
    </div>
    <Button className="mx-auto mt-8 md:mt-16" type="submit">
      Finish
    </Button>
  </form>
);

export default FinalForm;
