/* eslint-disable react/no-array-index-key */
import React, { useState } from "react";

import { AiFillEye, AiOutlineDelete } from "react-icons/ai";

import Popup from "@/components/atoms/Popup";

import { cn } from "@/base/utils";
import PhotoFlowLoader from "../PhotoFlowLoader";

export type ImgJson = {
  url: string;
  aspect_ratio: string;
}[];

interface PhotoFlowAlbumProps {
  images?: ImgJson;
  loading?: boolean;
}

const PhotoFlowAlbum = ({ images, loading }: PhotoFlowAlbumProps) => {
  // const convertToFraction = () => `${1000}/${100}`;

  const [openModal, setOpenModal] = useState<boolean>(false);

  const [displayImage, setDisplayImage] = useState<string | undefined>(undefined);

  const onChange = (_?: any) => {
    setOpenModal((prevState) => !prevState);
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
            {images.map(({ url }, i) => (
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
                    <button type="button" className="mr-2 flex cursor-pointer hover:bg-primary p-3 rounded-lg flex-col items-center" onClick={() => { setDisplayImage(url); setOpenModal(true); }}>
                      <AiFillEye />
                      <span className="text-xs">view</span>
                    </button>
                    <button type="button" className="flex cursor-pointer hover:bg-red-500 p-3 rounded-lg flex-col items-center">
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
