/* eslint-disable react/no-array-index-key */
import React, { useState } from "react";

import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { AiFillEye, AiOutlineDelete } from "react-icons/ai";

import Popup from "@/components/atoms/Popup";

import { cn } from "@/base/utils";
import Axios from "@/base/axios";
import PhotoFlowLoader from "../PhotoFlowLoader";


export type ImgJson = {
  id: string;
  _personId: string;
  url: string;
  aspect_ratio: string;
}[];

interface PhotoFlowAlbumProps {
  images?: ImgJson;
  loading?: boolean;
}

const PhotoFlowAlbum = ({ images, loading }: PhotoFlowAlbumProps) => {
  // const convertToFraction = () => `${1000}/${100}`;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  // const { personId } = router.query;

  const [openModal, setOpenModal] = useState<boolean>(false);

  const [displayImage, setDisplayImage] = useState<string | undefined>(undefined);

  const onChange = (_?: any) => {
    setOpenModal((prevState) => !prevState);
  };

  const DeletePhoto = async (id: string, personId: string) => {
    try {
      setIsLoading(true);

      const res = await Axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/:${personId}/delete-document/:${id}`
      );
      if (res) {
        toast.success("Photo was deleted successfully");
        router.reload();
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>

      <div className="my-6">
        <h3 className="text-2xl mb-4 font-medium capitalize text-black">
          Your Photos
        </h3>
        {loading && <PhotoFlowLoader />}
        {images && images.length > 0 && (
          <div
            className={cn(
              "grid  grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2 md:grid-cols-3 lg:grid-cols-4"
            )}
          >
            {images.map(({ url, _personId, id }, i) => (
              <figure
                key={i}
                className={cn(
                  "gallery_fig",
                  "relative flex flex-col aspect-square overflow-hidden"
                )}
              >
                <picture
                  className="relative flex h-full border border-dashed rounded-xl overflow-hidden items-center justify-between"

                >
                  <img
                    src={url}
                    alt={`gallery-${i + 1}`}
                    className={cn("gallery_img", "flex h-full w-full object-cover hover:scale-105")}
                  />
                  <figcaption
                    className={cn(
                      "gallery_caption",
                      "absolute inset-0 flex justify-center items-center text-center text-2xl uppercase text-gray-100 opacity-0"
                    )}
                  >
                    <button type="button" className="mr-2 flex cursor-pointer hover:bg-primary p-3 rounded-lg flex-col items-center" disabled={isLoading} onClick={() => { setDisplayImage(url); setOpenModal(true); }}>
                      <AiFillEye />
                      <span className="text-xs">view</span>
                    </button>
                    <button type="button" className="flex cursor-pointer hover:bg-red-500 p-3 rounded-lg flex-col items-center" disabled={isLoading} onClick={() => DeletePhoto(id, _personId)}>
                      <AiOutlineDelete />
                      <span className="text-xs">delete</span>
                    </button>
                  </figcaption>
                </picture>
              </figure>
            ))}
          </div>
        )}
      </div>

      <Popup open={openModal} onChangeState={onChange}>
        <div className="flex flex-col p-4">
          {
            displayImage &&
            (
              <img src={displayImage} alt={displayImage} className="w-full h-full object-contain" />
            )

          }
        </div>
      </Popup>
    </>
  );
};

export default PhotoFlowAlbum;
