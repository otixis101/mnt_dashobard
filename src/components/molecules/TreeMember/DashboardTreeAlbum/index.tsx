import { cn } from "@/base/utils";
import React from "react";
import Image from "next/image";
import Button from "@/components/atoms/Button";
import { useRouter } from "next/router";

interface DashboardPhotoAlbumProps {
  imagesUrls?: string[];
}
const DashboardPhotoAlbum = ({ imagesUrls }: DashboardPhotoAlbumProps) => {
  const router = useRouter();
  const { personId } = router.query;

  const imagePreset = Array.from({ length: 3 }, (_, i) => i + 1);

  return (
    <div className="fixed -bottom-4 z-50 flex h-48 w-full place-content-center ">
      {imagePreset.map((image, i) => (
        <div
          key={image}
          className={cn(
            "absolute mr-6 h-[200%] w-5/6 overflow-hidden rounded-3xl md:w-3/5",
            i === 0 && "top-16 z-[53] bg-gray-200",
            i === 1 && "top-8 z-[52] scale-[95%] bg-gray-400",
            i === 2 && "-top-1 z-[51] -scale-[85%] bg-gray-600"
          )}
        >
          {imagesUrls && imagesUrls[i] !== undefined && (
            <Image src={imagesUrls[i]} fill alt="album" />
          )}
        </div>
      ))}
      <Button
        href={`/user/${personId}/gallery`}
        intent="primary"
        className="w-1/8 z-[55] mt-10 self-center rounded-full px-6"
      >
        View Album
      </Button>
    </div>
  );
};

export default DashboardPhotoAlbum;
