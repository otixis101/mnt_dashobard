import React, { useState } from "react";
import PhotoFlowHeader from "@/components/molecules/PhotoFlow/PhotoFlowHeader";
import PhotoFlowAlbum from "@/components/molecules/PhotoFlow/PhotoFlowAlbum";
import PhotoFlowPopup from "@/components/molecules/PhotoFlow/PhotoFlowPopup";

const Main = () => {
  const [mode, setMode] = useState<boolean>(false);

  const onChange = (_?: any) => setMode((prevState) => !prevState);

  return (
    <section className="container">
      {mode && <PhotoFlowPopup mode={mode} onChange={onChange} />}
      <PhotoFlowHeader onChange={onChange} />
      <PhotoFlowAlbum mode={mode} />
    </section>
  );
};

export default Main;
