/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from "react";

import { AiFillEye, AiOutlineDelete } from "react-icons/ai";

import { cn } from "@/base/utils";
import useFetchPerson from "@/base/hooks/api/useFetchPersonData";
import { useRouter } from "next/router";
import PhotoFlowLoader from "../PhotoFlowLoader";

type ImgJson = {
  url: string;
  aspect_ratio: string;
}[];

// interface Props {
//   mode?: boolean;
// }

const PhotoFlowAlbum = () => {
  const router = useRouter();
  const { personId } = router.query;
  const [galleryImages, setgalleryImages] = useState<ImgJson>([]);

  const { data, isLoading } = useFetchPerson(personId as string);

  console.log(data);

  useEffect(() => {
    if (data && data.images.length > 0) {
      const imgsJson: ImgJson = [];
      const imgs = data.images;

      if (imgs.length > 0) {
        imgs.map((img: string) => imgsJson.push(JSON.parse(img)));
        setgalleryImages(imgsJson);
      }
    }
  }, [data]);

  const convertToFraction = (aspectRatio: string) => {
    const [numerator, denominator] = aspectRatio.split(":").map(Number);
    return `${numerator}/${denominator}`;
  };

  return (
    <div className="my-6">
      <h3 className="text-2xl font-medium capitalize text-black">
        Your Photos
      </h3>
      {isLoading && <PhotoFlowLoader />}
      {galleryImages.length > 0 && (
        <div
          className={cn(
            "grid  grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2 md:grid-cols-3"
          )}
        >
          {galleryImages.map(({ url, aspect_ratio }, i) => (
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
                  alt={`gallery-${i + 1}`}
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
