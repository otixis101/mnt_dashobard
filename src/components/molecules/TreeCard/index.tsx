import Image from "next/image";

interface TreeCardProps {
  imageSrc: string;
  personName: string;
  identity?: "you" | string;
}

const TreeCard = ({ imageSrc, personName, identity }: TreeCardProps) => (
  <div
    className="flex h-[30%] w-[40%] cursor-pointer flex-col items-center justify-center rounded-[3rem] 
         border-[10px] bg-slate-500
     p-[2rem] hover:border-green-500"
  >
    <Image
      src={imageSrc}
      width={500}
      height={500}
      alt="woman image"
      className="p-8"
    />
    <div className=" absolute bottom-[6rem] rounded-[1rem] bg-blue-100 bg-opacity-20  text-black drop-shadow-lg backdrop-blur-lg">
      <h3 className=" px-[2rem] py-[1rem] text-center text-[3rem] font-semibold">
        {personName}
      </h3>
    </div>
    <div className="absolute bottom-0 z-10 mb-[65px] mt-[10px]  rounded-full bg-stone-300">
      <div className="absolute mx-3 mt-[1.2rem] h-[1.3rem] w-[1.3rem] rounded-full border bg-green-500" />
      <h2 className="px-[3rem] py-[0.25rem] text-[2rem]">{identity}</h2>
    </div>
  </div>
);

export default TreeCard;
