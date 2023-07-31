import React, { useState } from "react";
import Image from "next/image";
// icons
import { RxDotFilled } from "react-icons/rx";

import User from "public/assets/user-2.png";

import Button from "@/components/atoms/Button";
import useFetchPerson from "@/base/hooks/api/useFetchPersonData";
import { useRouter } from "next/router";
import { format } from "date-fns";
import FamilyMembers from "../FamilyMembers";
import TreeAlbums from "../TreeAlbums";
import TreePopup from "../TreePopup";

const TreeMemberBody = () => {
  const [mode, setMode] = useState<boolean>(false);
  const router = useRouter();
  const { personId } = router.query;

  const { data } = useFetchPerson(personId as string);

  console.log(data);

  const onChange = (_?: any) => setMode((prevState) => !prevState);

  return (
    <>
      {mode && <TreePopup mode={mode} onChange={onChange} imgSrc={User} />}

      {data && (
        <div className="flex flex-col items-center md:flex-row ">
          <div className="py-4 md:flex md:w-[60%]">
            <div className="flex flex-col items-center">
              <Image
                src={User}
                alt="user"
                className="md:h-68 mx-auto md:w-[60rem]"
              />
              <Button intent="outline" className="my-4" onClick={onChange}>
                Edit
              </Button>
            </div>
            <div className="mx-8 flex flex-col rounded-md bg-gray-100 p-4">
              <div className="mb-2">
                <span className="flex ">
                  <h4 className="mr-2 text-[1.7rem] font-extrabold capitalize text-primary md:text-[2.2rem]">
                    {`${data.firstName} ${data.lastName}`}
                  </h4>
                  <div className="flex items-center text-gray-700">
                    <RxDotFilled className="text-primary" />
                    spouse
                  </div>
                </span>
                <span className="mb-2 block text-lg font-medium capitalize text-gray-600 md:text-xl">
                  {data.stateOfOrigin} State, {data.countryOfOrigin}
                </span>
                <span className="text-lg font-medium text-gray-600 md:text-xl">
                  <span className="flex items-center">
                    {format(new Date(data.dateOfBirth), "MMM dd, yyyy")}
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
                  and compassionate medical doctor with a drive to make a
                  positive impact in the field of healthcare. At 27 years old, I
                  have had the privilege of achieving several notable milestones
                  throughout my career.
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
                  <span className="m-2 inline-block rounded-lg bg-[#877FB6] p-2">
                    spoke at tedx
                  </span>
                  <span className="m-2 inline-block rounded-lg bg-[#ACF6AA] p-2">
                    Graduated top from harvard
                  </span>
                  <span className="m-2 inline-block rounded-lg bg-[#F9D978] p-2">
                    Good citizen medal
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-1 items-center">
            <FamilyMembers />
            <TreeAlbums />
          </div>
        </div>
      )}
    </>
  );
};

export default TreeMemberBody;
