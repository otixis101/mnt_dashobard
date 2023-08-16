import React, { useState } from "react";
import Image from "next/image";
// icons
import { RxDotFilled } from "react-icons/rx";

import User from "public/assets/user-2.png";

// import Button from "@/components/atoms/Button";
import useFetchPerson from "@/base/hooks/api/useFetchPersonData";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { cn, getRandomClass } from "@/base/utils";
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
      {mode && (
        <TreePopup
          mode={mode}
          onChange={onChange}
          imgSrc={data?.profilePhotoUrl ?? User}
        />
      )}

      {data && (
        <div className="flex flex-col items-center md:flex-row ">
          <div className="py-4 md:flex md:w-[60%]">
            <div className="flex flex-col items-center">
              <div className="relative h-52 w-48 overflow-hidden rounded-lg md:h-64 md:w-60">
                <Image
                  src={data.profilePhotoUrl ?? User}
                  fill
                  alt="user profile photo"
                  className="md:h-68 mx-auto md:w-[60rem]"
                />
              </div>
              {/* <Button intent="outline" className="my-4" onClick={onChange}>
                Edit
              </Button> */}
            </div>
            <div className="flex w-full flex-col rounded-lg bg-gray-100 p-10 md:mx-8">
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
                  {data.about ?? ""}
                </p>
              </div>
              <div className="">
                <h4 className="mb-3 block text-xl capitalize text-primary">
                  Interesting facts
                </h4>
                <div className="flex flex-wrap gap-1">
                  {data.facts &&
                    data.facts.length > 0 &&
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
