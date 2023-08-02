import React, { useState, useEffect } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";

import User from "public/assets/user-1.png";

// icons
import { AiFillStar } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";

import ToggleBtn from "@/components/atoms/ToggleBtn";

// for api
import { useSession } from "next-auth/react";
import useFetchPersonSetting from "@/base/hooks/api/useFetchPersonSetting";

const UserProfileBody = () => {
  const [mode, setMode] = useState<boolean>(false);

  const { data: session } = useSession();
  const { data } = useFetchPersonSetting(session?.user?.personId ?? "");

  const [treePrivate, setTreePrivate] = useState<boolean>(false);
  const [changePublicProfileSearch, setChangePublicProfileSearch] =
    useState<boolean>(false);

  const payload = {
    userSettingId: session?.user?.personId,
  };

  useEffect(() => {
    if (data?.isTreePrivate !== undefined) {
      setTreePrivate(data.isTreePrivate);
    }
    if (data?.showInPublicSearch) {
      setChangePublicProfileSearch(data.showInPublicSearch);
    }
  }, [data]);

  const updatePersonSettings = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/settings/${payload.userSettingId}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            showInPublicSearch: changePublicProfileSearch,
            isTreePrivate: treePrivate,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        }
      );
      if (response) {
        const dataUpdate = response;
        console.log(dataUpdate);
      }
    } catch (error) {
      console.error("Error updating person settings:", error);
    }
  };

  const onChangePrivateTree = () => {
    setTreePrivate((prevMode: boolean) => !prevMode);
    setMode(false);
  };
  const onChangePublicProfileSearch = () => {
    setChangePublicProfileSearch((prevMode: boolean) => !prevMode);
  };
  updatePersonSettings();

  return (
    <div className="mt-3.5 pb-[96px]">
      <div className="mb-[15px]">
        <Image src={User} alt="user" className="mx-auto h-56 w-56 lg:mx-0" />
      </div>
      <div className="flex w-full flex-shrink-0 flex-grow-0 flex-wrap rounded-lg bg-[#EEE] p-6 md:w-[56vw]">
        <div className="m-1 w-[50%] flex-shrink-0 flex-grow-0">
          <div className="mb-3 flex flex-col leading-6">
            <span className="flex items-center">
              <h5 className="mr-2 whitespace-nowrap text-[2rem] font-bold capitalize text-primary">
                {data?.firstName}
              </h5>
              <span className="flex items-center">
                <span role="img" className="mr-0.5 text-sm">
                  ⚫
                </span>
                <span className="text-black">{data?.membership}</span>
                <AiFillStar className="text-yellow-500" />
              </span>
            </span>
            <span className="text-gray-950">{data?.email}</span>
          </div>
          <div className="mb-3">
            <h3 className="mb-[13px] text-lg font-semibold capitalize text-primary lg:mb-[9px]">
              Privary settings
            </h3>
            <div className="w-[298px] rounded-2xl bg-[#fff] p-4 lg:w-[381px]">
              <ul>
                <li className="my-4">
                  <ToggleBtn
                    labelClass="mr-auto font-medium capitalize"
                    label="Make Family tree private"
                    onChangeState={onChangePrivateTree}
                    state={treePrivate}
                  />
                </li>
                <li className="my-4">
                  <ToggleBtn
                    labelClass="mr-auto font-medium capitalize"
                    label="get notified about new member"
                    // onChangeState={onChangeMode}
                    state={mode}
                  />
                </li>
                <li className="my-4">
                  <ToggleBtn
                    labelClass="mr-auto font-medium capitalize"
                    label="show profile in public search"
                    onChangeState={onChangePublicProfileSearch}
                    state={changePublicProfileSearch}
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
                <span className="mr-auto capitalize">
                  {data?.firstName} {data?.lastName}
                </span>
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
            <button
              onClick={() => signOut()}
              type="button"
              className="text-sm capitalize"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserProfileBody;
