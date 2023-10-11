import Image from "next/image";
import React from "react";

const VaultsRecentUpload = () => (
  <div className="col-span-6 lg:bg-[#F3F3F3] rounded-3xl lg:py-10 lg:px-7  flex flex-col gap-5 font-">

    <form action="search_results.html" method="GET" className=" hidden lg:flex gap-3 justify-end ">
      <input className="rounded-full w-80 pl-4 bg-gray-400 border-none" type="text" name="search" placeholder="Search..." />
      <button type="button"
        className="rounded-lg bg-black p-1 px-8 text-white">Search</button>
    </form>
    <p className="font-bold">Recent Uploads</p>

    <div className=" flex flex-wrap lg:gap-10 gap-4  ">
      <button type="button" className="flex flex-col gap-1 items-center justify-center " >
        <Image src="/assets/docs.svg" alt="docu" width={50} height={50} />
        <p className="lg:text-xs text-[11px]">Birth Certificate.PDF</p>
      </button>
      <button type="button" className="flex flex-col gap-1 items-center " >
        <Image src="/assets/docs.svg" alt="docu" width={50} height={50} />
        <p className=" md:text-xs text-[11px]">Birth Certificate.PDF</p>
      </button>
      <button type="button" className="flex flex-col gap-1 items-center " >
        <Image src="/assets/docs.svg" alt="docu" width={50} height={50} />
        <p className=" md:text-xs text-[11px]">Birth Certificate.PDF</p>
      </button>
      <button type="button" className="flex flex-col gap-1 items-center " >
        <Image src="/assets/docs.svg" alt="docu" width={50} height={50} />
        <p className=" md:text-xs text-[11px]">Birth Certificate.PDF</p>
      </button>
      <button type="button" className="flex flex-col gap-1 items-center " >
        <Image src="/assets/docs.svg" alt="docu" width={50} height={50} />
        <p className=" md:text-xs text-[11px]">Birth Certificate.PDF</p>
      </button>
      <button type="button" className="flex flex-col gap-1 items-center " >
        <Image src="/assets/docs.svg" alt="docu" width={50} height={50} />
        <p className=" md:text-xs text-[11px]">Birth Certificate.PDF</p>
      </button>
      <button type="button" className="flex flex-col gap-1 items-center " >
        <Image src="/assets/docs.svg" alt="docu" width={50} height={50} />
        <p className=" md:text-xs text-[11px]">Birth Certificate.PDF</p>
      </button>
      <button type="button" className="flex flex-col gap-1 items-center " >
        <Image src="/assets/docs.svg" alt="docu" width={50} height={50} />
        <p className=" md:text-xs text-[11px]">Birth Certificate.PDF</p>
      </button>
      <button type="button" className="flex flex-col gap-1 items-center " >
        <Image src="/assets/docs.svg" alt="docu" width={50} height={50} />
        <p className=" md:text-xs text-[11px]">Birth Certificate.PDF</p>
      </button>
      <button type="button" className="flex flex-col gap-1 items-center " >
        <Image src="/assets/docs.svg" alt="docu" width={50} height={50} />
        <p className=" md:text-xs text-[11px]">Birth Certificate.PDF</p>
      </button>

    </div>

  </div>

    <div className="col-span-6 lg:bg-[#F3F3F3] rounded-3xl lg:py-10 lg:px-7  flex flex-col gap-5 font-">

        <form action="search_results.html" method="GET" className=" hidden lg:flex gap-3 justify-end ">
            <input className="rounded-full w-80 bg-gray-400" type="text" name="search" placeholder="Search..." />
            <button type="button"
                className="rounded-lg bg-black p-1 px-8 text-white">Search</button>
        </form>
        <p className="font-bold">Recent Uploads</p>

        <div className=" flex flex-wrap lg:gap-10 gap-4  ">
            <div className="flex flex-col gap-1 items-center justify-center " >
                <Image src="/assets/docs.svg" alt="docu" width={50} height={50} />
                <p className="lg:text-xs text-[11px]">Birth Certificate.PDF</p>
            </div>
            <div className="flex flex-col gap-1 items-center " >
                <Image src="/assets/docs.svg" alt="docu" width={50} height={50} />
                <p className=" md:text-xs text-[11px]">Birth Certificate.PDF</p>
            </div>
            <div className="flex flex-col gap-1 items-center " >
                <Image src="/assets/docs.svg" alt="docu" width={50} height={50} />
                <p className=" md:text-xs text-[11px]">Birth Certificate.PDF</p>
            </div>
            <div className="flex flex-col gap-1 items-center " >
                <Image src="/assets/docs.svg" alt="docu" width={50} height={50} />
                <p className=" md:text-xs text-[11px]">Birth Certificate.PDF</p>
            </div>
            <div className="flex flex-col gap-1 items-center " >
                <Image src="/assets/docs.svg" alt="docu" width={50} height={50} />
                <p className=" md:text-xs text-[11px]">Birth Certificate.PDF</p>
            </div>
            <div className="flex flex-col gap-1 items-center " >
                <Image src="/assets/docs.svg" alt="docu" width={50} height={50} />
                <p className=" md:text-xs text-[11px]">Birth Certificate.PDF</p>
            </div>
            <div className="flex flex-col gap-1 items-center " >
                <Image src="/assets/docs.svg" alt="docu" width={50} height={50} />
                <p className=" md:text-xs text-[11px]">Birth Certificate.PDF</p>
            </div>
            <div className="flex flex-col gap-1 items-center " >
                <Image src="/assets/docs.svg" alt="docu" width={50} height={50} />
                <p className=" md:text-xs text-[11px]">Birth Certificate.PDF</p>
            </div>
            <div className="flex flex-col gap-1 items-center " >
                <Image src="/assets/docs.svg" alt="docu" width={50} height={50} />
                <p className=" md:text-xs text-[11px]">Birth Certificate.PDF</p>
            </div>
            <div className="flex flex-col gap-1 items-center " >
                <Image src="/assets/docs.svg" alt="docu" width={50} height={50} />
                <p className=" md:text-xs text-[11px]">Birth Certificate.PDF</p>
            </div>

        </div>

    </div>

);

export default VaultsRecentUpload;
