import HeroSection from "@/components/organisms/LandingPage/HeroSection";
import LandingLayout from "@/components/Layouts/LandingLayout";
// import FaqSection from "@/components/organisms/LandingPage/FaqSection";
import AboutSection from "@/components/organisms/LandingPageAbout";
// import PricingSection from "@/components/organisms/LandingPage/PricingSection";
import TestimonialSection from "@/components/molecules/TestemonialSection";
import { GetServerSidePropsContext } from "next/types";
import { getSession, signOut } from "next-auth/react";
import { validateAuthToken } from "@/base/helpers/auth";

const Home = () => (
  <LandingLayout type="website">
    <HeroSection />
    <AboutSection />
    <TestimonialSection />
    {/* <PricingSection /> */}
    {/* <FaqSection /> */}
  </LandingLayout>
);

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  const { personId, accessToken } = session?.user ?? {};

  if (session) {
    const isValidToken = await validateAuthToken(accessToken ?? "");

    if (!isValidToken) {
      signOut({
        callbackUrl: "/auth/signin",
      });
      return {
        props: {},
      };
    }
    return {
      redirect: {
        destination: personId
          ? `/dashboard/tree/${personId}`
          : `/user/profile/update?step=moreinfo`,
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

export default Home;
