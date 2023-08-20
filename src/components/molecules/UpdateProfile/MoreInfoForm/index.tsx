import React, { FC, useEffect, useState } from "react";
import Input from "@/components/atoms/Input";
import ComboBox, { DataProps } from "@/components/atoms/ComboBox";
import PhoneInput from "@/components/atoms/PhoneInput";
import Button from "@/components/atoms/Button";
import { countryArrray } from "@/components/constants";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/atoms/Popover";
import { Formik } from "formik";
import { CreateUserSchema } from "@/base/helpers/FormValidationSchemas";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import useStore from "@/base/store/";
import { useRouter } from "next/router";
import { useInput } from "react-day-picker";
import { DayPickerCalendar } from "../../Calendar/CalendarDayPicker";

interface FormUserInfo {
  firstName: string;
  lastName: string;
  mothersName: string;
  homeTown: string;
  middleName: string;
}

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
    label: "Enter your Middle name",
    name: "middleName",
    placeholder: "Middle Name",
    className: "sm:col-span-2",
    Component: Input,
  },
  {
    label: "Enter your Home Town",
    name: "homeTown",
    placeholder: "Enter your Home Town",
    Component: Input,
  },

  {
    label: "Enter your mother's maiden name",
    name: "mothersName",
    placeholder: "Mother's maiden name ",
    Component: Input,
  },
] as const;

const MoreInfoForm: FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState<E164Number>();

  const dateInputRef = React.useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelctedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [states, setStates] = useState<DataProps[]>([]);
  const [calenderOpen, setCalenderOpen] = useState(false);
  const countries = countryArrray.map(({ country }) => ({
    name: country,
    value: country,
  }));

  const { inputProps, dayPickerProps } = useInput({
    defaultSelected: new Date(),
    fromYear: 1900,
    toYear: 2023,
    format: "PPP",
    required: true,
  });

  const { setPersonData } = useStore();

  const handleFormSubmit = async (values: FormUserInfo) => {
    const { firstName, lastName, mothersName, homeTown, middleName } = values;
    if (!phoneNumber || !selectedCountry || !selectedState) {
      toast.error("Please fill all fields");
      return;
    }

    const personPayload = {
      firstName,
      lastName,
      middleName,
      dateOfBirth: new Date(inputProps.value as string),
      mothersMaidenName: mothersName,
      homeTown,
      phoneNumber,
      countryOfOrigin: selectedCountry,
      stateOfOrigin: selectedState,
      isUser: true,
    };

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/person`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
          body: JSON.stringify(personPayload),
        }
      );
      if (res.status === 201) {
        toast.success("Profile created successfully");
        const person: APIResponse<DbCreatePerson> = await res.json();

        setPersonData(person.data);

        if (person.data.hasSugestion) {
          router.push({ query: { step: "suggestions" } });
        } else {
          router.push({ query: { step: "about" } });
        }
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCountry) {
      const filteredCountry = countryArrray.filter(
        ({ country }) => country === selectedCountry
      );

      const filteredState = filteredCountry[0].states.map((state) => ({
        name: state,
        value: state,
      }));

      setStates(filteredState);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (calenderOpen) {
      // Using this timeout to allow the popover to open before focusing on the input
      setTimeout(() => {
        dateInputRef.current?.focus();
      }, 1500);
    }
  }, [calenderOpen]);

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        mothersName: "",
        homeTown: "",
        middleName: "",
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
          <div className="grid grid-cols-1 gap-5 bg-white sm:grid-cols-2">
            {fields.map(({ Component, name, label, placeholder, ...rest }) => (
              <fieldset {...rest} key={label}>
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
                  id={name}
                />
              </fieldset>
            ))}

            <div className="!text-light-slate-9 space-y-2">
              <p className="grid grid-cols-1 gap-2 text-sm text-black">
                Enter your date of birth
              </p>

              <Popover
                onOpenChange={(prevValue) => setCalenderOpen(!prevValue)}
                defaultOpen={calenderOpen}
              >
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center w-full gap-4 text-base text-light-slate-9"
                  >
                    <Input
                      ref={dateInputRef}
                      label=""
                      {...inputProps}
                      parentClass="w-full"
                    />
                  </button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-0 bg-white">
                  <DayPickerCalendar
                    // block user's from selecting a future date

                    {...dayPickerProps}
                    className="border rounded-md"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <ComboBox
              onSelect={(value) => {
                setSelctedCountry(value);
              }}
              label="Select country of origin "
              data={countries}
            />
            <ComboBox
              data={states}
              onSelect={(value) => {
                setSelectedState(value);
              }}
              label="Select state of origin "
            />
            <PhoneInput
              label="Enter your phone number"
              placeholder="(999) 999-9999"
              value={phoneNumber}
              onChange={setPhoneNumber}
            />
          </div>
          <Button loading={loading} className="mx-auto mt-8" type="submit">
            Continue
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default MoreInfoForm;
