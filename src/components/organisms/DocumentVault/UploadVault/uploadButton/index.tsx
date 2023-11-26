import Button from "@/components/atoms/Button";
import PhotoFlowPopup from "@/components/molecules/PhotoFlow/PhotoFlowPopup";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useRouter } from "next/router";
import {
  ImgJson,
} from "@/components/molecules/PhotoFlow/PhotoFlowAlbum";
import useFetchPerson from "@/base/hooks/api/useFetchPersonData";
// import PhotoFlowHeader from "@/components/molecules/PhotoFlow/PhotoFlowHeader";


const UploadButton = () => {

  const router = useRouter();
  const { pathname } = router;
  const { personId } = router.query;

  const [ mode, setMode ] = useState<boolean>(false);
  const [ , setgalleryImages ] = useState<ImgJson>([]);


  const { data, mutate } = useFetchPerson(personId as string);
  // eslint-disable-next-line no-underscore-dangle
  const newPersonId = data?._id;
  console.log(data);


  useEffect(() => {
    if (pathname.includes("add")) {
      setMode(true);
    } else {
      setMode(false);
    }
  }, [ pathname ]);
  useEffect(() => {
    if (data && data.images.length > 0) {
      const imgs = data.images;

      if (imgs.length > 0) {
        setgalleryImages(
          imgs.map((img) => ({
            url: img.url,
            aspect_ratio: img.aspectRatio,
          }))
        );
      }
      console.log(imgs);
    }
    console.log(data);
  }, [ data ]);


  const onChange = (_?: any) => {
    setMode((prevState) => !prevState);
    if (mode) {
      router.push(`/user/${ newPersonId }`);
    } else {
      router.push(`/user/${ newPersonId }`);
    }
  };


  const handleUploadSuccess = () => {
    mutate();
    setMode(false);
  };

  return (
    <section>
      {mode && (
        <PhotoFlowPopup
          refreshCallback={handleUploadSuccess}
          onChange={onChange}
        />
      )}
      <Button className="w-auto px-3 text-sm  flex justify-center " onClick={onChange}>
        <AiOutlinePlus /> Upload File
      </Button>

      {/* <PhotoFlowHeader onChange={onChange} /> */}

    </section>
  );

};

export default UploadButton;
