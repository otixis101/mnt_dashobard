/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

// icons
import { RxDotFilled } from "react-icons/rx";
import { GoShieldCheck } from "react-icons/go";
import { AiFillStar } from "react-icons/ai";

import User from "public/assets/user-1.png";
import TreeIcon from "public/assets/icon/tree-icon.png";

import { format } from "date-fns";
import Button from "@/components/atoms/Button";
import { cn, getAgeByDate, getRandomClass } from "@/base/utils";
import Avatar from "@/components/atoms/Avatar";
import useFetchPerson from "@/base/hooks/api/useFetchPersonData";
import useStore from "@/base/store";
import UserProfileAlbums from "../UserProfileAlbums";
import UserProfileEditPopup from "../UserProfileEditPopup";
import UserProfileSettingPopup from "../UserProfileSettingPopup";

type ModeOptions = "edit" | "settings";

const Index = () => {
  const [mode, setMode] = useState<ModeOptions>();
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
    setMode(modelOption);
  };

  return (
    <>
      {openModal && mode === "edit" && (
        <UserProfileEditPopup
          mode={openModal}
          onChange={() => onChange()}
          imgSrc={data?.profilePhotoUrl}
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
                  <Avatar name={getFullName()} />
                )}
              </div>
              <div className="my-4 flex w-full gap-2">
                <Button intent="outline" onClick={() => onChange("edit")}>
                  Edit
                </Button>
                <Button href="/account/settings">Settings</Button>
              </div>
            </div>

            <div className="flex w-full flex-col rounded-lg bg-gray-100 p-10 md:mx-8">
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
                <span className="mb-2 block text-lg font-medium capitalize text-gray-600 md:text-xl">
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
                <h4 className="mb-1 block text-xl capitalize text-primary">
                  About
                </h4>
                <p className="whitespace-normal break-normal text-justify text-lg leading-6 text-gray-600 md:pr-24">
                  {data.about ?? "User has not added any information yet"}
                </p>
              </div>

              <div className="">
                <h4 className="mb-3 block text-xl capitalize text-primary">
                  Interesting facts
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {data.facts.length > 0 &&
                    data.facts.map((fact: string) => (
                      <span
                        className={cn(
                          "rounded-lg p-2 capitalize",
                          getRandomClass()
                        )}
                        key={fact}
                      >
                        {fact}
                      </span>
                    ))}
                </div>
              </div>

              <div className="my-2 w-full pt-3 sm:max-w-xs">
                <h4 className="mb-3 block text-xl font-medium capitalize text-primary">
                  family history
                </h4>
                <div className="relative flex items-center rounded-xl bg-gray-50 p-4">
                  <div className="[&>span]:flex">
                    <span className="mb-1 items-center capitalize">
                      <RxDotFilled className="text-green-500" />
                      {data.isTreePrivate ? "Private" : "Public"} family tree
                    </span>
                    <span className="my-1 text-xl font-medium capitalize text-primary">
                      julian family tree
                    </span>
                    <span>people: 12</span>
                    <span>media: 450</span>
                  </div>
                  <Image
                    src={TreeIcon}
                    alt="tree logo"
                    className="absolute right-0 max-w-[50px] translate-x-1/2"
                  />
                </div>

                <div className="my-2 flex w-full items-center rounded-xl bg-gray-50 p-4 text-right">
                  <GoShieldCheck className="mr-3 h-[2rem] w-[2rem]" />
                  <span className="flex flex-col">
                    <p className="whitespace-nowrap text-sm font-medium md:text-xl">
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
