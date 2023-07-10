import React from "react";
import Image, { StaticImageData } from "next/image";
import { cn } from "@/base/utils";

import user1 from "public/assets/user3.png";
import user2 from "public/assets/user4.png";
import user3 from "public/assets/user5.png";
import user4 from "public/assets/user6.png";
import user5 from "public/assets/user7.png";

interface CardProps {
  label?: string;
  img: string | StaticImageData;
  name: string;
  className?: string;
}

const parents = [
  { name: "Ugonna Miller", img: user1 },
  { name: "chimma miller", img: user2 },
];

const childs = [
  { name: "julius miller", desc: "spouse", img: user3 },
  { name: "june miller", img: user4 },
  { name: "julian miller jnr", img: user5 },
];

const CardBox = ({ label, img, name, className }: CardProps) => (
  <div
    className={cn(
      "my-2 flex items-center rounded-lg bg-midpup p-2 text-gray-800 md:p-3",
      label && "bg-primary text-gray-200",
      className
    )}
  >
    <Image src={img} alt="user" className="mr-2 h-12 w-12 rounded-md" />
    <h2 className="mr-2 text-[1rem] font-medium capitalize md:text-lg">
      {name}
    </h2>
    {label && (
      <span className="ml-auto rounded-3xl bg-midpup p-1 text-[.7rem] text-gray-800 md:text-[1rem]">
        {label}
      </span>
    )}
  </div>
);

const FamilyMembers = () => (
  <div className="flex flex-col md:mx-8 md:w-7/12 md:p-4">
    <h2 className="text-2xl font-extrabold capitalize text-primary md:text-[2rem]">
      Family Members
    </h2>
    <div className="">
      <h4 className="mb-1 text-lg font-medium text-gray-600">Parents</h4>
      {parents.map((parent) => (
        <CardBox key={parent.name} name={parent.name} img={parent.img} />
      ))}
    </div>
    <div className="">
      <h4 className="mb-1 text-lg font-medium text-gray-600">
        Spouse & children
      </h4>
      {childs.map((child) => (
        <CardBox
          key={child.name}
          label={child.desc}
          name={child.name}
          img={child.img}
        />
      ))}
    </div>
  </div>
);

export default FamilyMembers;
