import { cn, truncateString } from "@/base/utils";
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
}: TreeCardProps) => {
  const [firstName, lastName] = personName.split(" ");

  const getInitials = () => firstName[0] + lastName[0];

  return (
    <HoverCard>
      <HoverCardTrigger
        className={cn(
          "relative flex h-[118px] w-24 items-center !overflow-hidden rounded-xl bg-mnt-orange",
          identity === "you" &&
            " translate-y-2 scale-[1.15] rounded-xl border-[3.5px] border-green-500"
        )}
        asChild
      >
        <div className="h-full w-full ">
          {hasAddButton && (
            <div className="absolute -left-14 z-50 opacity-50">
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
          <div className="relative flex h-full w-full cursor-pointer flex-col items-center justify-end bg-slate-500 p-2 ">
            {imageSrc ? (
              <Image
                style={{ objectFit: "cover" }}
                src={imageSrc}
                alt={`${personName} image`}
                fill
                className=""
              />
            ) : (
              <div className="absolute bottom-0 flex h-full w-full items-center justify-center bg-mnt-orange text-4xl uppercase tracking-wider text-white">
                {getInitials()}
              </div>
            )}
            <div className="relative w-full rounded-md bg-blue-100 bg-opacity-20 text-black drop-shadow-md backdrop-blur-md">
              <h3 className="text-center text-sm ">
                {truncateString(personName, 8)}
              </h3>
            </div>
            <div className="z-10 mx-auto flex w-max -translate-y-1 items-center gap-1 rounded-full bg-stone-300 px-1">
              <div className="h-2 w-2 rounded-full border bg-green-500 " />
              <p className="text-[8px] capitalize">{identity}</p>
            </div>
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
            {imageSrc ? (
              <Image
                style={{ objectFit: "cover" }}
                src={imageSrc}
                alt={`${personName} image`}
                fill
                className="rounded-lg"
              />
            ) : (
              <div className="absolute bottom-0 flex h-full w-full items-center justify-center rounded-lg bg-mnt-orange text-4xl uppercase tracking-wider text-white">
                {getInitials()}
              </div>
            )}
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
          <Link
            href={`/user/${id}`}
            className="mt-auto h-max rounded-lg bg-primary px-5 py-1 capitalize text-white"
          >
            profile
          </Link>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default TreeCard;
