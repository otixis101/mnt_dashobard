import React from "react";
import AppLayout from "@/components/Layouts/AppLayout";
import TreeMember from "@/components/organisms/Dashboard/TreeMember";

const index = () => (
  <AppLayout hideSpirals showUser>
    <TreeMember />
  </AppLayout>
);

export default index;
