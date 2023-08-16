import React from "react";
import Image from "next/image";

import SuccessImg from "public/assets/success.png";
import Button from "@/components/atoms/Button";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  const { personId } = router.query;

  return (
    <div className="container px-4 max-sm:h-app">
      <div className="mx-auto mt-12 flex flex-col items-center justify-center gap-6 rounded-lg bg-transparent md:mt-16 md:h-96 md:w-3/6 md:border md:px-20 md:py-72 md:gradient-borders--v1">
        <figure className="flex w-3/6 flex-col items-center md:flex md:justify-center">
          <Image src={SuccessImg} alt="success icon" />
          <figcaption className="my-4 text-center text-gray-700 md:font-medium">
            Invite sent Successful
          </figcaption>
        </figure>
        <Button href={`/dashboard/tree/${personId}`} intent="outline">
          Continue to family tree
        </Button>
      </div>
    </div>
  );
};

export default Index;
