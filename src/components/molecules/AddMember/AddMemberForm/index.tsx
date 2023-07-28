import React from "react";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import Radio from "@/components/atoms/Input/Radio";

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

const checkboxFields = {
  label: "Choose Gender",
  name: "gender",
  placeholder: "Mother's maiden name ",
  Component: Radio,
  options: [
    { label: "Male", value: "m" },
    { label: "Female", value: "f" },
    { label: "Others", value: "o" },
  ],
};

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
        <div className="flex items-center">
          <Radio {...checkboxFields} />
        </div>
      </div>
      <Button className="mx-auto mt-8" type="submit">
        Continue
      </Button>
    </form>
  );
};

export default AddMemberForm;
