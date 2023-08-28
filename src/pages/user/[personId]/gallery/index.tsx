import React from "react";
import AppLayout from "@/components/Layouts/AppLayout";
import PhotoFlow from "@/components/organisms/Dashboard/PhotoFlow";

const Gallery = () => (
  <AppLayout hideSpirals showUser>
    <PhotoFlow />
  </AppLayout>
);

export default Gallery;
