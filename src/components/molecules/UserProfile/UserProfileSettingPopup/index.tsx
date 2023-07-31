/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from "react";
import Image from "next/image";

import googleDrive from "public/assets/icon/googleDrive.png";
import dropBox from "public/assets/icon/dropbox.png";

import Popup from "@/components/atoms/Popup";
import Button from "@/components/atoms/Button";
import UserProfileDropBox from "../UserProfileDropBox";

interface Props {
  mode: boolean;
  onChange: (e?: boolean) => void;
}

const UserProfileSettingPopup = ({ mode, onChange }: Props) => {
  const [file, setFile] = useState<File>();
  // const [isSuccess, setSuccess] = useState<boolean>(false);

  const imageUpload = async () => {};

  const onHandleImagePicker = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);

      imageUpload();
    }
  };

  useEffect(() => {}, [file]);

  return (
    <Popup open={mode} onChangeState={onChange}>
      <div className="flex flex-col justify-center md:m-16 [&>*]:mb-2 [&>*]:items-center [&>*]:text-center">
        <h4 className="text-2xl font-medium capitalize text-primary">
          Upload Pictures
        </h4>
        <UserProfileDropBox
          onHandleImagePicker={onHandleImagePicker}
          innerClass="py-10 px:16 md:px-28 [&>button]:w-full"
        />
        <span className="grid grid-cols-[1fr,max-content,1fr] items-center gap-x-4 text-xl text-gray-700 before:block before:h-[1px] before:bg-gray-500 before:content-[''] after:block after:h-[1px] after:bg-gray-500 after:content-['']">
          or
        </span>
        <h6 className="capitalize text-gray-800">Upload from</h6>
        <div className="mx-auto mb-3 flex items-center [&>span:first-child]:mr-3">
          <button>
            <Image src={googleDrive} alt="google drive img" className="" />
          </button>
          <button>
            <Image src={dropBox} alt="google drive img" className="" />
          </button>
        </div>
        <Button className="mx-auto mt-4">Upload</Button>
      </div>
    </Popup>
  );
};

export default UserProfileSettingPopup;
