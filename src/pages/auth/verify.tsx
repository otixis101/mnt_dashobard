import React, { useEffect, useState } from "react";
import Image from "next/image";
import AuthLayout from "@/components/Layouts/AuthLayout";

import MailboxImg from "public/assets/mail-box.png";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next/types";

const Verify = () => {
  const router = useRouter();
  const { email } = router.query;
  const [countDown, setCountDown] = useState(60);
  const [isLoading, setIsLoading] = useState(false);

  console.log(":::::::::::;; in verify");
  
  const handleResendEmail = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/resend-verification-email`,
        {
          method: "POST",
          body: JSON.stringify({ email }),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res && res.ok) {
        setCountDown(60);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
    <AuthLayout type="website">
      <div className="container flex items-center justify-center px-4 h-app">
        <div className="mx-auto flex flex-col items-center justify-center gap-6 rounded-lg md:h-96 md:w-2/6 md:border md:px-20 md:py-72 md:gradient-borders--v1">
          <div className="w-2/5 md:flex md:justify-center">
            <Image src={MailboxImg} alt="mail box icon" />
          </div>
          <p className="text-center max-sm:mt-5 md:text-xl">
            Sign up successful, please check email for confirmation.
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
    </AuthLayout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  const { personId } = session?.user ?? {};
  console.log("::::::::::::::::::::: in verify props");
  
  if (session) {
    return {
      redirect: {
        destination: `/dashboard/tree/${personId}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
export default Verify;
