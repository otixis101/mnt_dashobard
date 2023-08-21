/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from "react";
import DropboxChooser, { DropboxFile } from "react-dropbox-chooser";
import Image from "next/image";
import { toast } from "react-toastify";
import GoogleDrivePicker from "google-drive-picker";

import googleDrive from "public/assets/icon/googleDrive.png";
import dropBox from "public/assets/icon/dropbox.png";
import { useSession } from "next-auth/react";

import Popup from "@/components/atoms/Popup";
import Button from "@/components/atoms/Button";
import UserProfileDropBox from "../UserProfileDropBox";

interface Props {
  mode: boolean;
  onChange: (e?: boolean) => void;
  personId: string;
}

const UserProfileSettingPopup = ({ mode, onChange, personId }: Props) => {
  const [file, setFile] = useState<File | string>();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadStep, setUploadStep] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [openModal, setOpenModal] = useState(mode);
  const [authToken, setauthToken] = useState("");
  const [openPicker, authRes] = GoogleDrivePicker();

  const { data: session } = useSession();

  const imageUpload = async (imgFile?: string) => {
    const formData = new FormData();
    if (!imgFile) {
      formData.append("profilePhoto", file as File | string);
    }
    formData.append("profilePhoto", imgFile as string);

    setIsLoading(true);
    const customRequest = {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${session?.user.accessToken}`,
      },
      body: formData,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/person/${personId}`,
        customRequest
      );

      if (res && res.ok) {
        toast.success("Profile Photo Updated successful");

        setOpenModal((prevState) => !prevState);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const imageUploadToApi = async () => imageUpload();

  const onSuccess = async (files: DropboxFile[]) => {
    setUploadStep(true);

    const [dropImg] = files;
    const imgLink = dropImg?.link as unknown as string;

    console.log(imgLink);
    try {
      imageUpload(imgLink);
    } catch (err) {
      toast.error("something went wrong");
    }
  };

  const handlePickerOpen = () => {
    openPicker({
      appId: process.env.NEXT_PUBLIC_GOOGLE_APP_ID,
      clientId: process.env.NEXT_PUBLIC_GOOGLE_DRIVE_CLIENT_ID as string,
      developerKey: process.env.NEXT_PUBLIC_GOOGLE_DEVELOPER_KEY as string,
      viewId: "DOCS_IMAGES",
      token: authToken,
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: false,
      setOrigin: "https://docs.google.com",
      customScopes: [
        "https://www.googleapis.com/auth/drive.appfolder",
        "https://www.googleapis.com/auth/drive",
      ],

      // setParentFolder:"Your-Folder-ID",
      // Other configuration options...
      callbackFunction: (data) => {
        if (data.action === "cancel") {
          console.log("User clicked cancel/close button");
        } else if (data.docs && data.docs.length > 0) {
          // console.log(data);
        }
      },
    });
  };

  const onHandleImagePicker = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    // console.log(selectedFile);
    if (selectedFile) {
      setFile(selectedFile);
      setUploadStep((prevState) => !prevState);
      setIsDisabled(false);
    }
  };

  useEffect(() => {
    if (authRes) {
      setauthToken(authRes.access_token);
    }
  }, [authRes]);

  return (
    <Popup open={openModal} onChangeState={onChange}>
      <div className="flex flex-col justify-center md:m-16 [&>*]:mb-2 [&>*]:items-center [&>*]:text-center">
        <h4 className="text-2xl font-medium capitalize text-primary">
          Upload Pictures
        </h4>
        <UserProfileDropBox
          className="[&>*:not(:first-child)]:py-8"
          onHandleImagePicker={onHandleImagePicker}
          step={uploadStep}
        />
        <span className="grid grid-cols-[1fr,max-content,1fr] items-center gap-x-4 text-xl text-gray-700 before:block before:h-[1px] before:bg-gray-500 before:content-[''] after:block after:h-[1px] after:bg-gray-500 after:content-['']">
          or
        </span>
        <h6 className="capitalize text-gray-800">Upload from</h6>
        <div className="mx-auto mb-3 flex items-center gap-2">
          <button onClick={handlePickerOpen}>
            <Image
              width={120}
              src={googleDrive}
              alt="google drive img"
              className=""
            />
          </button>
          <DropboxChooser
            appKey={process.env.NEXT_PUBLIC_DROPBOX_API_KEY as string}
            success={(files: DropboxFile[]) => onSuccess(files)}
            multiselect={false}
          >
            <button className="mt-2">
              <Image
                width={100}
                src={dropBox}
                alt="google drive img"
                className=""
              />
            </button>
          </DropboxChooser>
        </div>
        <Button
          disabled={isDisabled}
          loading={isLoading}
          type="submit"
          onClick={imageUploadToApi}
          className="mx-auto mt-4"
        >
          Upload
        </Button>
      </div>
    </Popup>
  );
};

export default UserProfileSettingPopup;
