import React, { useState } from "react";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import { Formik } from "formik";
import { UpdateUserAboutSchema } from "@/base/helpers/FormValidationSchemas";
// import Radio from "@/components/atoms/Input/Radio";
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
  SelectItem,
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
  // {
  //   label: "Enter place of residence",
  //   name: "address",
  //   placeholder: "Place of residence (City, State, Country)",
  //   Component: Input,
  // },
] as const;

const SpecialInput = {
  label: "Add interesting facts, Separate with comma.",
  name: "facts",
  placeholder: "Add interesting facts about you",
};

// const checkboxFields = [
//   {
//     label: "Choose Gender",
//     name: "gender",
//     placeholder: "Mother's maiden name ",
//     Component: Radio,
//     options: [
//       { label: "Male", value: "m" },
//       { label: "Female", value: "f" },
//       { label: "Others", value: "o" },
//     ],
//   },
//   {
//     label: "Marital Status",
//     name: "maritalStatus",
//     placeholder: "Mother's maiden name ",
//     Component: Radio,
//     options: [
//       { label: "Single", value: "single" },
//       { label: "Married", value: "married" },
//       { label: "Divorced", value: "divorced" },
//     ],
//   },
// ] as const;

type FieldsKeys = (typeof fields)[number]["name"];

type FormUserInfo = Record<FieldsKeys, string>;

// type RadioFields = (typeof checkboxFields)[number]["name"];

const getToastMessage = (arg: unknown, msg: string) => {
  if (!arg) {
    toast.error(msg);
    return true;
  }

  return false;
};

interface Props {
  onPrevClick(): void;
  // onNextClick?(): void;
}

const AboutProfileForm = (props: Props) => {
  const { onPrevClick } =
    props;
  const { data: session, update } = useSession();
  const { createPersonData } = useStore();
  const router = useRouter();
  const [facts, setFacts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  // const [radioValues, setRadioValues] = useState<Record<RadioFields, string>>({
  //   gender: "",
  //   maritalStatus: "",
  // });

  const [gender, setGender] = useState<string | null>("");
  const [maritalStatus, setMaritalStatus] = useState<string | null>("");

  // const [selectedGender, setSelectedGender] = useState(["Male", "Female", "Unspecified"]);

  const [phoneNumber, setPhoneNumber] = useState<E164Number>();

  // const handleRadioOnChange = (key: RadioFields, value: string) => {
  //   setRadioValues((prev) => ({ ...prev, [key]: value }));
  // };

  const handleFormSubmit = async (values: FormUserInfo) => {
    const payload = { ...values, maritalStatus, gender, facts };

    // const { gender, maritalStatus } = radioValues;

    if (!gender || !maritalStatus || !facts.length) {
      switch (true) {
        case getToastMessage(gender, "Please fill out gender field"):
          return;
        // case getToastMessage(
        //   maritalStatus,
        //   "Please fill out marital status field"
        // ):
        //   return;
        case getToastMessage(
          facts.length,
          "Fill out at least one fact about you"
        ):
          return;
        default:
          toast.error("Please fill out all fields");
          return;
      }
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
        address: "",
        occupation: "",
        mothersName: "",
        gender: "",
        maritalStatus: "",
      }}
      validationSchema={UpdateUserAboutSchema}
      onSubmit={handleFormSubmit}
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
                  onChange={handleChange}
                  parentClass="w-full"
                  value={values[name]}
                  onBlur={handleBlur}
                  isError={!!(touched[name] && errors[name])}
                  hint={touched[name] && errors[name] ? errors[name] : ""}
                />
              </fieldset>
            ))}

            <div className="space-y-1">
              <label htmlFor="gender" className="font-medium text-sm">Gender</label>
              <Select onValueChange={(value: string) => setGender(value)}>
                <SelectTrigger id="gender" className="dark:bg-white h-fit focus:outline-none border-2 p-4">
                  <SelectValue placeholder="Select Gender" className=" p-4" />
                </SelectTrigger>
                <SelectContent className="dark:bg-white">
                  <SelectItem className="dark:bg-white text-black" value="m">Male</SelectItem>
                  <SelectItem className="dark:bg-white text-black" value="f">Female</SelectItem>
                  <SelectItem className="dark:bg-white text-black" value="o">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <label htmlFor="marital" className="font-medium text-sm">Marital Status</label>
              <Select onValueChange={(value: string) => setMaritalStatus(value)}>
                <SelectTrigger id="marital" className="dark:bg-white h-fit focus:outline-none border-2 p-4">
                  <SelectValue placeholder="Select Marital Status" className=" p-4" />
                </SelectTrigger>
                <SelectContent className="dark:bg-white">
                  <SelectItem className="dark:bg-white text-black" value="single">Single</SelectItem>
                  <SelectItem className="dark:bg-white text-black" value="married">Married</SelectItem>
                  <SelectItem className="dark:bg-white text-black" value="divorced">Divorced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <PhoneInput
              label="Enter your phone number"
              placeholder="(999) 999-9999"
              value={phoneNumber}
              onChange={setPhoneNumber}
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
      )}
    </Formik>
  );
};

export default AboutProfileForm;
