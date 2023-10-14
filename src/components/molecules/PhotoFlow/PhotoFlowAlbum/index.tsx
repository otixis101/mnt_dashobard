/* eslint-disable react/no-array-index-key */
import React from "react";

import { AiFillEye, AiOutlineDelete } from "react-icons/ai";

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
  const convertToFraction = (aspectRatio: string) => {
    // const [numerator, denominator] = aspectRatio?.split(":")?.map(Number);
    return `${ 1000 }/${ 100 }`;
  };

  return (
    <div className="my-6">
      <h3 className="text-2xl font-medium capitalize text-black">
        Your Photos
      </h3>
      {loading && <PhotoFlowLoader />}
      {images && images.length > 0 && (
        <div
          className={cn(
            "grid  grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2 md:grid-cols-3"
          )}
        >
          {images.map(({ url, aspect_ratio }, i) => (
            <figure
              key={i}
              className={cn(
                "gallery_fig",
                "relative flex flex-col self-stretch overflow-hidden"
              )}
            >
              <picture
                className="relative flex items-center justify-between"
                style={{ aspectRatio: convertToFraction(aspect_ratio) }}
              >
                <img
                  src={url}
                  alt={`gallery-${ i + 1 }`}
                  className={cn("gallery_img", "flex  rounded-xl")}
                />
                <figcaption
                  className={cn(
                    "gallery_caption",
                    "absolute left-[40%] flex items-center text-center text-2xl uppercase text-gray-100 opacity-0"
                  )}
                >
                  <span className="mr-2 flex cursor-pointer flex-col items-center">
                    <AiFillEye />
                    <span className="text-lg">view</span>
                  </span>
                  <span className="flex cursor-pointer flex-col items-center">
                    <AiOutlineDelete />
                    <span className="text-lg">delete</span>
                  </span>
                </figcaption>
              </picture>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoFlowAlbum;
