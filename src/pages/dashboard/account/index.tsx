import React from "react";

import AppLayout from "@/components/Layouts/AppLayout";
import UserProfile from "@/components/organisms/Dashboard/UserProfile";

const Index = () => (
  <AppLayout hideSpirals showUser image="/assets/user-1.png" name="Hi, Amara">
    <UserProfile />
  </AppLayout>
);

export default Index;
