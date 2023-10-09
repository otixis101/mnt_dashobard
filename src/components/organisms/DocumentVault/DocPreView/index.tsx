/* eslint-disable arrow-body-style */
/* eslint-disable indent */
import Image from "next/image";
import React from "react";

const DocPreView = () => {
    return (
        <div className="col-span-4 flex flex-col  text-black gap-5 justify-c py-10 items-center bg-[#F3F3F3] rounded-3xl p-4">
            <div className="flex justify-between items-center w-full px-4">
                <div className=" flex justify-center items-center gap-2 ">
                    <Image src="/assets/docs.svg" alt="" width={30} height={30} />
                    <p className="text-sm">Birth Certificate.PDF</p>
                </div>
                <button type="button" className="bg-[#F3F3F3] border-2  border-gray-500 font-base  px-7 py-1 rounded-md w-auto text-black">
                    Rename
                </button>
            </div>

            <div className=" flex flex-col items-start justify-start w-full ">
                <p className="text-black px-4">Preview</p>
                <div className=" w-full border-t-2 border-gray-700 my-4" />

                <Image src="/assets/birth.svg" alt="" width={400} height={400} className="pl-4" />

                <div className="flex flex-col gap-1 mt-4 pl-4">
                    <p className="font-bold ">File Details </p>
                    <p className="font-xs">Type</p>
                    <p className="font-medium ">Portable Document Format (PDF) </p>
                    <p className="font-xs">Size</p>
                    <p className="font-medium">345 KB</p>
                    <p className="font-xs">created</p>
                    <p className="font-medium ">10 July 2023</p>

                    ImagI</div>

                <div className="flex justify-between w-full mt-4 pl-4 items-center">
                    <div className="flex gap-2">

                        <button type="button" className="bg-[#F3F3F3] border-2  border-gray-500 font-base  px-7 py-1 rounded-md w-auto text-black">
                            Open
                        </button>
                        <button type="button" className="bg-[#F3F3F3] border-2  border-gray-500 font-bas    e  px-7 py-1 rounded-md w-auto text-black">
                            Share
                        </button>
                    </div>
                    <button type="button">

                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path d="M25.3334 5.33333H20.6667L19.3334 4H12.6667L11.3334 5.33333H6.66669V8H25.3334M8.00002 25.3333C8.00002 26.0406 8.28097 26.7189 8.78107 27.219C9.28117 27.719 9.95944 28 10.6667 28H21.3334C22.0406 28 22.7189 27.719 23.219 27.219C23.7191 26.7189 24 26.0406 24 25.3333V9.33333H8.00002V25.3333Z" fill="#323232" />
                        </svg>
                    </button>
                </div>

            </div>


        </div>
    );
};

export default DocPreView;