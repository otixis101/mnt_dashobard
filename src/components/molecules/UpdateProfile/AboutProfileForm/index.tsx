import React, { useState } from "react";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import { Formik } from "formik";
import { UpdateUserAboutSchema } from "@/base/helpers/FormValidationSchemas";
import Radio from "@/components/atoms/Input/Radio";
import { useSession } from "next-auth/react";
import SeparatorInput from "@/components/atoms/Input/SeparatorInput";
import Axios from "@/base/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import useStore from "@/base/store";

const fields = [
  {
    label: "Occupation",
    name: "occupation",
    placeholder: "What do you do?",
    Component: Input,
  },
  {
    label: "Enter place of residence",
    name: "address",
    placeholder: "Place of residence (City, State, Country)",
    Component: Input,
  },
] as const;

const SpecialInput = {
  label: "Add interesting facts, Separate with comma.",
  name: "facts",
  placeholder: "Add interesting facts about you",
};

const checkboxFields = [
  {
    label: "Choose Gender",
    name: "gender",
    placeholder: "Mother's maiden name ",
    Component: Radio,
    options: [
      { label: "Male", value: "m" },
      { label: "Female", value: "f" },
      { label: "Others", value: "o" },
    ],
  },
  {
    label: "Marital Status",
    name: "maritalStatus",
    placeholder: "Mother's maiden name ",
    Component: Radio,
    options: [
      { label: "Single", value: "single" },
      { label: "Married", value: "married" },
      { label: "Divorced", value: "divorced" },
    ],
  },
] as const;

type FieldsKeys = (typeof fields)[number]["name"];

type FormUserInfo = Record<FieldsKeys, string>;

type RadioFields = (typeof checkboxFields)[number]["name"];

const getToastMessage = (arg: unknown, msg: string) => {
  if (!arg) {
    toast.error(msg);
    return true;
  }

  return false;
};

const AboutProfileForm = () => {
  const { data: session, update } = useSession();
  const { createPersonData } = useStore();
  const router = useRouter();
  const [facts, setFacts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [radioValues, setRadioValues] = useState<Record<RadioFields, string>>({
    gender: "",
    maritalStatus: "",
  });

  const handleRadioOnChange = (key: RadioFields, value: string) => {
    setRadioValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleFormSubmit = async (values: FormUserInfo) => {
    const payload = { ...values, ...radioValues, facts };

    const { gender, maritalStatus } = radioValues;

    if (!gender || !maritalStatus || !facts.length) {
      switch (true) {
        case getToastMessage(gender, "Please fill out gender field"):
          return;
        case getToastMessage(
          maritalStatus,
          "Please fill out marital status field"
        ):
          return;
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
          await update({
            ...session,
            user: {
              ...session.user,
              personId: user.personId,
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
            <div>
              <SeparatorInput
                {...SpecialInput}
                onTagsChange={setFacts}
                tags={facts}
              />
            </div>
            <div className="space-y-4">
              {checkboxFields.map(
                ({ Component, name, label, placeholder, options }) => (
                  <fieldset key={label}>
                    <Component
                      name={name}
                      placeholder={placeholder}
                      label={label}
                      parentClass="w-full"
                      onBlur={handleBlur}
                      options={options}
                      value={radioValues[name]}
                      onValueChange={(val) => handleRadioOnChange(name, val)}
                    />
                  </fieldset>
                )
              )}
            </div>
          </div>
          <Button loading={loading} className="mx-auto mt-8" type="submit">
            Finish
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default AboutProfileForm;
