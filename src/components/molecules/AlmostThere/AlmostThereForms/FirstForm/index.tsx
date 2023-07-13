import React, { useState } from "react";
import Button from "@/components/atoms/Button";
import RadioGroupBtn from "@/components/atoms/RadioGroup";
import ComboBox from "@/components/atoms/ComboBox";
import Input from "@/components/atoms/Input";
import AlmostThereDropBox from "../../AlmostThereDropBox";

const lifeStatus = [
  { name: "living", id: 1 },
  { name: "deceased", id: 2 },
];

const relationships = [
  { name: "mother", value: "1" },
  { name: "father", value: "2" },
];

const FirstForm = () => {
  const [status, setStatus] = useState("living");
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onUpdateStatus = (val: string) => {
    setStatus(val);
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:mb-8">
        <div className="">
          <label htmlFor="id" className="mb-8 capitalize text-black">
            life status
          </label>
          <RadioGroupBtn
            data={lifeStatus}
            defaultValue="living"
            wrapperClass="mt-[1rem]"
            onChangeValue={onUpdateStatus}
          />
        </div>
        <ComboBox
          label="Relationship"
          data={relationships}
          onSelect={() => {}}
        />
        {status === "deceased" ? (
          <>
            <Input
              label="Enter place of death"
              placeholder="Place of death(City, state, Country)"
            />
            <AlmostThereDropBox className="upload-box" />
            <Input
              label="Enter Date of death"
              placeholder="death date(DD/MM/YYYY)"
            />
            <div />
            <Input
              label="Add interesting facts, seperate with comma"
              placeholder="Enter Interesting Facts"
            />
          </>
        ) : (
          <>
            <AlmostThereDropBox className="h-48" />
            <Input
              label="Add interesting facts, seperate with comma"
              placeholder="Enter Interesting Facts"
            />
          </>
        )}
      </div>
      <Button className="mx-auto mt-8 md:mt-16" type="submit">
        Continue
      </Button>
    </form>
  );
};

export default FirstForm;
