/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

// icons
import { RxDotFilled } from "react-icons/rx";
import { GoShieldCheck } from "react-icons/go";
import { AiFillStar } from "react-icons/ai";

import User from "public/assets/user-1.png";
import Tree from "public/assets/tree-icon.png";

import { format } from "date-fns";
import Button from "@/components/atoms/Button";
import {
  cn,
  getAgeByDate,
  getRandomClass,
  getUserInitials,
} from "@/base/utils";
import useFetchPerson from "@/base/hooks/api/useFetchPersonData";
import useStore from "@/base/store";
import UserProfileAlbums from "../UserProfileAlbums";
import UserProfileEditPopup from "../UserProfileEditPopup";
import UserProfileSettingPopup from "../UserProfileSettingPopup";

type ModeOptions = "edit" | "settings";

const Index = () => {
  const [mode, setMode] = useState<ModeOptions>("edit");
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { data: session } = useSession();

  const { data, isLoading } = useFetchPerson(session?.user.personId ?? "");
  const { setUser } = useStore();

  const getFullName = () => {
    if (data?.firstName && data?.lastName) {
      return `${data?.firstName} ${data?.lastName}`;
    }
    return data?.firstName ?? data?.lastName ?? "";
  };

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

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
          imgSrc={data?.profilePhotoUrl ?? User}
          userProfile={data ?? {}}
          uploadAction={() => onChange("settings")}
          age={getAgeByDate(data?.dateOfBirth ?? "")}
        />
      )}

      {openModal && mode === "settings" && (
        <UserProfileSettingPopup
          mode={openModal}
          onChange={() => onChange()}
          personId={data?._id as string}
        />
      )}

      {isLoading && <>Loading...</>}
      {data && (
        <div className="flex w-full overflow-x-hidden md:w-[120%]">
          <div className="flex flex-col md:w-[60%] md:flex-row">
            <div className="flex flex-col items-center">
              <div className="relative h-52 w-48 !overflow-hidden rounded-xl md:h-64 md:w-60">
                {data?.profilePhotoUrl ? (
                  <Image
                    src={data.profilePhotoUrl ?? User}
                    fill
                    alt="user profile photo"
                    className="md:h-68 mx-auto md:w-[60rem]"
                  />
                ) : (
                  <div className="absolute bottom-0 flex items-center justify-center w-full h-full tracking-wider text-white uppercase bg-primary/40 text-8xl">
                    {getUserInitials(getFullName())}
                  </div>
                )}
              </div>
              <div className="flex items-center w-full my-4">
                <Button
                  intent="outline"
                  className="mr-1 md:mr-2"
                  onClick={() => onChange("edit")}
                >
                  Edit
                </Button>
                <Button href="/dashboard/account/settings" className="">
                  settings
                </Button>
              </div>
            </div>

            <div className="flex flex-col w-full p-10 bg-gray-100 rounded-lg md:mx-8">
              <div className="mb-2">
                <span className="flex ">
                  <h4 className="mr-2 text-[1.7rem] font-extrabold capitalize text-primary md:text-[2.2rem]">
                    {getFullName()}
                  </h4>
                  <div className="flex items-center text-gray-700">
                    <RxDotFilled className="text-xl text-black" />
                    <span className="text-black">Premium</span>
                    <AiFillStar className="text-yellow-500" />
                  </div>
                </span>
                <span className="block mb-2 text-lg font-medium text-gray-600 capitalize md:text-xl">
                  {data.stateOfOrigin} state, {data.countryOfOrigin}
                </span>
                <span className="text-lg font-medium text-gray-600 md:text-xl">
                  <span className="flex items-center">
                    {format(new Date(data.dateOfBirth), "PPP")} <RxDotFilled />
                    {getAgeByDate(data.dateOfBirth ?? "")} years
                  </span>
                </span>
              </div>
              <div className="mb-3">
                <h4 className="block mb-1 text-xl capitalize text-primary">
                  About
                </h4>
                <p className="text-lg leading-6 text-justify text-gray-600 break-normal whitespace-normal md:pr-24">
                  {data.about ?? "User has not added any information yet"}
                </p>
              </div>

              <div className="">
                <h4 className="block mb-3 text-xl capitalize text-primary">
                  Interesting facts
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {data.facts.length > 0 &&
                    data.facts.map((fact: string) => (
                      <span
                        className={cn("rounded-lg p-2", getRandomClass())}
                        key={fact}
                      >
                        {fact}
                      </span>
                    ))}
                </div>
              </div>

              <div className="w-full my-2 md:w-3/6">
                <h4 className="block mb-3 text-xl font-medium capitalize text-primary">
                  family history
                </h4>
                <div className="flex items-center p-4 rounded-xl bg-gray-50">
                  <div className="[&>span]:flex">
                    <span className="items-center mb-1 capitalize">
                      <RxDotFilled className="text-green-500" />
                      {data.isTreePrivate ? "Private" : "Public"} family tree
                    </span>
                    <span className="my-1 text-xl font-medium capitalize text-primary">
                      julian family tree
                    </span>
                    <span>people: 12</span>
                    <span>media: 450</span>
                  </div>
                  <div className="p-2 ml-auto rounded-full bg-primary">
                    <Image
                      src={Tree}
                      alt="tree logo"
                      className="h-[2rem] w-[2rem]"
                    />
                  </div>
                </div>

                <div className="flex items-center w-full p-4 my-2 rounded-xl bg-gray-50 md:w-3/6">
                  <GoShieldCheck className="mr-3 h-[2rem] w-[2rem]" />
                  <span className="flex flex-col">
                    <p className="text-sm font-medium md:text-xl">
                      Document vault
                    </p>
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
        </div>
      )}
    </>
  );
};

export default Index;
