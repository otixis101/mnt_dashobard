/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

// icons
import { RxDotFilled } from "react-icons/rx";
import { GoShieldCheck } from "react-icons/go";
import { AiFillStar } from "react-icons/ai";

import User from "public/assets/user-1.png";
import Tree from "public/assets/tree-icon.png";

import Button from "@/components/atoms/Button";
import { cn } from "@/base/utils";
import UserProfileAlbums from "../UserProfileAlbums";
import UserProfileEditPopup from "../UserProfileEditPopup";
import UserProfileSettingPopup from "../UserProfileSettingPopup";

type ModeOptions = "edit" | "settings";

type UserObj = {
  [key: string]: any;
};

const Index = () => {
  const [mode, setMode] = useState<ModeOptions>("edit");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const router = useRouter();
  const { data: session } = useSession();
  const [userProfile, setUserProfile] = useState<UserObj>([]);

  const onChange = (modelOption?: ModeOptions) => {
    setOpenModal(true);
    setMode(modelOption as ModeOptions);
  };

  useEffect(() => {
    if (session) {
      const fetchUser = async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/person`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${session.user.accessToken}`,
            },
          }
        );

        if (res && res.ok) {
          const { data } = await res.json();
          setUserProfile(data);
        } else {
          router.push("/user/profile/update?step=moreinfo");
        }
      };

      fetchUser();
    }
    console.log(userProfile);
  }, [session?.user, mode]);

  const calculateAge = (dob: string) => {
    if (dob) {
      const today = new Date();
      const words = dob.split(" ");
      const remainingWords = words.slice(1).join(" ");

      const birthDate = new Date(remainingWords); // create a date object directly from `dob1` argument
      let age_now = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();

      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age_now -= age_now;
      }

      return age_now;
    }
    return 0;
  };

  const classes: string[] = ["bg-[#ACF6AA]", "bg-[#F9D978]", "bg-[#877FB6]"];

  function getRandomClass() {
    const randomIndex = Math.floor(Math.random() * classes.length);
    return classes[randomIndex];
  }

  return (
    <>
      {openModal && mode === "edit" && (
        <UserProfileEditPopup
          mode={openModal}
          onChange={() => onChange()}
          imgSrc={userProfile.profilePhotoUrl ?? User}
          userProfile={userProfile}
          uploadAction={() => onChange("settings")}
          age={calculateAge(userProfile?.dateOfBirth ?? 0)}
        />
      )}

      {openModal && mode === "settings" && (
        <UserProfileSettingPopup
          mode={openModal}
          onChange={() => onChange()}
          personId={userProfile._id as string}
        />
      )}
      <div className="flex w-full overflow-x-hidden md:w-[120%]">
        <div className="flex flex-col md:w-[60%] md:flex-row">
          <div className="flex flex-col items-center">
            <Image
              src={userProfile.profilePhotoUrl ?? User}
              alt="user"
              width="100"
              height="100"
              className="md:h-68 mx-auto md:w-[60rem]"
            />
            <div className="my-4 flex w-full items-center justify-center">
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
                  {userProfile.firstName} {userProfile.lastName}
                </h4>
                <div className="flex items-center text-gray-700">
                  <RxDotFilled className="text-xl text-black" />
                  <span className="text-black">spouse</span>
                  <AiFillStar className="text-yellow-500" />
                </div>
              </span>
              <span className="mb-2 block text-lg font-medium capitalize text-gray-600 md:text-xl">
                {userProfile.stateOfOrigin} state, {userProfile.countryOfOrigin}
              </span>
              <span className="text-lg font-medium text-gray-600 md:text-xl">
                <span className="flex items-center">
                  {userProfile.dateOfBirth} {/* 4th june 1980 */}
                  <RxDotFilled />
                  {calculateAge(userProfile.dateOfBirth ?? " ")} years
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
                {userProfile.facts?.map((fact: string) => (
                  <span
                    className={cn(
                      "m-2 mx-3 inline-block rounded-lg p-2",
                      getRandomClass()
                    )}
                    key={fact}
                  >
                    {fact}
                  </span>
                ))}
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
                    {userProfile.isTreePrivate ? "Private" : "Public"} family
                    tree
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
