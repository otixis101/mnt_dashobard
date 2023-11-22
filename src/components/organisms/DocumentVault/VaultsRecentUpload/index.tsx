/* eslint-disable @typescript-eslint/no-shadow */
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Axios from "axios";

interface Document {
  id: string;
  name: string;
  // Add other properties as needed
}

const VaultsRecentUpload: React.FC = () => {
  const [ documents, setDocuments ] = useState<Document[] | null>(null);
  const [ error, setError ] = useState<string | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError("");
        const response = await Axios.get(`${ process.env.NEXT_PUBLIC_API_BASE_URL }/document/person/${ session?.user.personId }`, {
          headers: {
            Authorization: `Bearer ${ session?.user.accessToken }`,
          },
        });
        const result = response.data.data;
        setDocuments(result);
      } catch (error: any) {
        setError("Failed to fetch data");
      }
    };

    fetchData();
  }, [ session, error ]);

  return (
    <div className="col-span-6 lg:bg-[#F3F3F3] rounded-3xl lg:py-10 lg:px-7  flex flex-col gap-5 font-">
      <form action="search_results.html" method="GET" className=" hidden lg:flex gap-3 justify-end ">
        <input className="rounded-full w-80 pl-4 bg-gray-400 border-none" type="text" name="search" placeholder="Search..." />
        <button type="button" className="rounded-lg bg-black p-1 px-8 text-white">Search</button>
      </form>
      <p className="font-bold">Recent Uploads</p>
      <div className="flex flex-wrap lg:gap-10 gap-4">
        {documents?.map((document) => (
          <button key={document.id} type="button" className="flex flex-col gap-1 items-center justify-center">
            <Image src="/assets/docs.svg" alt="docu" width={50} height={50} />
            <p className="lg:text-xs text-[11px]">{document.name}</p>
          </button>
        ))}
      </div>
      <div>
        {error && <p>Error: {error}</p>}
      </div>
    </div>
  );
};

export default VaultsRecentUpload;
