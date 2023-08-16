/* eslint-disable react/button-has-type */
import React, { useState } from "react";
import Image from "next/image";
import DropboxChooser, { DropboxFile } from "react-dropbox-chooser";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

import googleDrive from "public/assets/icon/googleDrive.png";
import dropBox from "public/assets/icon/dropbox.png";

import Popup from "@/components/atoms/Popup";
import Button from "@/components/atoms/Button";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";
import PhotoFlowDropBox from "../PhotoFlowDropBox";

interface Props {
  onChange: (e?: boolean) => void;
}

const PhotoFlowPopup = ({ onChange }: Props) => {
  const { data: session } = useSession();
  const [fileName, setFileName] = useState<DropboxFile[]>([]);
  const [uploadStep, setUploadStep] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | string>();
  const router = useRouter();
  const { pathname } = router;
  const { personId } = router.query;
  const { mutate } = useSWRConfig();
  const [openModal] = useState<boolean>(pathname.includes("add"));

  const imageUpload = async (imgFile?: string) => {
    const formData = new FormData();
    const personID = session?.user.personId;

    if (!imgFile) {
      formData.append("images", file as File | string);
    } else {
      formData.append("images", imgFile as string);
    }
    formData.append("personId", personID as string);
    setIsLoading(true);

    const customRequest = {
      method: "POST",
      headers: {
        authorization: `Bearer ${session?.user.accessToken}`,
      },
      body: formData,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/image-upload/browse-file`,
        customRequest
      );

      if (res && res.ok) {
        toast.success("Photo Updated successful");
        mutate(`/person?personId=${personId}`);

        router.push(`/user/${personId}/gallery`);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

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

    const [dropImg] = fileName;
    const imgLink = dropImg?.link;

    imageUpload(imgLink);
  };

  const imageUploadToApi = async () => imageUpload();

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
        <div className="mx-auto mb-3 flex items-center [&>span:first-child]:mr-3">
          <button>
            <Image src={googleDrive} alt="google drive img" className="" />
          </button>
          <DropboxChooser
            appKey={process.env.NEXT_PUBLIC_DROPBOX_API_KEY as string}
            success={(files: DropboxFile[]) => onSuccess(files)}
            multiselect={false}
          >
            <button>
              <Image src={dropBox} alt="dropbox img" className="" />
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
