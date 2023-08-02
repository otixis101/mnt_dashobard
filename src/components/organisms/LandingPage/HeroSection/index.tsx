import Button from "@/components/atoms/Button";

const LandingPageHeroSection = () => (
  <section className="relative h-[450px] overflow-hidden bg-[url(/assets/sm-hero_bg.jpg)] bg-cover bg-center bg-no-repeat text-white lg:h-[550px] lg:bg-[url(/assets/hero_bg.jpg)] xl:h-screen">
    <div className="hidden xl:block">
      <div className="hero-image absolute inset-0 translate-y-[3%] bg-contain bg-center bg-no-repeat" />
    </div>
    <div className="relative grid h-full place-content-center px-4 text-center">
      <div className="z-[1] space-y-5 max-sm:mb-10 max-sm:mt-28 sm:mt-10">
        <h1 className="mx-auto max-w-[20ch] text-3xl font-extrabold leading-[1.1] max-md:capitalize sm:max-w-[26ch] md:text-4xl lg:text-[50px] lg:leading-[55px] xl:text-[64px] xl:leading-[68px]">
          Cultivating heritage, uniting families, preserving legacies
        </h1>

        <div className="pt-3 xl:pt-5">
          <Button
            // href="/auth/signin"
            href="https://waitlist.mynativetree.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto block max-md:max-w-[200px] max-sm:max-w-[180px]"
          >
            Join the waitlist today
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default LandingPageHeroSection;
