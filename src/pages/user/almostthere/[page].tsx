import React from "react";

import { useRouter } from "next/router";
import AppLayout from "@/components/Layouts/AppLayout";
import AlmostFinalPage from "@/components/organisms/AlmostThere/AlmostFinalPage";
import AlmostFirstPage from "@/components/organisms/AlmostThere/AlmostFirstPage";

const Page = () => {
  const router = useRouter();

  const { page } = router.query;

  return (
    <AppLayout hideSpirals showUser>
      {page === "almost" && <AlmostFirstPage />}
      {page === "final" && <AlmostFinalPage />}
    </AppLayout>
  );
};

export default Page;
