/* eslint-disable consistent-return */
/* eslint-disable consistent-return */
import Button from "@/components/atoms/Button";
import { navLinks } from "@/components/constants";
import Image from "next/image";
import Link from "next/link";
import Logo from "public/logo.webp";
import useMenuOnScroll from "@/base/hooks/useMenuOnScroll";
import MobileMenu from "../MobileMenu";

const NavBar = () => {
  const ref = useMenuOnScroll();

  return (
    <header
      ref={ref}
      className="fixed left-0 right-0 top-0 z-[99] h-[100px] duration-300 ease-in-out"
    >
      <div className="container mx-auto  flex h-full items-center justify-between  gap-2 py-6 max-md:px-4">
        <div className="text-white sm:hidden">
          <MobileMenu />
        </div>
        <Link
          href="/"
          className="flex w-full items-center justify-center max-sm:pl-4 sm:w-fit"
        >
          <span className="sr-only">Home</span>
          <Image
            priority
            src={Logo}
            className="max-h-[45px] max-w-[163px]"
            alt="My Native Tree"
          />
        </Link>
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
          <Button
            href="/auth/signin"
            className="h-8 px-0 py-1 max-sm:w-[75px] max-sm:rounded sm:h-12 sm:max-w-[100px] sm:py-3 md:max-w-[164px]"
          >
            Log in
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
