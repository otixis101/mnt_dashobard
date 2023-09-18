/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import DropboxChooser, { DropboxFile } from "react-dropbox-chooser";
import GoogleDrivePicker from "google-drive-picker";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

import googleDrive from "public/assets/icon/googleDrive.png";
import dropBox from "public/assets/icon/dropbox.png";

import Popup from "@/components/atoms/Popup";
import Button from "@/components/atoms/Button";
import { useRouter } from "next/router";
import PhotoFlowDropBox from "../PhotoFlowDropBox";

interface Props {
  onChange: (e?: boolean) => void;
  refreshCallback?: () => void;
}

interface GoogleDriveFileObject {
  description: string;
  iconUrl: string;
  id: string;
  lastEditedUtc: number;
  mimeType: string;
  name: string;
  thumbnailUrl: string;
  type: string;
  url: string;
}

const PhotoFlowPopup = ({ onChange, refreshCallback }: Props) => {
  const { data: session } = useSession();
  const [, setFileName] = useState<DropboxFile[]>([]);
  const [uploadStep, setUploadStep] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | string>();
  const router = useRouter();
  const { pathname } = router;
  const [openModal, setOpenModal] = useState<boolean>(
    !!pathname.includes("add")
  );
  const [authTocken, setauthTocken] = useState("");
  const [openPicker, authRes] = GoogleDrivePicker();

  type remoteImgObject = {
    name: string;
    url: string;
    filetype: string | undefined;
  }[];
  const imageUpload = async (imgFile?: remoteImgObject) => {
    const formData = new FormData();
    const personID = session?.user.personId;

    console.log(imgFile);

    if (!imgFile) {
      formData.append("files", file as File | string);
    } else {
      formData.append("documents", JSON.stringify(imgFile));
    }
    formData.append("personId", String(personID));
    setIsLoading(true);

    const customRequest = {
      method: "POST",
      headers: {
        authorization: `Bearer ${session?.user.accessToken}`,
      },
      body: formData,
    };

    const apiPath = imgFile ? "google-drive" : "browse-file";

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/document/${apiPath}`,
        customRequest
      );

      if (res && res.ok) {
        toast.success("Photo Updated successful");
        await refreshCallback?.();
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (authRes) {
      setauthTocken(authRes as unknown as string);
    }
  }, [authRes]);
  const onHandleImagePicker = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUploadStep((prevState) => !prevState);
      setIsDisabled(false);
    }
  };

  const onSuccess = async (files: DropboxFile[]) => {
    // console.log("chose:", files);
    files.map((_file: DropboxFile) =>
      setFileName((fileNames) => [...fileNames, _file])
    );

    setUploadStep(true);
    setIsDisabled(false);

    const imgObject = files.map((_file) => ({
      name: _file.name,
      url: _file.link,
      filetype: _file.name.split(".").pop(),
    }));

    imageUpload(imgObject);
  };

  const onGoogleSuccess = async (files: GoogleDriveFileObject[]) => {
    const imgObject = files.map((_file) => ({
      name: _file.name,
      url: _file.url,
      filetype: _file.name.split(".").pop(),
    }));

    imageUpload(imgObject);
  };

  useEffect(() => {
    if (pathname.includes("add")) {
      setOpenModal(true);
    }
  }, [pathname]);
  const imageUploadToApi = async () => imageUpload();

  const handleGooglePickerOpen = () => {
    openPicker({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_DRIVE_CLIENT_ID as string,
      developerKey: process.env.NEXT_PUBLIC_GOOGLE_DEVELOPER_KEY as string,
      viewId: "DOCS",
      token: authTocken,
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: false,
      // customScopes:['https://www.googleapis.com/auth/drive.readonly'],
      // setParentFolder:"Your-Folder-ID",
      // Other configuration options...
      callbackFunction: (data) => {
        if (data.action === "cancel") {
          console.log("User clicked cancel/close button");
        } else if (data.docs && data.docs.length > 0) {
          console.log("User selected file:", data.docs[0]);
          onGoogleSuccess(data.docs as unknown as GoogleDriveFileObject[]);
        }
      },
    });
  };

  return (
    <Popup open={openModal} onChangeState={onChange}>
      <div className="flex flex-col justify-center md:m-16 [&>*]:mb-2 [&>*]:items-center [&>*]:text-center">
        <h4 className="text-2xl font-medium capitalize text-primary">
          Upload Pictures
        </h4>
        <PhotoFlowDropBox
          onHandleImagePicker={onHandleImagePicker}
          className="[&>*:not(:first-child)]:py-8"
          step={uploadStep}
        />
        <span className="grid grid-cols-[1fr,max-content,1fr] items-center gap-x-4 text-xl text-gray-700 before:block before:h-[1px] before:bg-gray-500 before:content-[''] after:block after:h-[1px] after:bg-gray-500 after:content-['']">
          or
        </span>
        <h6 className="capitalize text-gray-800">Upload from</h6>
        <div className="mx-auto mb-3 flex items-center gap-2">
          <button
            onClick={() => {
              handleGooglePickerOpen();
            }}
          >
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
              <Image width={100} src={dropBox} alt="dropbox img" className="" />
            </button>
          </DropboxChooser>
        </div>
        <Button
          disabled={isDisabled}
          onClick={imageUploadToApi}
          loading={isLoading}
          className="mx-auto mt-4"
        >
          Upload
        </Button>
      </div>
    </Popup>
  );
};

export default PhotoFlowPopup;
