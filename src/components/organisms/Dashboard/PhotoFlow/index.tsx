import React, { useEffect, useState } from "react";
import PhotoFlowHeader from "@/components/molecules/PhotoFlow/PhotoFlowHeader";
import PhotoFlowAlbum from "@/components/molecules/PhotoFlow/PhotoFlowAlbum";
import PhotoFlowPopup from "@/components/molecules/PhotoFlow/PhotoFlowPopup";
import { useRouter } from "next/router";

const Main = () => {
  const router = useRouter();
  const { pathname } = router;
  const { personId } = router.query;

  const [mode, setMode] = useState<boolean>(false);

  useEffect(() => {
    if (pathname.includes("add")) {
      setMode(true);
    } else {
      setMode(false);
    }
  }, [pathname]);

  const onChange = (_?: any) => {
    setMode((prevState) => !prevState);
    if (mode) {
      router.push(`/user/${personId}/gallery/add`);
    } else {
      router.push(`/user/${personId}/gallery`);
    }
  };

  return (
    <section className="container">
      {mode && <PhotoFlowPopup onChange={onChange} />}
      <PhotoFlowHeader onChange={onChange} />
      <PhotoFlowAlbum />
    </section>
  );
};

export default Main;
