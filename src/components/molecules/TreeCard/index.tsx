import { cn, getUserInitials, truncateString } from "@/base/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/atoms/HoverCard";
import { format } from "date-fns";

import Image from "next/image";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

interface TreeCardProps {
  imageSrc: string;
  personName: string;
  id: string;
  dob: string;
  age: number;
  identity?: "you" | string;
  hasAddButton?: boolean;
  onPlusClick?: () => void;
}

const TreeCard = ({
  imageSrc,
  personName,
  identity,
  age,
  dob,
  hasAddButton,
  onPlusClick,
  id,
}: TreeCardProps) => (
  <HoverCard>
    <HoverCardTrigger
      className={cn(
        "relative flex h-[118px]  w-24 items-center !overflow-hidden rounded-xl ",
        identity === "you" &&
          " translate-y-2 scale-[1.15] rounded-xl border-[3.5px] border-green-500"
      )}
      asChild
    >
      <div className="w-full h-full ">
        {hasAddButton && (
          <div className="absolute z-50 opacity-50 -left-14">
            <button
              type="button"
              onClick={onPlusClick}
              className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-[#898989]"
            >
              <FaPlus className="text-2xl text-[#898989]" />
            </button>
            <span className="text-[9px]">Add siblings</span>
          </div>
        )}
        <div className="relative flex flex-col items-center justify-end w-full h-full p-2 cursor-pointer ">
          {imageSrc ? (
            <Image
              style={{ objectFit: "cover" }}
              src={imageSrc}
              alt={`${personName} image`}
              fill
              className=""
            />
          ) : (
            <div className="absolute bottom-0 flex items-center justify-center w-full h-full text-4xl tracking-wider text-white uppercase bg-primary/40 ">
              {getUserInitials(personName)}
            </div>
          )}
          <div className="relative w-full text-black bg-blue-100 rounded-md bg-opacity-20 drop-shadow-md backdrop-blur-md">
            <h3 className="text-sm text-center ">
              {truncateString(personName, 8)}
            </h3>
          </div>
          <div className="z-10 flex items-center gap-1 px-1 mx-auto -translate-y-1 rounded-full w-max bg-stone-300">
            <div className="w-2 h-2 bg-green-500 border rounded-full " />
            <p className="text-[8px] capitalize">{identity}</p>
          </div>
        </div>
      </div>
    </HoverCardTrigger>
    <HoverCardContent
      side="right"
      sideOffset={6}
      className="p-3 rounded-xl bg-slate-100"
    >
      <div className="flex gap-3">
        <div className="relative w-16 h-20 overflow-hidden rounded-md ">
          {imageSrc ? (
            <Image
              style={{ objectFit: "cover" }}
              src={imageSrc}
              alt={`${personName} image`}
              fill
              className="rounded-lg"
            />
          ) : (
            <div className="absolute bottom-0 flex items-center justify-center w-full h-full text-4xl tracking-wider text-white uppercase rounded-lg bg-primary/40">
              {getUserInitials(personName)}
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <p className="font-semibold">{personName}</p>
          <div className="z-10   flex w-max items-center gap-0.5 rounded-lg bg-white px-1 py-0.5 ">
            <div className="w-2 h-2 bg-green-500 border rounded-full " />
            <p className="text-[10px]">{identity}</p>
          </div>
          <p className="text-sm">
            {format(new Date(dob ?? "Wed Jul 12 2023"), "PPP")}
          </p>
          <p className="text-sm">{age} Years</p>
        </div>
        <Link
          href={`/user/${id}`}
          className="px-5 py-1 mt-auto text-white capitalize rounded-lg h-max bg-primary"
        >
          profile
        </Link>
      </div>
    </HoverCardContent>
  </HoverCard>
);

export default TreeCard;
