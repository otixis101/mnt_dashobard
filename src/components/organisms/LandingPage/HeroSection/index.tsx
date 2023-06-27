import Button from "@/components/atoms/Button";

const LandingPageHeroSection = () => (
  <section className="relative h-[450px] overflow-hidden bg-[url(/assets/sm-hero_bg.jpg)] bg-cover bg-center bg-no-repeat text-white lg:h-screen lg:bg-[url(/assets/hero_bg.jpg)]">
    <div className="hidden lg:block">
      <div className="hero-image absolute inset-0 translate-y-[3%] bg-contain bg-center bg-no-repeat" />
    </div>
    <div className="relative grid h-full place-content-center px-4 text-center">
      <div className="z-[1] space-y-5 max-sm:mb-10 max-sm:mt-28 sm:mt-10">
        <h1 className="mx-auto max-w-[15ch] text-3xl font-extrabold leading-[1.1] max-md:capitalize sm:max-w-[20ch] md:text-4xl lg:text-[64px] lg:leading-[68px]">
          You&apos;re not alone, connect with your roots here
        </h1>
        <p className="mx-auto max-w-[40ch] text-sm leading-tight md:max-w-[50ch] md:text-lg lg:text-[32px] lg:leading-[38px]">
          My Native Tree helps you create, preserve, and share your family
          history
        </p>
        <div className="pt-5">
          <Button className="mx-auto block max-md:max-w-[200px] max-sm:max-w-[180px]">
            Create your family tree
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default LandingPageHeroSection;
