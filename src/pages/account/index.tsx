import React from "react";

import AppLayout from "@/components/Layouts/AppLayout";
import UserProfile from "@/components/organisms/Dashboard/UserProfile";

const Index = () => (
  <AppLayout hideSpirals showUser>
    <UserProfile />
  </AppLayout>
);

export default Index;
