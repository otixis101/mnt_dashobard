import React from "react";

import { useRouter } from "next/router";
import AppLayout from "@/components/Layouts/AppLayout";
import AddMemberPage from "@/components/organisms/AddMemberPage";

const AddMember = () => {
  const router = useRouter();
  let query;

  const { name } = router.query;

  if (typeof name === "string") query = name;

  return (
    <AppLayout hideSpirals showUser image="/assets/user-1.png" name="Hi, Amara">
      <AddMemberPage name={query ?? "parent"} />
    </AppLayout>
  );
};

export default AddMember;
