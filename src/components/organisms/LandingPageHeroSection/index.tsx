import NavBar from "@/components/molecules/NavBar";
import HeroImage from "public/assets/hero_bg.jpg";

const LandingPageHeroSection = () => (
  <section
    style={{
      backgroundImage: `url(${HeroImage.src})`,
    }}
    className="relative h-[450px] overflow-hidden bg-cover bg-fixed bg-no-repeat text-white lg:h-[800px]"
  >
    <div className="hidden lg:block">
      <div className="hero-image-alt absolute inset-0 translate-y-[5%] bg-cover bg-center bg-no-repeat" />
      <div className="hero-image absolute inset-0 translate-y-[5%] bg-cover bg-center bg-no-repeat" />
    </div>
    <NavBar />
    <div className="relative grid h-[calc(100%-100px)] place-content-center px-4 text-center">
      <div className="z-[1] space-y-5 max-lg:mb-14">
        <h1 className="mx-auto max-w-[15ch] text-3xl font-extrabold leading-[1.1] max-md:capitalize sm:max-w-[20ch] md:text-4xl lg:text-[64px] lg:leading-[68px]">
          You&apos;re not alone, connect with your roots here
        </h1>
        <p className="mx-auto max-w-[40ch] text-sm leading-tight md:max-w-[50ch] md:text-lg lg:text-[32px] lg:leading-[38px]">
          My Native Tree helps you create, preserve, and share your family
          history
        </p>
      </div>
    </div>
  </section>
);

export default LandingPageHeroSection;
