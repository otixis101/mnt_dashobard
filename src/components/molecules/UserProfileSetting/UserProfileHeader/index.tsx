import React from "react";
// icons
import { RxCaretRight } from "react-icons/rx";
import { BiArrowBack } from "react-icons/bi";

const UserProfileHeader = () => (
  <header>
    <nav className="flex items-center justify-between">
      <h3 className="flex items-center text-xl font-bold">
        Dash board
        <span>
          <RxCaretRight />
        </span>
        <span className="capitalize">your Account</span>
        <span>
          <RxCaretRight />
        </span>
        <span className="capitalize">Settings</span>
      </h3>
      <span>
        <BiArrowBack className="h-12 w-14 cursor-pointer" />
      </span>
    </nav>
  </header>
);

export default UserProfileHeader;
