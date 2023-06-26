import HeroSection from "@/components/organisms/LandingPage/HeroSection";
import LandingLayout from "@/components/Layouts/LandingLayout";
import FaqSection from "@/components/organisms/LandingPage/FaqSection";

const Home = () => (
  <LandingLayout type="website">
    <HeroSection />
    <FaqSection />
  </LandingLayout>
);

export default Home;
