import { truncateString } from "@/base/utils";
import Image from "next/image";
import Link from "next/link";

interface SearchCardProps {
  title: string;
  image: string;
  userId: string;
}

const SearchCard = ({ title, image, userId }: SearchCardProps) => (
  <Link
    href={`/user/${userId}`}
    className="relative flex h-44 w-40 flex-col items-center justify-end rounded-md border-none bg-white p-4 shadow-lg md:h-52 md:w-48"
  >
    <Image fill src={image} alt={`${title}'s image`} className="" />

    <div className="flex h-1/4 w-full flex-col items-center justify-center rounded-lg bg-violet-200 bg-opacity-70 backdrop-blur-sm">
      <h4 title={title} className="">
        {truncateString(title, 10)}
      </h4>
    </div>
  </Link>
);

export default SearchCard;
