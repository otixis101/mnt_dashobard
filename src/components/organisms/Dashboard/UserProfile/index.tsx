import React from "react";

import UserProfileHeader from "@/components/molecules/UserProfile/UserProfileHeader";
import UserProfileBody from "@/components/molecules/UserProfile/UserProfileBody";

const Index = () => (
  <section className="container my-2 h-[99vh]">
    <UserProfileHeader />
    <UserProfileBody />
  </section>
);

export default Index;
