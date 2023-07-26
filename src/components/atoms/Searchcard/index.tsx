import Image from "next/image";

interface SearchCardProps {
  title: string;

  image: string;
  onClick(): void;
}

const SearchCard = ({ title, image, onClick }: SearchCardProps) => (
  <button
    type="button"
    onClick={onClick}
    className="relative flex h-44 w-40 flex-col items-center justify-end rounded-lg border-none bg-white p-4 shadow-lg"
  >
    <Image fill src={image} alt="" className="" />

    <div className="flex h-1/4 w-full flex-col items-center justify-center rounded-lg bg-violet-200 bg-opacity-70 backdrop-blur-sm">
      <h4 className="">{title}</h4>
    </div>
  </button>
);

export default SearchCard;
