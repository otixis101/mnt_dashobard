
import BackArrow from "@/components/atoms/BackButton";
import React from "react";
// icons
import { RxCaretRight } from "react-icons/rx";
import UploadLink from "../UploadVault/UploadLink";


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
      <div className=" md:hidden ">

        <UploadLink />
      </div>

    </nav>
  </header>
);

export default VaultBackArrow;
