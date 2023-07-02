import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { navLinks } from "@/components/constants";
import Image from "next/image";
import Logo from "public/logo.webp";
import Button from "@/components/atoms/Button";
import { HiMenu } from "react-icons/hi";

interface Props {
  hideButton?: true;
  menu?: typeof navLinks;
}

const MobileMenu = ({ hideButton, menu = navLinks }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger>
        <span className="sr-only">Toggle Menu</span>
        <HiMenu size={32} />
      </Dialog.Trigger>

      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay forceMount />
            <Dialog.Content forceMount asChild>
              <motion.div
                initial={{ x: "-100vw", scaleX: 0 }}
                exit={{ x: "-100vw", scaleX: 0 }}
                animate={{ x: 0, scaleX: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 35,
                  duration: 0.8,
                }}
                className="fixed inset-0 z-[999] overflow-y-auto bg-primary p-5 text-white"
              >
                <div className="h-full min-h-full">
                  <div className="flex items-center">
                    <Dialog.Close asChild>
                      <button
                        className="flex h-10 w-10 items-center justify-center text-white outline-none"
                        type="button"
                      >
                        <span className="sr-only">Close Menu</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="te h-8 w-8"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </Dialog.Close>
                    <Image
                      src={Logo}
                      className="ml-auto max-h-[50px] w-full max-w-[150px]"
                      alt="My Native Tree"
                    />
                  </div>

                  <ul className="text- mt-10 space-y-8 font-bold">
                    {menu.map(({ name, url }) => (
                      <li className="capitalize" key={name}>
                        <Link onClick={closeModal} href={url}>
                          {name}
                        </Link>
                      </li>
                    ))}
                    {!hideButton && (
                      <li>
                        <Button
                          intent="outline"
                          className="max-w-[108px] border-white py-3 text-white"
                        >
                          Login
                        </Button>
                      </li>
                    )}
                  </ul>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

export default MobileMenu;
