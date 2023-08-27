import React from "react";

import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";

// icons
import { RxCaretRight } from "react-icons/rx";
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();

  return (
    <header className="my-3 space-y-4">
      <form className="mx-auto hidden w-[70%] items-center md:flex">
        <Input label="" parentClass="w-[90%]" />
        <Button className="ml-[-10.2rem] mt-2 w-[10rem] md:h-12">Search</Button>
      </form>
      <nav className="flex items-center justify-start gap-x-2">
        <button
          onClick={() => router.back()}
          type="button"
          className="max-md:hidden"
        >
          <BiArrowBack className="h-8 w-12 cursor-pointer md:h-12 md:w-14" />
        </button>
        <h3 className="flex items-center font-medium max-md:mb-10 md:text-xl">
          Dashboard
          <span>
            <RxCaretRight />
          </span>
          <span className="capitalize">your account</span>
        </h3>
      </nav>
    </header>
  );
};

export default Index;
