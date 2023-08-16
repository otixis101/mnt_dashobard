import React from "react";
import AppLayout from "@/components/Layouts/AppLayout";
import PhotoFlow from "@/components/organisms/Dashboard/PhotoFlow";

const Gallery = () => (
  <AppLayout hideSpirals showUser image="/assets/user-1.png" name="Hi, Amara">
    <PhotoFlow />
  </AppLayout>
);

export default Gallery;
