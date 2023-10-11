
import BackArrow from "@/components/atoms/BackButton";
import Button from "@/components/atoms/Button";
import React from "react";
// icons
import { RxCaretRight } from "react-icons/rx";


const VaultBackArrow = () => (
  <header className="mt-4 ">
    <nav className="flex items-center justify-between">
      <h3 className="flex items-center lg:text-xl font-bold text-sm">
                Your Account
        <span>
          <RxCaretRight />
        </span>
        <span className="capitalize">Document Vault</span>
      </h3>
      <nav className=" hidden lg:flex">

        <BackArrow />
      </nav>
      <Button className="w-auto px-3 h-4 text-sm lg:hidden flex justify-center ">
                + Upload File
      </Button>

    </nav>
  </header>
);

export default VaultBackArrow;
