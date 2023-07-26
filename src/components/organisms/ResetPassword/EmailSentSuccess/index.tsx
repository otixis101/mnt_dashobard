import React, { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import MailboxImg from "public/assets/mail-box.png";

interface Props {
  email: string;
}
const Index = ({ email }: Props) => {
  const [countDown, setCountDown] = useState(60);
  const [isLoading] = useState(false);
  const router = useRouter();

  const handleResendEmail = async () => {
    if (email) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/reset-password-request`,
          {
            method: "POST",
            body: JSON.stringify({ email }),
            headers: { "Content-Type": "application/json" },
          }
        );
        if (res && res.ok) {
          toast.success("password reset link sent to email");
        }
      } catch (err) {
        toast.error("Something went wrong");
      }
    } else {
      router.push(`/auth/resetpassword`);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (countDown === 0) {
        clearInterval(interval);
      }
      setCountDown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [countDown]);

  return (
    <div className="container px-4 max-sm:h-app">
      <div className="mx-auto mt-12 flex flex-col items-center justify-center gap-6 rounded-lg md:mt-24 md:h-96 md:w-3/6 md:border md:px-20 md:py-72 md:gradient-borders--v1">
        <div className="w-2/5 md:flex md:justify-center">
          <Image src={MailboxImg} alt="mail box icon" />
        </div>
        <p className="text-center font-medium text-black max-sm:mt-5 md:text-xl">
          Please check email for link to reset password.
          <button
            className="ml-1 font-semibold text-primary"
            disabled={countDown > 0 ?? isLoading}
            onClick={handleResendEmail}
            type="button"
          >
            Resend {countDown > 0 && `in (${countDown})`}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Index;
