import useFetchPerson from "@/base/hooks/api/useFetchPersonData";
import PhotoFlowAlbum, {
  ImgJson,
} from "@/components/molecules/PhotoFlow/PhotoFlowAlbum";
import PhotoFlowHeader from "@/components/molecules/PhotoFlow/PhotoFlowHeader";
import PhotoFlowPopup from "@/components/molecules/PhotoFlow/PhotoFlowPopup";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Main = () => {
  const router = useRouter();
  const { pathname } = router;
  const { personId } = router.query;

  const [mode, setMode] = useState<boolean>(false);
  const [galleryImages, setgalleryImages] = useState<ImgJson>([]);
  const { data, isLoading, mutate } = useFetchPerson(personId as string);

  useEffect(() => {
    if (pathname.includes("add")) {
      setMode(true);
    } else {
      setMode(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (data && data.images.length > 0) {
      const imgs = data.images;

      if (imgs.length > 0) {
        setgalleryImages(
          imgs.map((img: Record<string, string>) => ({
            url: img.url,
            aspect_ratio: img.aspectRatio,
          }))
        );
      }
      console.log(imgs);
    }
    console.log(data);
  }, [data, mode, mutate]);

  const onChange = (_?: any) => {
    setMode((prevState) => !prevState);

    if (!mode) {
      router.push(`/user/${personId}/gallery/add`);
    } else {
      router.push(`/user/${personId}/gallery`);
    }
  };

  const handleUploadSuccess = () => {
    mutate();
    setMode(false);
  };

  return (
    <section className="container">
      {mode && (
        <PhotoFlowPopup
          refreshCallback={handleUploadSuccess}
          onChange={onChange}
        />
      )}
      <PhotoFlowHeader onChange={onChange} />
      <PhotoFlowAlbum loading={isLoading} images={galleryImages} />
    </section>
  );
};

export default Main;
