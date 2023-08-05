/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { toast } from "react-toastify";
import { AiFillEye, AiOutlineDelete } from "react-icons/ai";

import { cn } from "@/base/utils";
import PhotoFlowLoader from "../PhotoFlowLoader";

// photos
// import photo1 from "public/assets/photoFlow-1.png";
// import photo2 from "public/assets/photoFlow-2.png";
// import photo3 from "public/assets/photoFlow-3.png";
// import photo4 from "public/assets/family-legacy.png";
// import photo5 from "public/assets/user-2.png";
// import photo6 from "public/assets/user-1.png";

// const data = [
//   { id: 1, image: photo3 },
//   { id: 2, image: photo2 },
//   { id: 3, image: photo1 },
//   { id: 4, image: photo4 },
//   { id: 5, image: photo5 },
//   { id: 6, image: photo6 },
// ];

type ImgJson = {
  url: string;
  aspect_ratio: string;
}[];

interface Props {
  mode: boolean;
}

const PhotoFlowAlbum = ({ mode }: Props) => {
  const [profileImages, setProfileImages] = useState<ImgJson>([]);
  const [loading, setIsLoading] = useState<boolean>(false);

  const { data: session } = useSession();

  useEffect(() => {
    const fetchProfileImages = async () => {
      if (session) {
        setIsLoading(true);
        const customRequest = {
          method: "GET",
          headers: {
            authorization: `Bearer ${session?.user.accessToken}`,
          },
        };

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/person`,
            customRequest
          );

          if (res && res.ok) {
            // toast.success("Photo Updated successful");
            const { data: resData } = await res.json();
            const imgsJson: ImgJson = [];
            const imgs = resData.images;

            if (imgs.length > 0) {
              imgs.map((img: string) => imgsJson.push(JSON.parse(img)));
              setProfileImages(imgsJson);
            }
          }
        } catch (err) {
          toast.error("Something went wrong");
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchProfileImages();
  }, [session, mode]);

  const convertToFraction = (aspectRatio: string) => {
    const [numerator, denominator] = aspectRatio.split(":").map(Number);
    return `${numerator}/${denominator}`;
  };

  return (
    <div className="my-6">
      <h3 className="text-2xl font-medium capitalize text-black">
        Your Photos
      </h3>
      {loading && <PhotoFlowLoader />}
      {!loading && (
        <div
          className={cn(
            "grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] md:grid-cols-3"
          )}
        >
          {profileImages.map(({ url, aspect_ratio }, i) => (
            <figure key={i} className={cn("gallery_fig", "overflow-hidden")}>
              <Image
                style={{ aspectRatio: convertToFraction(aspect_ratio) }}
                src={url}
                alt={`photo-${i + 1}`}
                width="100"
                height="100"
                className={cn("gallery_img", "block h-full w-full rounded-xl")}
              />
              <figcaption
                className={cn(
                  "gallery_caption",
                  "relative left-[38%] top-[-50%] flex items-center text-center text-2xl uppercase text-gray-100 opacity-0"
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
            </figure>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoFlowAlbum;
