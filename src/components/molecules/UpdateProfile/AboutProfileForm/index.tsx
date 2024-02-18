import React, { useState } from "react";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import { Formik } from "formik";
import { UpdateUserAboutSchemaValidator } from "@/base/helpers/FormValidationSchemas";
import { useSession } from "next-auth/react";
import SeparatorInput from "@/components/atoms/Input/SeparatorInput";
import Axios from "@/base/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import useStore from "@/base/store";

import PhoneInput from "@/components/atoms/PhoneInput";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";



const fields = [
  {
    label: "Occupation",
    name: "occupation",
    placeholder: "What do you do?",
    Component: Input,
  },
  {
    label: "Mother’s maiden name ",
    name: "mothersName",
    placeholder: "Enter your mother's maiden name ",
    Component: Input,
  },

] as const;

const SpecialInput = {
  label: "Add interesting facts, Separate with comma.",
  name: "facts",
  placeholder: "Add interesting facts about you",
};

type FieldsKeys = (typeof fields)[number]["name"];

type FormUserInfo = Record<FieldsKeys, string>;

interface Props {
  onPrevClick(): void;
  // onNextClick?(): void;
}

const AboutProfileForm = (props: Props) => {
  const { onPrevClick } =
    props;
  const { data: session, update } = useSession();


  const storedData = localStorage.getItem("aboutPayload");
  const parsedData = storedData ? JSON.parse(storedData) : null;

  const [formData] = useState(parsedData ?? {
    occupation: "",
    mothersName: "",
    gender: "",
    maritalStatus: "",
    phone_no: "",
    facts: [],
  });

  const { createPersonData } = useStore();
  const router = useRouter();
  const [facts, setFacts] = useState<string[]>(formData.facts ?? []);
  const [loading, setLoading] = useState(false);



  const handleFormSubmit = async (values: FormUserInfo) => {
    const payload = { ...values, facts };

    if (!facts.length) {
      toast.error("Please fill the facts fields");
      return;
    }

    if (session && createPersonData) {
      const { user } = session;

      const { hasSugestion } = createPersonData;

      let userId;

      if (hasSugestion) {
        // eslint-disable-next-line no-underscore-dangle
        userId = createPersonData._tempProfileId;
      } else {
        userId = createPersonData.personId;
      }

      setLoading(true);

      localStorage.setItem("aboutPayload", JSON.stringify(payload));
      try {
        const res = await Axios.patch(`/person/${userId}`, payload, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });

        if (res) {
          const person = res.data;
          await update({
            ...session,
            user: {
              ...session.user,
              personId: person.personId,
            },
          });

          toast.success("User profile updated successfully");
          router.push(`/dashboard/tree/${user.personId}`);
        }
      } catch (error) {
        toast.error(String(error));
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("You are not signed, Sign in to proceed");
    }
  };

  return (
    <Formik
      initialValues={{
        occupation: formData.occupation ?? "",
        mothersName: formData.mothersName ?? "",
        gender: formData.gender ?? "",
        maritalStatus: formData.maritalStatus ?? "",
        phone_no: formData.phone_no ?? "",
        fact: facts ?? ""
      }}
      validationSchema={UpdateUserAboutSchemaValidator}
      onSubmit={(e) => {
        handleFormSubmit(e);
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        errors,
        touched,
      }) => (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
            {fields.map(({ Component, name, label, placeholder }) => (
              <fieldset key={label}>
                <Component
                  name={name}
                  placeholder={placeholder}
                  label={label}
                  // defaultValue={formData[name]}
                  onChange={handleChange}
                  parentClass="w-full"
                  value={values[name]}
                  onBlur={handleBlur}
                  isError={!!(touched[name] && errors[name])}
                // hint={touched[name] && errors[name] ? errors[name] : ""}
                />
              </fieldset>
            ))}

            <div className="space-y-1">
              <label htmlFor="gender" className="font-medium text-sm">Gender</label>
              <Select defaultValue="aaaaa" value={values.gender} onValueChange={(value: string) => {
                handleChange({ target: { name: "gender", value } });
              }
              } >
                <SelectTrigger id="gender" className="dark:bg-white h-fit focus:outline-none border-2 p-4">
                  <SelectValue placeholder="Select Gender" className=" p-4" />
                </SelectTrigger>
                <SelectContent className="dark:bg-white">
                  <SelectItem className="dark:bg-white text-black" value="m">Male</SelectItem>
                  <SelectItem className="dark:bg-white text-black" value="f">Female</SelectItem>
                  <SelectItem className="dark:bg-white text-black" value="o">Others</SelectItem>
                </SelectContent>
                <span
                  className="text-danger-1 font-normal pl-0 flex items-start gap-1 text-sm"
                >
                  {/* {touched.gender && errors.gender ? errors.gender : ""} */}
                </span>
              </Select>
            </div>
            <div className="space-y-1">
              <label htmlFor="marital" className="font-medium text-sm">Marital Status</label>
              <Select value={values.maritalStatus} onValueChange={(value: string) => {
                handleChange({ target: { name: "maritalStatus", value } });
              }}>
                <SelectGroup>
                  <SelectTrigger id="marital" className="dark:bg-white h-fit focus:outline-none border-2 p-4">
                    <SelectValue placeholder="Select Marital Status" className=" p-4" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-white">
                    <SelectItem className="dark:bg-white text-black" value="single">Single</SelectItem>
                    <SelectItem className="dark:bg-white text-black" value="married">Married</SelectItem>
                    <SelectItem className="dark:bg-white text-black" value="divorced">Divorced</SelectItem>
                  </SelectContent>
                  <SelectLabel
                    className="text-danger-1 font-normal pl-0 flex items-start gap-1 text-sm"
                  >
                    {/* {touched.maritalStatus && errors.maritalStatus ? errors.maritalStatus : ""} */}
                  </SelectLabel>
                </SelectGroup>

              </Select>
            </div>

            <PhoneInput
              // hint={
              //   touched.phone_no && errors.phone_no ? errors.phone_no : ""
              // }
              isError={!!(touched.phone_no && errors.phone_no)}
              name={values.phone_no}
              value={values.phone_no}
              label="Enter your phone number"
              placeholder="(999) 999-9999"
              onChange={(e) => {
                handleChange({ target: { name: "phone_no", value: e || "" } });
              }}
            />
            <div>
              <SeparatorInput
                {...SpecialInput}
                onTagsChange={setFacts}
                tags={facts}
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-6 my-8">
            <Button className="lg:px-0 lg:w-fit border lg:border-none border-primary bg-transparent text-black" onClick={onPrevClick}>
              <ArrowLeftIcon className="w-4 h-4" /> Back
            </Button>
            <Button loading={loading} className="" type="submit">
              Continue
            </Button>

          </div>
        </form>
      )
      }
    </Formik >
  );
};

export default AboutProfileForm;
