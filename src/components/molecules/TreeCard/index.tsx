import Image from "next/image";

interface TreeCardProps {
  imageSrc: string;
  personName: string;
  identity?: "you" | string;
}

const TreeCard = ({ imageSrc, personName, identity }: TreeCardProps) => (
  <div className="relative flex h-28 w-24 cursor-pointer flex-col items-center justify-end overflow-hidden rounded-lg bg-slate-500 p-2 ">
    <Image
      style={{ objectFit: "cover" }}
      src={imageSrc}
      alt="woman image"
      fill
      className=""
    />
    <div className="relative w-full rounded-md bg-blue-100 bg-opacity-20 text-black drop-shadow-md backdrop-blur-md">
      <h3 className="text-center text-base font-semibold">{personName}</h3>
    </div>
    <div className="z-10 mx-auto flex w-max -translate-y-1 items-center gap-1 rounded-full bg-stone-300 px-1">
      <div className="h-2 w-2 rounded-full border bg-green-500 " />
      <p className="text-[8px]">{identity}</p>
    </div>
  </div>
);

export default TreeCard;
