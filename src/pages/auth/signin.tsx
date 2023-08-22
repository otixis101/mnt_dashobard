import AuthLayout from "@/components/Layouts/AuthLayout";
import LoginForm from "@/components/molecules/LoginForm";

import { getSession } from "next-auth/react";
import Image from "next/image";
import { GetServerSidePropsContext } from "next/types";
import BgImage from "public/assets/login-bg.png";

const SignInPage = () => (
  <AuthLayout type="website" hideLogo>
    <div className="snap-y snap-start scroll-py-20 px-3 max-lg:overflow-y-scroll max-sm:h-screen max-sm:pt-8">
      <section className="container">
        <div className="">
          <div className="grid w-full items-center gap-2 sm:h-[calc(100vh-100px)] lg:grid-cols-2">
            <div className="hidden h-full items-start justify-start pb-5 lg:flex">
              <Image
                src={BgImage}
                alt=""
                className="-mt-20 h-[calc(100%+80px)] rounded-3xl object-cover xl:h-[calc(100vh-40px)]"
              />
            </div>
            <div>
              <div className="mx-auto max-w-[90%] rounded-lg px-3 py-4 max-sm:py-0 xs:px-5 sm:px-10 sm:py-8 lg:-mt-10 lg:max-w-md lg:shadow-[0px_0px_4px_0px_rgba(0,_0,_0,_0.25)]">
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </AuthLayout>
);

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  const { personId } = session?.user ?? {};

  if (session && personId) {
    return {
      redirect: {
        destination: `/`,
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

export default SignInPage;
