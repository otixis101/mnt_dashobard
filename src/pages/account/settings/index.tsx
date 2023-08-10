import React from "react";

import AppLayout from "@/components/Layouts/AppLayout";
import UserProfileSetting from "@/components/organisms/Dashboard/UserProfileSetting";

const index = () => (
  <AppLayout hideSpirals showUser image="/assets/user-1.png" name="Hi, Amara">
    <UserProfileSetting />
  </AppLayout>
);

export default index;
