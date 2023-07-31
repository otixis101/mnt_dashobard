/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from "react";
import { Formik, FormikHelpers } from "formik";
import Popup from "@/components/atoms/Popup";
import { toast } from "react-toastify";
import Image, { StaticImageData } from "next/image";

import { IoMdClose } from "react-icons/io";
import Button from "@/components/atoms/Button";
import { RxDotFilled } from "react-icons/rx";
import Input from "@/components/atoms/Input";
import { StringSchema } from "@/base/helpers/FormValidationSchemas";
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

// const data = [
//   { id: "1", name: "Has a twin" },
//   { id: "2", name: "Graduated Top of the Class" },
//   { id: "3", name: "Forbes 30 under 30" },
// ];

type SampleData = { id: string; name: string };
type Credentials = { interestValue: string };

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
  const [updateForm, setUpdateForm] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const onFilter = (id: string) => {
    const newInterests = interests.filter((interest) => interest.id !== id);
    setInterests(newInterests);
  };

  const handleFactsUpload = async (facts: string[]) => {
    const formData = new FormData();
    console.log(facts, ": facts handles");
    // Append each item from the 'facts' array to the FormData
    facts.forEach((fact) => {
      formData.append(`facts`, fact);
    });

    setIsLoading(true);
    const customRequest = {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${session?.user.accessToken}`,
      },
      body: formData,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/person/${userProfile?._id}`,
        customRequest
      );

      if (res && res.ok) {
        const data = await res.json();
        console.log(data);
        toast.success("Profile Facts Updated successful");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const addToInterest = async (
    values: Credentials,
    { resetForm }: FormikHelpers<Credentials>
  ) => {
    const { interestValue } = values;

    if (interestValue.length > 0) {
      const newInterests = {
        id: String(Math.round(Math.random() * 10000)),
        name: interestValue,
      };

      setInterests((interest) => [...interest, newInterests]);
      resetForm();
    }
    setUpdateForm((prev) => prev + 1);
  };

  /**
   * the updating of interest state is asynchronous
   * i don't get the recent changes after the state has been updated
   * thats what this useEffect will fix
   * @todo refactor the code by removing this useEffect
   */
  useEffect(() => {
    const newFacts: string[] = [];
    interests.map((int) => newFacts.push(int.name));

    if (updateForm !== 0) handleFactsUpload(newFacts);
  }, [updateForm]);

  return (
    <Popup open={mode} onChangeState={onChange}>
      <div className="flex flex-col md:flex-row">
        <div className="flex py-4 md:w-[30%]">
          <div className="flex flex-col items-center">
            <Image
              src={imgSrc}
              alt="user"
              // src={userProfile.profilePhotoUrl ?? User}
              width="100"
              height="100"
              className="h-36 w-32 md:h-48 md:w-48"
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
            <p className="whitespace-normal break-normal rounded-xl border border-primary p-3 text-justify text-lg leading-6 text-gray-600">
              Welcome to my profile! I&apos;m Dr. Julian Miller, a dedicated and
              compassionate medical doctor with a drive to make a positive
              impact in the field of healthcare. At 27 years old, I have had the
              privilege of achieving several notable milestones throughout my
              career.
            </p>
          </div>
          <Formik
            initialValues={{ interestValue: "" }}
            onSubmit={addToInterest}
            validationSchema={StringSchema}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              touched,
              errors,
              handleBlur,
            }) => (
              <form onSubmit={handleSubmit}>
                <fieldset>
                  <Input
                    className="w-full"
                    label="add Interesting facts"
                    labelClass="mb-3 block text-xl capitalize text-primary"
                    placeholder="add Interesting facts"
                    name="interestValue"
                    type="text"
                    hint={
                      touched.interestValue && errors.interestValue
                        ? errors.interestValue
                        : ""
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.interestValue}
                  />
                </fieldset>
                <h4 className="mb-3 block text-xl capitalize text-primary">
                  Interesting facts
                </h4>
                <div className="">
                  {interests?.map((interest) => (
                    <span key={interest.id} className="flex items-center">
                      <span className="m-2 mx-1 inline-block rounded-lg bg-[#877FB6] p-2">
                        {interest.name}
                      </span>
                      <button onClick={() => onFilter(interest.id)}>
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
            )}
          </Formik>
        </div>
      </div>
    </Popup>
  );
};

export default UserProfileEditPopup;
