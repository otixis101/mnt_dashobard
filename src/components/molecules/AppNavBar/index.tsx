import { cn, getUserInitials } from "@/base/utils";
import Image from "next/image";
import Link from "next/link";
import Logo from "public/logo-alt.webp";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import useMenuOnScroll from "@/base/hooks/useMenuOnScroll";
import LogoWhite from "public/logo.webp";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

import useFetchPerson from "@/base/hooks/api/useFetchPersonData";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/atoms/Popover";
import { RxAvatar, RxDashboard } from "react-icons/rx";
import { IoMdSettings } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import MobileMenu from "../MobileMenu";


const navLinks = [
  { name: "FAQ", url: "/faq" },
  { name: "About", url: "/about" },
];

export type AppNavBarProps = {
  showUser?: boolean;
};

const AppNavBar = (props: AppNavBarProps) => {
  const router = useRouter();
  const { showUser } = props;
  const [changeLogo, setChangeLogo] = useState(false);
  const { data: session, update } = useSession();
  const { personId } = router.query;

  const { data, isLoading } = useFetchPerson(
    (session?.user?.personId || `${personId}`) ?? ""
  );

  if (!session?.user?.personId && personId) {
    update({ ...session, user: { ...session?.user, personId } });
  }

  const ref = useMenuOnScroll({
    effect: () => setChangeLogo(true),
    reverseEffect: () => setChangeLogo(false),
  });

  return (
    <header
      ref={ref}
      className="sticky top-0 z-50 h-[100px] duration-300 ease-in-out"
    >
      <div className="container mx-auto flex h-full items-center justify-between gap-2 px-3 py-6 max-md:px-4">
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
          <Popover>
            <PopoverTrigger asChild>
              {!isLoading ? (
                <div className="flex cursor-pointer items-center gap-4">
                  <div className="rounded-full bg-primary/40 p-1.5">
                    {data && (
                      <div>
                        {data.profilePhotoUrl ? (
                          <>
                            {/* Desktop image */}
                            <Image
                              src={data?.profilePhotoUrl ?? ""}
                              width={50}
                              height={50}
                              priority
                              alt={data?.firstName ?? ""}
                              className="hidden h-[50px] w-[50px] rounded-full object-cover md:block"
                            />

                            {/* Mobile image */}
                            <Image
                              src={data?.profilePhotoUrl ?? ""}
                              width={40}
                              height={40}
                              priority
                              alt={data?.firstName ?? ""}
                              className="block h-[40px] w-[40px] rounded-full object-cover md:hidden"
                            />
                          </>
                        ) : (
                          <div className=" flex h-[40px] w-[40px] items-center justify-center text-2xl uppercase text-white">
                            {getUserInitials(
                              `${data?.firstName} ${data?.lastName}`
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <span className="hidden font-extrabold capitalize md:block">
                    Hi, {data?.firstName}
                  </span>
                  <span>
                    <CaretDownIcon className="w-5 h-5" />
                  </span>
                </div>
              ) : null}
            </PopoverTrigger>
            <PopoverContent className="w-40 rounded-lg bg-[#EFEFEF] p-1.5">
              <ul className="space-y-3 px-1">
                <li>
                  <Link className="flex items-center gap-2" href="/account">
                    {data && data.profilePhotoUrl ? (
                      <Image
                        src={data.profilePhotoUrl ?? ""}
                        width={20}
                        height={20}
                        priority
                        alt={data.firstName}
                        className="hidden rounded-full object-cover md:block"
                      />
                    ) : (
                      <RxAvatar className="text-xl" />
                    )}
                    <span>Profile</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center gap-2"
                    // eslint-disable-next-line no-underscore-dangle
                    href={`/dashboard/tree/${data?._id}`}
                  >
                    <RxDashboard /> <span>Dashboard</span>
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <Link
                    className="flex items-center gap-2"
                    href="/account/settings"
                  >
                    <IoMdSettings />
                    <span>Settings</span>
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <button
                    onClick={() => signOut()}
                    type="button"
                    className="flex items-center gap-2 outline-none"
                  >
                    <FiLogOut />
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </header>
  );
};

export default AppNavBar;
