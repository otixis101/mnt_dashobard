import HeroSection from "@/components/organisms/LandingPage/HeroSection";
import LandingLayout from "@/components/Layouts/LandingLayout";
import FaqSection from "@/components/organisms/LandingPage/FaqSection";
import AboutSection from "@/components/organisms/LandingPageAbout";
import PricingSection from "@/components/organisms/LandingPage/PricingSection";
import TestimonialSection from "@/components/molecules/TestemonialSection";

const Home = () => (
  <LandingLayout type="website">
    <HeroSection />
    <AboutSection />
    <TestimonialSection />
    <PricingSection />
    <FaqSection />
  </LandingLayout>
);

export default Home;
