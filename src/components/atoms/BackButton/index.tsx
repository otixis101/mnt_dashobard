import { useRouter } from "next/router";
import React from "react";
import { BiArrowBack } from "react-icons/bi";

const BackArrow = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  return (
    <button onClick={handleBack} type="button">
      <BiArrowBack className="h-8 w-12 cursor-pointer md:h-12 md:w-14" />
    </button>
  );
};

export default BackArrow;
