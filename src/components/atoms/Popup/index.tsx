/* eslint-disable react/button-has-type */
import React, { useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

interface Props {
  title?: string;
  children: React.ReactNode;
  open?: boolean;
  onChangeState?: (e?: boolean) => void;
}

const Popup = ({ title, children, open, onChangeState }: Props) => {
  useEffect(() => {
    if (open) {
      document.getElementById("for-dialog")?.classList.add("opacity-[0.3]");
    }

    return () => {
      document.getElementById("for-dialog")?.classList.remove("opacity-[0.3]");
    };
  }, [open]);

  return (
    <Dialog.Root open={open} onOpenChange={onChangeState}>
      <Dialog.Portal>
        <Dialog.Overlay className=" bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] z-50 max-h-[89vh] w-[90vw] max-w-[50rem] translate-x-[-50%] translate-y-[-50%] overflow-y-auto rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          {title && (
            <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
              {title}
            </Dialog.Title>
          )}
          {children}
          <Dialog.Close asChild>
            <button
              type="button"
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full text-2xl focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Popup;
