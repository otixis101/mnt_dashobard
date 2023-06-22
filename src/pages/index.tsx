import { Inter } from "next/font/google";
import HeroSection from "@/components/organisms/LandingPageHeroSection";

const inter = Inter({ subsets: ["latin"] });

const Home = () => (
  <main className={inter.className}>
    <HeroSection />
  </main>
);

export default Home;
