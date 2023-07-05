import AppLayout from "@/components/Layouts/AppLayout";
import { useSession } from "next-auth/react";
import React from "react";

const Dashboard = () => {
  const { data } = useSession();

  console.log(data);

  return (
    <AppLayout hideSpirals showUser image="" name="Jane Doe">
      <section className="min-h-screen">Hello</section>
    </AppLayout>
  );
};

export default Dashboard;
