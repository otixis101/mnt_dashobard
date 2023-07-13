import React from "react";

import AddMemberForm from "@/components/molecules/AddMember/AddMemberForm";
import AddMemberHeader from "@/components/molecules/AddMember/AddMemberHeader";

interface Props {
  name: string;
}

const AddMemberPage = ({ name }: Props) => (
  <section className="container">
    <div className="w-full space-y-5 max-md:py-10 max-md:pb-20 md:space-y-7">
      <AddMemberHeader name={name} />
      <div className="mx-auto max-w-[90%] md:max-w-2xl">
        <AddMemberForm />
      </div>
    </div>
  </section>
);

export default AddMemberPage;
