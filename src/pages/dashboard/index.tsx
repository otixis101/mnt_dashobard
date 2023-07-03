import { useSession } from "next-auth/react";
import React from "react";

const Dashboard = () => {
  const { data } = useSession();

  console.log(data);

  return <div>Hello</div>;
};

export default Dashboard;
