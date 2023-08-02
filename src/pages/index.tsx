import HeroSection from "@/components/organisms/LandingPage/HeroSection";
import LandingLayout from "@/components/Layouts/LandingLayout";
// import FaqSection from "@/components/organisms/LandingPage/FaqSection";
import AboutSection from "@/components/organisms/LandingPageAbout";
// import PricingSection from "@/components/organisms/LandingPage/PricingSection";
import TestimonialSection from "@/components/molecules/TestemonialSection";
// import { GetServerSidePropsContext } from "next/types";
// import { getSession } from "next-auth/react";

const Home = () => (
  <LandingLayout type="website">
    <HeroSection />
    <AboutSection />
    <TestimonialSection />
    {/* <PricingSection /> */}
    {/* <FaqSection /> */}
  </LandingLayout>
);

/* export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
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

*/

export default Home;
