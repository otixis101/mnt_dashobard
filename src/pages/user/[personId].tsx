import React from "react";
import AppLayout from "@/components/Layouts/AppLayout";
import TreeMember from "@/components/organisms/Dashboard/TreeMember";

const index = () => (
  <AppLayout hideSpirals showUser image="/assets/user-1.png" name="Hi, Amara">
    <TreeMember />
  </AppLayout>
);

export default index;
