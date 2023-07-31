import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/atoms/HoverCard";
import { format } from "date-fns";

import Image from "next/image";

interface TreeCardProps {
  imageSrc: string;
  personName: string;
  dob: string;
  age: number;
  identity?: "you" | string;
}

const TreeCard = ({
  imageSrc,
  personName,
  identity,
  age,
  dob,
}: TreeCardProps) => (
  <HoverCard>
    <HoverCardTrigger asChild>
      <div className="relative flex h-28 w-24 cursor-pointer flex-col items-center justify-end overflow-hidden rounded-lg bg-slate-500 p-2 ">
        <Image
          style={{ objectFit: "cover" }}
          src={imageSrc}
          alt="woman image"
          fill
          className=""
        />
        <div className="relative w-full rounded-md bg-blue-100 bg-opacity-20 text-black drop-shadow-md backdrop-blur-md">
          <h3 className="text-center text-sm ">{personName}</h3>
        </div>
        <div className="z-10 mx-auto flex w-max -translate-y-1 items-center gap-1 rounded-full bg-stone-300 px-1">
          <div className="h-2 w-2 rounded-full border bg-green-500 " />
          <p className="text-[8px]">{identity}</p>
        </div>
      </div>
    </HoverCardTrigger>
    <HoverCardContent
      side="right"
      sideOffset={6}
      className="rounded-xl bg-slate-100 p-3"
    >
      <div className="flex gap-3">
        <div className="relative h-20 w-16 overflow-hidden rounded-md ">
          <Image
            style={{ objectFit: "cover" }}
            fill
            src={imageSrc}
            alt="woman image"
          />
        </div>
        <div className="flex flex-col">
          <p className="font-semibold">{personName}</p>
          <div className="z-10   flex w-max items-center gap-0.5 rounded-lg bg-white px-1 py-0.5 ">
            <div className="h-2 w-2 rounded-full border bg-green-500 " />
            <p className="text-[10px]">{identity}</p>
          </div>
          <p className="text-sm">
            {format(new Date(dob ?? "Wed Jul 12 2023"), "PPP")}
          </p>
          <p className="text-sm">{age} Years</p>
        </div>
        <button
          className="mt-auto h-max rounded-lg bg-primary px-5 py-1 capitalize text-white"
          type="button"
        >
          profile
        </button>
      </div>
    </HoverCardContent>
  </HoverCard>
);

export default TreeCard;
