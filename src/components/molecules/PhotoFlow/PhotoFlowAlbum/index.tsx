/* eslint-disable react/no-array-index-key */

import { AiFillEye, AiOutlineDelete } from "react-icons/ai";

import { cn } from "@/base/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
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
  const convertToFraction = () => `${1000}/${100}`;
  const { data: session } = useSession();
  const { query } = useRouter();
  console.log({ session });
  // const {} =

  return (
    <div className="my-6">
      <h3 className="py-2 text-2xl font-medium capitalize text-black">
        {session?.user.personId === query?.personId
          ? "Your Photos"
          : "Relative Photos"}
      </h3>
      {loading && <PhotoFlowLoader />}
      {images && images.length > 0 && (
        <div
          className={cn(
            "grid  grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2 md:grid-cols-3"
          )}
        >
          {images.map(({ url }, i) => (
            <figure
              key={i}
              className={cn(
                "gallery_fig",
                "relative flex flex-col self-stretch overflow-hidden"
              )}
            >
              <picture
                className="relative flex items-center justify-between"
                style={{ aspectRatio: convertToFraction() }}
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
