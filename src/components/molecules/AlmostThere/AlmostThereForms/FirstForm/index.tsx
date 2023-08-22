import React, { ChangeEvent, useState } from "react";
import Button from "@/components/atoms/Button";
import ComboBox from "@/components/atoms/ComboBox";
import Radio from "@/components/atoms/Input/Radio";
import Input from "@/components/atoms/Input";
import SeparatorInput from "@/components/atoms/Input/SeparatorInput";
import { toast } from "react-toastify";
import {
  PopoverTrigger,
  Popover,
  PopoverContent,
} from "@/components/atoms/Popover";
import { DayPickerCalendar } from "@/components/molecules/Calendar/CalendarDayPicker";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Axios from "@/base/axios";
import { cn } from "@/base/utils";
import useStore from "@/base/store";
import AlmostThereDropBox from "../../AlmostThereDropBox";

const relationships = [
  { name: "Mother", value: "mother" },
  { name: "Father", value: "father" },
  { name: "Spouse", value: "Spouse" },
  { name: "Child", value: "Child" },
  { name: "Brother", value: "brother" },
  { name: "Sister", value: "sister" },
];

const additionalFields = [
  {
    name: "placeOfBirth",
    placeholder: "Enter Birth Place",
    label: "Place of birth",
  },
  {
    name: "occupation",
    placeholder: "Occupation",
    label: "Enter occupation",
  },
  {
    name: "address",
    placeholder: "Address",
    label: "Enter Address",
  },
] as const;

const checkboxFields = [
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
type RadioFields = (typeof checkboxFields)[number]["name"];

const FirstForm = () => {
  const [status, setStatus] = useState("Living");
  const [file, setFile] = useState<File>();
  const [profilePhotoUrl, setProfilePhotoUrl] = useState("");
  const [facts, setFacts] = useState<string[]>([]);
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    placeOfBirth: "",
    sex: "",
    occupation: "",
    address: "",
    relationship: "",
  });

  const { createPersonData } = useStore();

  // This is temporary to remove typescript error message
  const relative = createPersonData as DbPersonWithOutSuggestion;

  const [loading, setLoading] = useState(false);
  const [radioValues, setRadioValues] = useState<Record<RadioFields, string>>({
    maritalStatus: "",
  });

  const { data: session } = useSession();

  const router = useRouter();

  const { query } = router;

  const handleRadioOnChange = (key: RadioFields, value: string) => {
    setRadioValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files) {
      setFile(files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (event) => {
        setProfilePhotoUrl(event.target?.result as string);
      };

      console.log(profilePhotoUrl);
    } else {
      toast.error("Please upload a file");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((c) => ({ ...c, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!query.reference) {
      toast.error("Relative reference is not defined");

      return;
    }

    if (session) {
      const { user } = session;

      const formDataPayload = new FormData();

      formDataPayload.append("profilePhoto", file as File);
      formDataPayload.append("placeOfBirth", formData.placeOfBirth);
      formDataPayload.append("facts", facts.join(","));
      formDataPayload.append("deathOfDeath", date ? String(date) : "");
      formDataPayload.append("sex", formData.sex);
      formDataPayload.append("occupation", formData.occupation);
      formDataPayload.append("address", formData.address);
      formDataPayload.append(
        "relationship",
        formData.relationship.toLowerCase()
      );
      formDataPayload.append("relativeId", relative?.personId ?? "");
      formDataPayload.append("reference", String(query.reference));
      formDataPayload.append("maritalStatus", radioValues.maritalStatus);
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
              step: "complete",
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

  return (
    <form className="pb-10" onSubmit={handleFormSubmit}>
      <div>
        <div className="grid grid-cols-1 gap-4 gap-x-8 sm:mb-4 sm:grid-cols-2">
          <Radio
            label=" Life status"
            options={["Living", "Deceased"]}
            value={status}
            onValueChange={setStatus}
            className="capitalize"
          />
          {checkboxFields.map(
            ({ Component, name, label, placeholder, options }) => (
              <fieldset key={label}>
                <Component
                  name={name}
                  placeholder={placeholder}
                  label={label}
                  parentClass="w-full"
                  options={options}
                  value={radioValues[name]}
                  onValueChange={(val) => handleRadioOnChange(name, val)}
                />
              </fieldset>
            )
          )}
          <ComboBox
            label="Relationship"
            data={relationships}
            onSelect={(val) =>
              setFormData((c) => ({ ...c, relationship: val }))
            }
            defaultValue={formData.relationship || "Choose Relationship"}
          />
          {additionalFields.map((opt) => (
            <Input
              {...opt}
              key={opt.name}
              value={formData[opt.name]}
              onChange={handleChange}
            />
          ))}
          <SeparatorInput
            label="Add interesting facts, seperate with comma"
            placeholder="Enter Interesting Facts"
            tags={facts}
            onTagsChange={setFacts}
            parentClass={cn(status !== "Deceased" && "sm:col-span-2")}
          />
          {status === "Deceased" && (
            <div>
              <span>Enter Date of death</span>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="text-light-slate-9 flex w-full items-center gap-4 text-base"
                  >
                    <Input
                      disabled
                      placeholder="Date of birth"
                      value={date ? `${format(date, "PPP")}` : ""}
                      label=""
                      parentClass="w-full"
                    />
                  </button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto bg-white p-0">
                  <DayPickerCalendar
                    // block user's from selecting a future date
                    toDate={new Date()}
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}

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
      <Button loading={loading} className="mx-auto mt-16" type="submit">
        Continue
      </Button>
    </form>
  );
};

export default FirstForm;
