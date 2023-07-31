import React from "react";
import UserProfileHeader from "@/components/molecules/UserProfile/UserProfileHeader";
import UserProfileBody from "@/components/molecules/UserProfile/UserProfileBody";

const index = () => (
  <section className="container my-2 h-[99vh]">
    <UserProfileHeader />
    <UserProfileBody />
  </section>
);

export default index;
