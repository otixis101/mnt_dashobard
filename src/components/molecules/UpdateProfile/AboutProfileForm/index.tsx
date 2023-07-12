import React from "react";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import { Formik } from "formik";
import { CreateUserSchema } from "@/base/helpers/FormValidationSchemas";
import Radio from "@/components/atoms/Input/Radio";

const fields = [
  {
    label: "Occupation",
    name: "occupation",
    placeholder: "What do you do?",
    Component: Input,
  },
  {
    label: "Add interesting facts, Separate with comma.",
    name: "about",
    placeholder: "Add interesting facts about you",
    Component: Input,
  },

  {
    label: "Enter place of residence",
    name: "address",
    placeholder: "Place of residence (City, State, Country)",
    Component: Input,
  },
] as const;

const checkboxFields = [
  {
    label: "Choose Gender",
    name: "gender",
    placeholder: "Mother's maiden name ",
    Component: Radio,
    options: ["Male", "Female", "Others"],
  },
  {
    label: "Marital Status",
    name: "maritalStatus",
    placeholder: "Mother's maiden name ",
    Component: Radio,
    options: ["Single", "Married", "Divorced"],
  },
] as const;

type FieldsKeys =
  | (typeof fields)[number]["name"]
  | (typeof checkboxFields)[number]["name"];

type FormUserInfo = Record<FieldsKeys, string>;

const AboutProfileForm = () => {
  const handleFormSubmit = async (values: FormUserInfo) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={{
        about: "",
        address: "",
        occupation: "",
        gender: "",
        maritalStatus: "",
      }}
      validationSchema={CreateUserSchema}
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
                      isError={!!(touched[name] && errors[name])}
                      hint={touched[name] && errors[name] ? errors[name] : ""}
                      defaultValue={options[0]}
                    />
                  </fieldset>
                )
              )}
            </div>
          </div>
          <Button className="mx-auto mt-8" type="submit">
            Finish
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default AboutProfileForm;
