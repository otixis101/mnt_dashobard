/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
import React, { useState } from "react";
import Popup from "@/components/atoms/Popup";
import { toast } from "react-toastify";
import Image, { StaticImageData } from "next/image";

import { IoMdClose } from "react-icons/io";
import Button from "@/components/atoms/Button";
import { RxDotFilled } from "react-icons/rx";
import Input from "@/components/atoms/Input";
import { useSession } from "next-auth/react";

interface Props {
  mode: boolean;
  onChange: (e?: boolean) => void;
  imgSrc: string | StaticImageData;
  uploadAction: () => void;
  age: number;
  userProfile: {
    [key: string]: any;
  };
}

type SampleData = { id: string; name: string };

const UserProfileEditPopup = ({
  mode,
  onChange,
  imgSrc,
  uploadAction,
  userProfile,
  age,
}: Props) => {
  const [interests, setInterests] = useState<SampleData[]>(
    userProfile.facts?.map((int: string, i: number) => ({
      id: i.toString(),
      name: int,
    }))
  );

  const [isLoading, setIsLoading] = useState(false);
  const [interest, setInterest] = useState("");
  const [about, setAbout] = useState("");

  const { data: session } = useSession();

  const onFilter = (id: string) => {
    const newInterests = interests.filter((facts) => facts.id !== id);
    setInterests(newInterests);
  };

  // const handleFactsUpload = async (facts: string[]) => {
  //   const formData = new FormData();
  //   console.log(facts, ": facts handles");
  //   // Append each item from the 'facts' array to the FormData
  //   facts.forEach((fact) => {
  //     formData.append(`facts`, fact);
  //   });

  //   setIsLoading(true);
  //   const customRequest = {
  //     method: "PATCH",
  //     headers: {
  //       authorization: `Bearer ${session?.user.accessToken}`,
  //     },
  //     body: formData,
  //   };

  //   try {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_BASE_URL}/person/${userProfile?._id}`,
  //       customRequest
  //     );

  //     if (res && res.ok) {
  //       const data = await res.json();
  //       console.log(data);
  //       toast.success("Profile Facts Updated successful");
  //     }
  //   } catch (err) {
  //     toast.error("Something went wrong");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  /**
   * the updating of interest state is asynchronous
   * i don't get the recent changes after the state has been updated
   * thats what this useEffect will fix
   * @todo refactor the code by removing this useEffect
   */

  const handleUpdateInfo = async (event: any) => {
    event.preventDefault();
    if (!interest && !about) {
      toast.error("Please fill in the form fields");
      return;
    }

    if (interest) {
      const newInterests = {
        id: String(Math.round(Math.random() * 10000)),
        name: interest,
      };
      setInterests((prev) => [...prev, newInterests]);
      // eslint-disable-next-line no-useless-return
      setInterest("");
      return;
    }
    setIsLoading(true);

    const facts = interests.map((fact) => fact.name);
    try {
      const updatePayload = {
        about,
        facts,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/person/${userProfile?._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session?.user.accessToken}`,
          },
          body: JSON.stringify(updatePayload),
        }
      );

      if (res && res.ok) {
        const data = await res.json();
        console.log(data);
        toast.success("Profile Updated successful");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Popup open={mode} onChangeState={onChange}>
      <div className="flex flex-col md:flex-row">
        <div className="flex py-4 md:w-[30%]">
          <div className="flex flex-col items-center">
            <Image
              src={imgSrc}
              alt="user"
              width="100"
              height="100"
              className="h-36 w-32 rounded-lg md:h-52 md:w-48"
            />
            <Button intent="outline" className="my-4" onClick={uploadAction}>
              upload
            </Button>
          </div>
          <div className="m-2 block md:hidden">
            <span className="flex flex-col">
              <h4 className="mr-2 text-[1.1rem] font-extrabold capitalize text-primary md:text-[2.2rem]">
                {userProfile.firstName} {userProfile.lastName}
              </h4>
              <div className="flex items-center text-gray-700">
                <RxDotFilled className="text-primary" />
                spouse
              </div>
            </span>
            <span className="mb-2 block text-sm font-medium capitalize text-gray-600 md:text-xl">
              {userProfile.stateOfOrigin} state, {userProfile.countryOfOrigin}
            </span>
            <span className="text-[.8rem] font-medium text-gray-600 md:text-xl">
              <span className="flex items-center">
                {userProfile.dateOfBirth}
                <RxDotFilled />
                {age} years
              </span>
            </span>
          </div>
        </div>
        <div className="flex flex-1 flex-col rounded-md p-4 md:mx-2">
          <div className="mb-2 hidden md:block">
            <span className="flex ">
              <h4 className="mr-2 text-[1.7rem] font-extrabold capitalize text-primary md:text-[2.2rem]">
                {userProfile.firstName} {userProfile.lastName}
              </h4>
              <div className="flex items-center text-gray-700">
                <RxDotFilled className="text-primary" />
                spouse
              </div>
            </span>
            <span className="mb-2 block text-lg font-medium capitalize text-gray-600 md:text-xl">
              {userProfile.stateOfOrigin} state, {userProfile.countryOfOrigin}
            </span>
            <span className="text-lg font-medium text-gray-600 md:text-xl">
              <span className="flex items-center">
                {userProfile.dateOfBirth}
                <RxDotFilled />
                {age} years
              </span>
            </span>
          </div>
          <div className="mb-3">
            <h4 className="block text-xl capitalize text-primary md:mb-1">
              About
            </h4>
          </div>

          <form onSubmit={handleUpdateInfo}>
            <fieldset>
              <textarea
                className="w-full whitespace-normal break-normal rounded-xl border border-primary p-3 text-justify text-lg leading-6 text-gray-600"
                rows={6}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </fieldset>

            <fieldset>
              <Input
                className="w-full"
                label="add Interesting facts"
                labelClass="mb-3 block text-xl capitalize text-primary"
                placeholder="add Interesting facts"
                name="interestValue"
                type="text"
                onChange={(e) => setInterest(e.target.value)}
                value={interest}
              />
            </fieldset>
            <h4 className="mb-3 block text-xl capitalize text-primary">
              Interesting facts
            </h4>
            <div className="flex gap-2">
              {interests?.map((facts) => (
                <span key={facts.id} className="flex items-center">
                  <span className="m-2 mx-1 inline-block rounded-lg bg-[#CECECE] p-2">
                    {facts.name}
                  </span>
                  <button onClick={() => onFilter(facts.id)}>
                    <IoMdClose />
                  </button>
                </span>
              ))}
            </div>
            <Button
              loading={isLoading}
              type="submit"
              className="mb-2 rounded-md"
            >
              Save
            </Button>
          </form>
        </div>
      </div>
    </Popup>
  );
};

export default UserProfileEditPopup;
