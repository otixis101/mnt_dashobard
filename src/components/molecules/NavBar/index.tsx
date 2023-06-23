import Button from "@/components/atoms/Button";
import Image from "next/image";
import Link from "next/link";
import Logo from "public/logo.svg";
import { GiHamburgerMenu } from "react-icons/gi";

const navLinks = [
  { name: "About", url: "#about" },
  { name: "Pricing", url: "#pricing" },
  { name: "FAQs", url: "#faqs" },
];

const NavBar = () => (
  <header className="container fixed left-0 right-0 top-0 z-10 mx-auto flex h-[100px] items-center justify-between  gap-2 py-6 max-md:px-4">
    <button
      type="button"
      className="mr-auto sm:hidden"
      aria-label="toggle menu"
    >
      <GiHamburgerMenu size={20} />
    </button>
    <Image priority src={Logo} alt="My Native Tree" />
    <nav className="ml-auto flex w-full max-w-fit items-center justify-between gap-2 text-white sm:max-w-[300px] md:max-w-[400px]">
      {navLinks.map(({ name, url }) => (
        <Link
          href={url}
          key={name}
          className="hidden font-extrabold sm:inline-flex"
        >
          {name}
        </Link>
      ))}
      <Button className="h-8 px-0 py-1 max-sm:w-[70px] sm:h-12 sm:max-w-[100px] sm:py-3 md:max-w-[164px]">
        Log in
      </Button>
    </nav>
  </header>
);

export default NavBar;
