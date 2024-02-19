/* eslint-disable @typescript-eslint/no-use-before-define */
import useFetchPerson from "@/base/hooks/api/useFetchPersonData";
import { cn, getUserInitials, truncateString } from "@/base/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/atoms/HoverCard";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/atoms/Popover";
import { DialogContent } from "@/components/atoms/Popup/TestPopUp";
import { Dialog } from "@radix-ui/react-dialog";
import { format } from "date-fns";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

interface TreeCardProps {
  imageSrc: string;
  personName: string;
  id: string;
  dob?: string;
  age?: number;
  identity?: "you" | string;
  hasAddButton?: boolean;
  relationships?: string[];
  spouseIds?: string[];
  hasParent?: boolean;
}

const TreeCard = ({
  imageSrc,
  personName,
  identity,
  age,
  dob,
  hasAddButton,
  relationships,
  id,
  spouseIds,
  hasParent,
}: TreeCardProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRelationship, setRelationship] = useState("");
  console.log({ hasAddButton });
  return (
    <Dialog
      modal={false}
      open={openDialog}
      onOpenChange={(value) => setOpenDialog(value)}
    >
      <HoverCard>
        <Popover>
          <div
            className={cn(
              "relative flex h-[118px] w-24 items-center rounded-xl bg-white",
              identity === "You" &&
                " translate-y-2 scale-[1.15] rounded-xl border-[3.5px] border-green-500"
            )}
          >
            <div className="h-full w-full">
              {hasAddButton && (
                <PopoverTrigger className="absolute -left-14 top-[30%] z-[100] opacity-50">
                  <button
                    type="button"
                    aria-label="button"
                    // onClick={onPlusClick}
                    className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-[#898989]"
                  >
                    <FaPlus className="text-2xl text-[#898989]" />
                  </button>
                  <span className="text-[9px]">Add Member</span>
                </PopoverTrigger>
              )}
              <PopoverContent className="bg-slate-100">
                <h3>Select Relationship:</h3>
                <div className="mt-4 flex flex-col gap-2">
                  {relationships?.map((relationship) => (
                    <div
                      className="flex w-full flex-col"
                      key={`${id}-${relationship}`}
                    >
                      {relationship.toLowerCase() === "child" ? (
                        <button
                          className="mt-auto h-max rounded-lg bg-primary px-5 py-1 text-left capitalize text-white"
                          type="button"
                          onClick={() => {
                            setRelationship(relationship);
                            setOpenDialog(true);
                          }}
                        >
                          {relationship}
                        </button>
                      ) : relationship.toLowerCase() === "sibling" &&
                        !hasParent ? null : (
                        <Link
                          key={`${id}-${relationship}`}
                          href={`/dashboard/tree/member/add?step=bio-data&ref=${id}&relationship=${relationship.toLowerCase()}`}
                          className="mt-auto h-max rounded-lg bg-primary px-5 py-1 capitalize text-white"
                        >
                          {relationship}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </PopoverContent>

              <HoverCardTrigger
                asChild
                className="relative flex h-full w-full cursor-pointer flex-col items-center justify-end overflow-hidden rounded-lg p-2 "
              >
                <div>
                  {imageSrc ? (
                    <Image
                      style={{ objectFit: "cover" }}
                      src={imageSrc}
                      alt={`${personName} image`}
                      fill
                      className=""
                    />
                  ) : (
                    <div className="absolute bottom-0 flex h-full w-full items-center justify-center bg-primary/40 text-4xl uppercase tracking-wider text-white ">
                      {getUserInitials(personName)}
                    </div>
                  )}
                  <div className="relative w-full rounded-md bg-blue-100 bg-opacity-20 text-black drop-shadow-md backdrop-blur-md">
                    <h3 className="text-center text-sm ">
                      {truncateString(personName, 8)}
                    </h3>
                  </div>
                  <div className="z-10 mx-auto flex w-max -translate-y-1 items-center gap-1 rounded-full bg-stone-300 px-1">
                    <div className="h-2 w-2 rounded-full border bg-green-500 " />
                    <p className="text-[8px] capitalize">
                      {truncateString(identity ?? "", 14)}
                    </p>
                  </div>
                </div>
              </HoverCardTrigger>
            </div>
          </div>
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
                  <div className="absolute bottom-0 flex h-full w-full items-center justify-center rounded-lg bg-primary/40 text-4xl uppercase tracking-wider text-white">
                    {getUserInitials(personName)}
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <p className="font-semibold">{personName}</p>
                <div className="z-10   flex w-max items-center gap-0.5 rounded-lg bg-white px-1 py-0.5 ">
                  <div className="h-2 w-2 rounded-full border bg-green-500 " />
                  <p className="text-[10px]">{identity}</p>
                </div>
                {dob && (
                  <p className="text-sm">
                    {format(new Date(dob ?? "Wed Jul 12 2023"), "PPP")}
                  </p>
                )}
                {age && <p className="text-sm">{age} Years</p>}
              </div>
              <Link
                href={`/user/${id}`}
                className="mt-auto h-max rounded-lg bg-primary px-5 py-1 capitalize text-white"
              >
                profile
              </Link>
            </div>
          </HoverCardContent>
        </Popover>
      </HoverCard>
      <DialogContent className="w-72 bg-gray-400 p-4 text-white">
        {spouseIds?.length === 0 ? (
          <div>
            <h4 className="mb-4 text-center">
              You must add a spouse before adding a child
            </h4>
            <Link
              href={`/dashboard/tree/member/add?step=bio-data&ref=${id}&relationship=spouse`}
              className="mt-auto flex h-max w-full items-center justify-center rounded-lg bg-primary px-5 py-1 capitalize "
            >
              Add Spouse
            </Link>
          </div>
        ) : (
          <>
            <h3 className="mb-4">Select Spouse:</h3>
            {spouseIds?.map((uniqueId) => (
              <SpouseCard
                link={`/dashboard/tree/member/add?step=bio-data&ref=${id}&relationship=${selectedRelationship.toLowerCase()}`}
                key={uniqueId}
                id={uniqueId}
              />
            ))}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

const SpouseCard = (props: { id: string; link: string }) => {
  const { id, link } = props;

  const { data } = useFetchPerson(id);

  return (
    <div className="mb-2">
      {data && (
        <Link
          href={`${link}&ref2=${id}`}
          className="flex items-center gap-4 rounded-md bg-white"
        >
          <div className="relative h-10 w-10">
            <Image
              fill
              className="rounded-md"
              src={data?.profilePhotoUrl ?? ""}
              alt="spouse"
            />
          </div>
          <p className="text-lg text-black">{`${data.firstName} ${data.lastName}`}</p>
        </Link>
      )}
    </div>
  );
};

export default TreeCard;
