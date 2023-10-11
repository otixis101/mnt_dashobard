
import Image from "next/image";
import Link from "next/link";
import React from "react";

import UploadButton from "./uploadButton";

const UploadVault = () => (
  <div className=" hidden lg:flex flex-col gap-5 justify-between py-10 items-center bg-[#F3F3F3] col-span-2 rounded-3xl">

    <div className=" flex flex-col gap-8 w-full" >
      <div className="flex justify-center">
        <UploadButton />
      </div>
      <div className="flex flex-col  justify-end text-left w-full pl-4 gap-7  ">

        <Link href="a" className="flex gap-4 ">
          <Image src="/assets/vaulticon.svg" alt="" width={20} height={20} />
          <p>Document Vault</p>
        </Link>

        <Link href="a" className="flex gap-4">
          <Image src="/assets/user.svg" alt="" width={20} height={20} />
          <p>Share With Me </p>
        </Link>
      </div>
    </div>
    <div className="text-left w-full pl-4 font-bold gap-1 flex flex-col mb-16  ">
      <p>Storage Space</p>
      <Image src="/assets/line.svg" alt="" width={150} height={20} />
      <p className="font-normal text-xs">0gb of 25gb used</p>

    </div>


  </div>
);

export default UploadVault;