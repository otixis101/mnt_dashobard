import React, { useEffect, useState } from "react";
import Input from "@/components/atoms/Input";
// import ComboBox, { DataProps } from "@/components/atoms/ComboBox";
// import PhoneInput from "@/components/atoms/PhoneInput";
import Button from "@/components/atoms/Button";
// import { countryArrray } from "@/components/constants";
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
import { DayPickerCalendar } from "@/components/molecules/Calendar/CalendarDayPicker";
import { useInput } from "react-day-picker";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


interface FormUserInfo {
  firstName: string;
  lastName: string;
  // mothersName: string;
  birthPlace: string;
  homeTown: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  // middleName: string;
}

const fields = [
  {
    label: "Enter first name",
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
  // {
  //   label: "Enter Middle name",
  //   name: "middleName",
  //   placeholder: "Middle Name",
  //   className: "sm:col-span-2",
  //   Component: Input,
  // },
  {
    label: "Enter Home Town",
    name: "homeTown",
    placeholder: "Enter Home Town",
    Component: Input,
  },

  {
    label: "Enter Birthplace",
    name: "birthPlace",
    placeholder: "e.g : State, Country ",
    Component: Input,
  },
] as const;

interface Person {
  firstName?: string,
  lastName?: string,
  phoneNumber?: string,
  stateOfOrigin?: string,
  countryOfOrigin?: string,
  dateOfBirth?: Date,
  placeOfBirth?: string,
  homeTown?: string,
  mothersMaidenName?: string,
  gender?: string,
  facts?: string,
  relationship?: string,
  placeOfDeath?: string,
  lifeStatus?: string,
  profilePhoto?: File,
  isUser?: boolean
}

interface Props {

  onFormUpdate: (details: Person) => void;
}

const AddMemberPage = ({ onFormUpdate }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const calendarRef = React.useRef<HTMLInputElement>(null);
  const { ref, relationship, ref2 } = router.query;

  const [gender, setGender] = useState<string | null>("");

  // const [phoneNumber, setPhoneNumber] = useState<E164Number>();
  const [calenderOpen, setCalenderOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [selectedCountry, setSelctedCountry] = useState("");
  // const [selectedState, setSelectedState] = useState("");
  // const [states, setStates] = useState<DataProps[]>([]);
  // const countries = countryArrray.map(({ country }) => ({
  //   name: country,
  //   value: country,
  // }));

  const { inputProps, dayPickerProps } = useInput({
    defaultSelected: new Date(),
    fromYear: 1900,
    toYear: new Date().getFullYear(),
    required: true,
  });

  const { setPersonData } = useStore();

  const handleFormSubmit = async (values: FormUserInfo) => {

    // alert("submitted");

    const {
      firstName, lastName, birthPlace, homeTown,
      //  middleName
    } = values;
    if (!gender) {
      toast.error("Please select a gender");
      return;
    }

    // Split the string at the comma
    const locationArray = birthPlace.split(",");

    // Trim any extra whitespace from the resulting strings
    const stateOf = locationArray[0].trim();
    const countryOf = locationArray[1].trim();

    const personPayload: Person = {
      firstName,
      lastName,
      // middleName,
      dateOfBirth: new Date(inputProps.value as string),
      mothersMaidenName: "mothersName",
      homeTown,
      gender,
      phoneNumber: "",
      stateOfOrigin: stateOf,
      countryOfOrigin: countryOf,
      // phoneNumber,
      // countryOfOrigin: selectedCountry,
      // stateOfOrigin: selectedState,
      isUser: false,
    };

    //  update formData
    onFormUpdate(personPayload);

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
          router.push({
            query: {
              step: "suggestion",
              reference: ref,
              reference2: ref2,
              relationship,
            },
          });
        } else {
          router.push({
            query: {
              step: "relationship",
              reference: ref,
              reference2: ref2,
              relationship,
            },
          });
        }
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (calenderOpen) {
      setTimeout(() => {
        calendarRef.current?.focus();
      }, 1500);
    }
  }, [calenderOpen]);

  // useEffect(() => {
  //   if (selectedCountry) {
  //     const filteredCountry = countryArrray.filter(
  //       ({ country }) => country === selectedCountry
  //     );

  //     const filteredState = filteredCountry[0].states.map((state) => ({
  //       name: state,
  //       value: state,
  //     }));

  //     setStates(filteredState);
  //   }
  // }, [selectedCountry]);

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        // mothersName: "",
        birthPlace: "",
        homeTown: "",
        // middleName: "",
        dateOfBirth: "",
        gender: "",
        phoneNumber: "",
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
                    className="text-light-slate-9 flex w-full items-center gap-4 text-base"
                  >
                    <Input
                      ref={calendarRef}
                      {...inputProps}
                      label=""
                      parentClass="w-full"
                    />
                  </button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto bg-white p-0">
                  <DayPickerCalendar
                    // block user's from selecting a future date

                    mode="single"
                    // captionLayout="dropdown-buttons"
                    {...dayPickerProps}
                    // selected={date}
                    // onSelect={setDate}
                    className="rounded-md border"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-1">
              <label htmlFor="gender" className="font-medium text-sm">Gender</label>
              <Select onValueChange={(value: string) => setGender(value)}>
                <SelectTrigger id="gender" className="dark:bg-white h-fit focus:outline-none border-2 p-4">
                  <SelectValue placeholder="Select Gender" className="p-4" />
                </SelectTrigger>
                <SelectContent className="dark:bg-white">
                  <SelectItem className="dark:bg-white text-black" value="m">Male</SelectItem>
                  <SelectItem className="dark:bg-white text-black" value="f">Female</SelectItem>
                  <SelectItem className="dark:bg-white text-black" value="o">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* <ComboBox
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
            /> */}
            {/* <PhoneInput
              label="Enter your phone number"
              placeholder="(999) 999-9999"
              value={phoneNumber}
              onChange={setPhoneNumber}
            /> */}
          </div>
          <Button loading={loading} className="ml-auto my-8" disabled={loading} type="submit">
            Continue
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default AddMemberPage;
