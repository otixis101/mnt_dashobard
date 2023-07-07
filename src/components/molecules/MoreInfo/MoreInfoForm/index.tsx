import React, { FC, useState } from "react";
import Input from "@/components/atoms/Input";
import ComboBox from "@/components/atoms/ComboBox";
import PhoneInput from "@/components/atoms/PhoneInput";
import Button from "@/components/atoms/Button";

const fields = [
  {
    label: "Enter your first name",
    name: "firstName",
    placeholder: "First Name",
    Component: Input,
  },
  {
    label: "Enter your last name",
    name: "lastName",
    placeholder: "Last Name",
    Component: Input,
  },
  {
    label: "Enter your date of birth",
    name: "dob",
    placeholder: "Date of birth (DD/MM/YY)",
    Component: Input,
  },
  {
    label: "Enter your Home Town",
    name: "dob",
    placeholder: "Enter your Home Town",
    Component: Input,
  },
  {
    label: "Select country of origin",
    name: "country",
    placeholder: "Select country of origin",
    Component: ComboBox,
  },
  {
    label: "Select state of origin",
    name: "state",
    placeholder: "Select state of origin",
    Component: ComboBox,
  },
  {
    label: "Enter your mother's maiden name",
    name: "mothersName",
    placeholder: "Mother's maiden name ",
    Component: Input,
  },
];

const MoreInfoForm: FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<E164Number>();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <div className="grid grid-cols-1  gap-7 sm:grid-cols-2">
        {fields.map(({ Component, name, label, placeholder }) => (
          <Component
            name={name}
            key={label}
            placeholder={placeholder}
            label={label}
          />
        ))}
        <PhoneInput
          label="Enter your phone number"
          placeholder="(999) 999-9999"
          value={phoneNumber}
          onChange={setPhoneNumber}
        />
      </div>
      <Button className="mx-auto mt-8" type="submit">
        Continue
      </Button>
    </form>
  );
};

export default MoreInfoForm;
