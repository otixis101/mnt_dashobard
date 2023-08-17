import React, { useEffect } from "react";
import { useRouter } from "next/router";

import Button from "@/components/atoms/Button";
import { useSession } from "next-auth/react";

const TreeAlbums = () => {
  const { pathname, query } = useRouter();
  const { personId } = query;

  const { data: session } = useSession();

  const { personId: personIdSession } = session?.user ?? {};

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
        <Button
          href={`/user/${personId}/gallery`}
          intent="primary"
          className="mx-1 my-2 w-1/2 rounded-[2.5rem]"
        >
          View Album
        </Button>
        {personId === personIdSession && (
          <Button
            href={`/user/${personId}/gallery/add`}
            intent="outline"
            className="mx-1 my-2 w-1/2 rounded-[2.5rem]"
          >
            Add Photos
          </Button>
        )}
      </div>
    </div>
  );
};

export default TreeAlbums;
