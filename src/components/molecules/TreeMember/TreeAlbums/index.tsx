import React, { useEffect } from "react";
import { useRouter } from "next/router";

import Button from "@/components/atoms/Button";

const TreeAlbums = () => {
  const { pathname } = useRouter();

  useEffect(() => {
    if (pathname === "/dashboard/treemember") {
      document.body.classList.add("overflow-x-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-x-hidden");
    };
  }, [pathname]);

  return (
    <div className="mx-2 hidden flex-1 overflow-hidden p-2 md:flex">
      <div className="absolute top-32 z-30 flex h-[60vh] w-[30vh] flex-col items-center justify-center overflow-hidden bg-[url(/assets/bg-tree.png)] bg-cover bg-no-repeat">
        <Button intent="primary" className="mx-1 my-2 w-1/2 rounded-[2.5rem]">
          View Album
        </Button>
        <Button intent="outline" className="mx-1 my-2 w-1/2 rounded-[2.5rem]">
          Add Photos
        </Button>
      </div>
    </div>
  );
};

export default TreeAlbums;
