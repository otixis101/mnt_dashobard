import React from "react";
import Image from "next/image";

import SuccessImg from "public/assets/success.png";
import Button from "@/components/atoms/Button";

const Index = () => (
  <div className="container px-4 max-sm:h-app">
    <div className="mx-auto mt-12 flex flex-col items-center justify-center gap-6 rounded-lg md:mt-24 md:h-96 md:w-2/6 md:border md:px-20 md:py-72 md:gradient-borders--v1">
      <figure className="flex w-2/5 flex-col md:flex md:justify-center">
        <Image src={SuccessImg} alt="success icon" />
        <figcaption className="my-4 text-gray-700 md:font-medium">
          Reset Successful
        </figcaption>
      </figure>
      <Button href="/auth/signin" intent="outline">
        Continue
      </Button>
    </div>
  </div>
);

export default Index;
