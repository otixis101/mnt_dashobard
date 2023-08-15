import React from "react";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

import AppLayout from "@/components/Layouts/AppLayout";
import ShareTree from "@/components/organisms/ShareTree";
import ShareTreeSuccess from "@/components/organisms/ShareTree/ShareTreeSuccess";

interface AllowedQueries extends ParsedUrlQuery {
  step?: "success";
}

const Index = () => {
  const router = useRouter();

  const query = router.query as AllowedQueries;

  return (
    <AppLayout>
      <section className="relative flex items-center justify-center px-4 md:min-h-[calc(100vh-100px)]">
        {query.step === "success" ? <ShareTreeSuccess /> : <ShareTree />}
      </section>
    </AppLayout>
  );
};

export default Index;
