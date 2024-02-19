/* eslint-disable no-underscore-dangle */
import Button from "@/components/atoms/Button";
import React, { ChangeEvent, useEffect, useState } from "react";
// import Radio from "@/components/atoms/Input/Radio";
import Axios from "@/base/axios";
import useStore from "@/base/store";
import { cn } from "@/base/utils";
import Input from "@/components/atoms/Input";
import SeparatorInput from "@/components/atoms/Input/SeparatorInput";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/atoms/Popover";
import { DayPickerCalendar } from "@/components/molecules/Calendar/CalendarDayPicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useInput } from "react-day-picker";
import { toast } from "react-toastify";
import AlmostThereDropBox from "../../AlmostThereDropBox";

// const relationships = [
//   { name: "Mother", value: "mother" },
//   { name: "Father", value: "father" },
//   { name: "Spouse", value: "spouse" },
//   { name: "Child", value: "Child" },
//   { name: "Brother", value: "brother" },
//   { name: "Sister", value: "sister" },
// ];

const allRelationships = [
  {
    spouse: ["Husband", "Wife"],
    parent: ["Mother", "Father"],
    sibling: ["Brother", "Sister"],

    children: ["Son", "Daughter"],
  },
];

const additionalFields = [
  {
    name: "placeOfDeath",
    placeholder: "Place of death (State, Country)",
    label: "Place of death",
  },
] as const;

// const checkboxFields = [
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
// type RadioFields = (typeof checkboxFields)[number]["name"];

const getToastMessage = (arg: unknown, msg: string) => {
  if (!arg) {
    toast.error(msg);
    return true;
  }

  return false;
};

interface Person {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  stateOfOrigin?: string;
  countryOfOrigin?: string;
  dateOfBirth?: Date;
  placeOfBirth?: string;
  homeTown?: string;
  mothersMaidenName?: string;
  gender?: string;
  facts?: string;
  relationship?: string;
  placeOfDeath?: string;
  dateOfDeath?: Date;
  lifeStatus?: string;
  profilePhoto?: File;
  isUser?: boolean;
}

interface Props {
  onPrevClick?: () => void;
  // onNextClick?(): void;
  onFormUpdate?: (person: Person) => void;
}

const FirstForm = (props: Props) => {
  const { onPrevClick, onFormUpdate } = props;

  const [status, setStatus] = useState("Living");
  const [relation, setRelation] = useState("");
  const [file, setFile] = useState<File>();
  // const [profilePhotoUrl, setProfilePhotoUrl] = useState("");
  const [facts, setFacts] = useState<string[]>([]);
  const [calenderOpen, setCalenderOpen] = useState(false);
  const [formData, setFormData] = useState({
    placeOfDeath: "",
    dateOfDeath: "",
    relationship: "",
    facts: "",
  });
  const calendarRef = React.useRef<HTMLInputElement>(null);

  const { createPersonData } = useStore();

  // This is temporary to remove typescript error message

  const [loading, setLoading] = useState(false);
  // const [radioValues, setRadioValues] = useState<Record<RadioFields, string>>({
  //   maritalStatus: "",
  // });

  const { data: session } = useSession();

  const router = useRouter();

  const { query } = router;

  const [relatio, setRelatio] = useState<string[]>([]);

  useEffect(() => {
    switch (query?.relationship?.toString().toLowerCase()) {
      case "spouse":
        setRelatio(allRelationships[0].spouse);
        break;
      case "sibling":
        setRelatio(allRelationships[0].sibling);
        break;
      case "parent":
        setRelatio(allRelationships[0].parent);
        break;
      case "child":
        setRelatio(allRelationships[0].children);
        break;
      default:
        setRelatio([]);
        break;
    }
  }, [query?.relationship]);

  const { inputProps, dayPickerProps } = useInput({
    defaultSelected: new Date(),
    fromYear: 1900,
    toYear: new Date().getFullYear(),
    required: true,
  });

  // const handleRadioOnChange = (key: RadioFields, value: string) => {
  //   setRadioValues((prev) => ({ ...prev, [key]: value }));
  // };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files) {
      setFile(files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      // reader.onload = (event) => {
      //   setProfilePhotoUrl(event.target?.result as string);
      // };

      // console.log(profilePhotoUrl);
    } else {
      toast.error("Please upload a file");
    }
  };

  const relative = createPersonData as DbPersonWithOutSuggestion;

  // console.log(relative?.personId);

  const suggestedRelative =
    query.isSuggestion === "true"
      ? (createPersonData as DbPersonWithSuggestion)
      : ([] as unknown as DbPersonWithSuggestion);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((c) => ({ ...c, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (!query.reference) {
    //   toast.error("Relative reference is not defined");

    //   return;
    // }

    if (session) {
      const { user } = session;

      if (!relation) {
        switch (true) {
          case getToastMessage(relation, "Please fill out relationship field"):
            return;
          default:
            toast.error("Please fill out all fields");
            return;
        }
      }

      const personPayload: Person = {
        profilePhoto: file as File,
        facts: facts.join(","),
        relationship: relation,
        lifeStatus: status,
        isUser: false,
      };

      const formDataPayload = new FormData();

      formDataPayload.append("profilePhoto", file as File);
      formDataPayload.append("facts", facts.join(","));
      // formDataPayload.append("dateOfDeath", formData.dateOfDeath);
      // formDataPayload.append("relationship", relation);
      formDataPayload.append(
        "relationship",
        (query.relationship as string) ?? ""
      );

      if (query.reference2) {
        formDataPayload.append("reference2", query.reference2 as string);
      }

      formDataPayload.append(
        "relativeId",
        query.isSuggestion === "true"
          ? suggestedRelative.suggestions[0].person._id
          : relative?.personId ?? ""
      );
      formDataPayload.append("reference", String(query.reference));
      // formDataPayload.append("maritalStatus", radioValues.maritalStatus);

      if (status === "Deceased") {
        formDataPayload.append("placeOfDeath", formData.placeOfDeath);
        formDataPayload.append(
          "dateOfDeath",
          `${new Date(inputProps.value as string)}`
        );

        personPayload.placeOfDeath = formData.placeOfDeath;
        personPayload.dateOfDeath = new Date(inputProps.value as string);
      }

      // Update FormData

      onFormUpdate!(personPayload);

      setLoading(true);
      try {
        const res = await Axios.post(`/person/family/add`, formDataPayload, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        });

        if (res) {
          toast.success("User profile updated successfully");
          router.push({
            query: {
              step: "finally",
              ref: relative?.personId,
              relation,
            },
          });
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

  console.log({ relatio });
  return (
    <form className="pb-10" onSubmit={handleFormSubmit}>
      <div className="flex flex-col">
        <div className="grid grid-cols-1 gap-4 gap-x-8 sm:mb-4 sm:grid-cols-2">
          {/* <Radio
            label=" Life status"
            options={["Living", "Deceased"]}
            value={status}
            onValueChange={setStatus}
            className="capitalize"
          /> */}
          <div className="space-y-1">
            <label htmlFor="gender" className="text-sm font-medium">
              Life Status
            </label>
            <Select onValueChange={(value: string) => setStatus(value)}>
              <SelectTrigger
                id="gender"
                className="h-fit border-2 p-4 focus:outline-none dark:bg-white"
              >
                <SelectValue
                  placeholder="Select Life Status"
                  className=" p-4"
                />
              </SelectTrigger>
              <SelectContent className="dark:bg-white">
                <SelectItem className="text-black dark:bg-white" value="Living">
                  Living
                </SelectItem>
                <SelectItem
                  className="text-black dark:bg-white"
                  value="Deceased"
                >
                  Deceased
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label htmlFor="gender" className="text-sm font-medium">
              Relationship
            </label>
            <Select onValueChange={(value: string) => setRelation(value)}>
              <SelectTrigger
                id="gender"
                className="h-fit border-2 p-4 focus:outline-none dark:bg-white"
              >
                <SelectValue
                  placeholder="Select Relationship"
                  className=" p-4"
                />
              </SelectTrigger>
              <SelectContent className="dark:bg-white">
                {relatio.map((rel) => (
                  <SelectItem
                    key={rel}
                    className="text-black dark:bg-white"
                    value={rel}
                  >
                    {rel}
                  </SelectItem>
                ))}
                {/* <SelectItem className="dark:bg-white text-black" value="father">Father</SelectItem> */}
              </SelectContent>
            </Select>
          </div>

          {/* {additionalFields.map((opt) => (
            <Input
              {...opt}
              key={opt.name}
              value={formData[opt.name]}
              onChange={handleChange}
            />
          ))} */}

          {status === "Deceased" && (
            <>
              {additionalFields.map((opt) => (
                <Input
                  {...opt}
                  key={opt.name}
                  value={formData[opt.name]}
                  onChange={handleChange}
                />
              ))}
              <div>
                <span>Enter Date of death</span>
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
                      mode="single"
                      {...dayPickerProps}
                      className="rounded-md border"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </>
          )}
          <SeparatorInput
            label="Add interesting facts, seperate with comma"
            placeholder="Enter Interesting Facts"
            tags={facts}
            onTagsChange={setFacts}
            parentClass={cn(status !== "Deceased" && "sm:col-span-2")}
          />

          <div className="sm:col-span-2">
            <AlmostThereDropBox
              file={file}
              className="h-40"
              onFileDelete={() => setFile(undefined)}
              onChange={handleFileUpload}
            />
          </div>
        </div>
      </div>
      <div className="my-8 flex items-center justify-between gap-6">
        <Button
          className="border border-primary bg-transparent text-black lg:w-fit lg:border-none lg:px-0"
          onClick={onPrevClick}
        >
          <ArrowLeftIcon className="h-4 w-4" /> Back
        </Button>
        <Button loading={loading} className="" disabled={loading} type="submit">
          Continue
        </Button>
      </div>
    </form>
  );
};

export default FirstForm;
