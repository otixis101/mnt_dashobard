import { cn } from "@/base/utils";
import Image from "next/image";
import Link from "next/link";
import Logo from "public/logo-alt.webp";
import MobileMenu from "../MobileMenu";

const navLinks = [
  { name: "FAQ", url: "#" },
  { name: "About", url: "About" },
];

interface Props {
  hideLogo?: boolean;
}

const AuthNavBar = ({ hideLogo }: Props) => (
  <header className="h-[100px] duration-300 ease-in-out">
    <div className="container mx-auto flex  h-full items-center justify-between gap-2  px-3 py-6 max-md:px-4">
      <div className="text-black sm:hidden">
        <MobileMenu hideButton menu={navLinks} />
      </div>
      <Link
        href="/"
        className={cn(
          "flex w-full items-center justify-center max-sm:pl-4 sm:w-fit",
          hideLogo && "lg:hidden"
        )}
      >
        <span className="sr-only">Home</span>
        <Image
          priority
          src={Logo}
          className="max-h-[45px] max-w-[163px]"
          alt="My Native Tree"
        />
      </Link>
      <nav className="ml-auto flex w-full max-w-[100px] items-center justify-between gap-2 text-black">
        {navLinks.map(({ name, url }) => (
          <Link
            href={url}
            key={name}
            className="hidden font-semibold sm:inline-flex"
          >
            {name}
          </Link>
        ))}
      </nav>
    </div>
  </header>
);

export default AuthNavBar;
