import { cn } from "@/base/utils";
import Image from "next/image";
import Link from "next/link";
import Logo from "public/logo-alt.webp";
import { useState } from "react";
import useMenuOnScroll from "@/base/hooks/useMenuOnScroll";
import LogoWhite from "public/logo.webp";
import Avatar from "@/components/atoms/Avatar";
import MobileMenu from "../MobileMenu";

const navLinks = [
  { name: "FAQ", url: "/faq" },
  { name: "About", url: "/about" },
];

interface User {
  name: string;
  image: string;
  showUser: true;
}

interface NoUser {
  showUser?: never;
  name?: never;
  image?: never;
}

export type AppNavBarProps = User | NoUser;

const AppNavBar = (props: AppNavBarProps) => {
  const { showUser, image, name = "N/A" } = props;
  const [changeLogo, setChangeLogo] = useState(false);

  const ref = useMenuOnScroll({
    effect: () => setChangeLogo(true),
    reverseEffect: () => setChangeLogo(false),
  });

  return (
    <header
      ref={ref}
      className="sticky top-0 z-50 h-[100px] duration-300 ease-in-out"
    >
      <div className="container mx-auto flex  h-full items-center justify-between gap-2  px-3 py-6 max-md:px-4">
        <div
          className={cn(
            "sm:hidden",
            changeLogo ? "text-white" : "text-black",
            "w-full max-w-[32px]"
          )}
        >
          <MobileMenu hideButton menu={navLinks} />
        </div>
        <Link
          href="/"
          className={cn(
            "flex w-full max-w-[163px] items-center justify-center max-sm:pl-4 sm:w-fit"
          )}
        >
          <span className="sr-only">Home</span>
          <Image
            priority
            src={changeLogo ? LogoWhite : Logo}
            className="max-h-[45px] max-w-[163px]"
            alt="My Native Tree"
          />
        </Link>
        {!showUser ? (
          <nav
            className={cn(
              "ml-auto flex w-full max-w-[100px] items-center justify-between gap-2"
            )}
          >
            {navLinks.map(({ name: nnn, url }) => (
              <Link
                href={url}
                key={nnn}
                className="hidden font-semibold sm:inline-flex"
              >
                {nnn}
              </Link>
            ))}
          </nav>
        ) : (
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/40 p-1.5">
              {image ? (
                <>
                  <Image
                    src={image}
                    width={50}
                    height={50}
                    priority
                    alt={name}
                    className="hidden h-[50px] w-[50px] rounded-full object-cover md:block"
                  />
                  <Image
                    src={image}
                    width={40}
                    height={40}
                    priority
                    alt={name}
                    className="block h-[40px] w-[40px] rounded-full object-cover md:hidden"
                  />
                </>
              ) : (
                <Avatar name={name} />
              )}
            </div>
            <span className="hidden font-extrabold md:block">{name}</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default AppNavBar;
