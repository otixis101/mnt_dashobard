import React from "react";

import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import RadioGroupBtn from "@/components/atoms/RadioGroup";

const fields = [
  {
    label: "Enter first name and middle name",
    name: "firstName",
    placeholder: "First Name",
    Component: Input,
  },
  {
    label: "Enter last name",
    name: "lastName",
    placeholder: "Last Name",
    Component: Input,
  },
  {
    label: "Enter date of birth",
    name: "dob",
    placeholder: "Date of birth (DD/MM/YY)",
    Component: Input,
  },
  {
    label: "Enter birth place",
    name: "dob",
    placeholder: "Place of birth(City, State, Country)",
    Component: Input,
  },
  {
    label: "Enter Mother's maiden name",
    name: "country",
    placeholder: "Mother's maiden name",
    Component: Input,
  },
];

const options = [
  { name: "male", id: 1 },
  { name: "female", id: 2 },
  { name: "other", id: 3 },
];

const AddMemberForm = () => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <div className="grid grid-cols-1  gap-8 sm:grid-cols-2">
        {fields.map(({ Component, name, label, placeholder }) => (
          <Component
            name={name}
            key={label}
            placeholder={placeholder}
            label={label}
          />
        ))}
        <div className="">
          <label htmlFor="id" className="mb-8 capitalize text-black">
            choose gender
          </label>
          <RadioGroupBtn
            data={options}
            defaultValue="male"
            wrapperClass="mt-[1rem]"
          />
        </div>
      </div>
      <Button className="mx-auto mt-8" type="submit">
        Continue
      </Button>
    </form>
  );
};

export default AddMemberForm;
