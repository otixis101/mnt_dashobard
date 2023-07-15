import AuthLayout from "@/components/Layouts/AuthLayout";
import SignUpForm from "@/components/molecules/SignUpForm";
import Image from "next/image";
import BgImage from "public/assets/signup-bg.png";

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
                <SignUpForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </AuthLayout>
);

export default SignInPage;
