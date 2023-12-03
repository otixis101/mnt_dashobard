/* eslint-disable @typescript-eslint/no-shadow */
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Axios from "axios";
import Link from "next/link";

interface Document {
  id: string;
  name: string;
  url: string;
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

  const handleDeleteAction = async (id: string) => {
    try {
      setError("");
      await Axios.delete(`${ process.env.NEXT_PUBLIC_API_BASE_URL }/document/${ session?.user.personId }/delete-document/${ id }`, {
        headers: {
          Authorization: `Bearer ${ session?.user.accessToken }`,
        },
      });
      setDocuments((documents ?? []).filter(document => document.id !== id));
    } catch (error) {
      setError("Failed to delete document");
    }
  };

  return (
    <div className="col-span-10 lg:bg-[#F3F3F3] rounded-3xl lg:py-10 lg:px-7 flex flex-col gap-5 font-">
      <form action="search_results.html" method="GET" className="hidden lg:flex gap-3 justify-center ">
        <input className="rounded-full w-80 pl-4 bg-gray-400 border-none" type="text" name="search" placeholder="Search..." />
        <button type="button" className="rounded-lg bg-black p-1 px-8 text-white">Search</button>
      </form>
      <p className="font-bold">Recent Uploads</p>
      <div className="flex flex-wrap lg:gap-10 gap-4">
        {documents?.map((document) => (
          <div key={document.id} className="">
            <Link href={document.url} type="button" className="flex flex-col gap-1 items-center justify-center">
              <Image src="/assets/icon/pdf.svg" alt="document" width={50} height={50} />
              <p className="lg:text-xs text-[11px]">{document.name}</p>
            </Link>
            <button
              onClick={() => handleDeleteAction(document.id)}
              type="button"
              className="bg-[#ef4444] text-white cursor-pointer flex items-center w-full justify-center px-3 py-1 rounded-lg text-sm gap-2">
              delete
            </button>
          </div>
        ))}
      </div>
      <div>
        {error && <p>Error: {error}</p>}
      </div>
    </div >
  );
};

export default VaultsRecentUpload;
