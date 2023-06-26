import Image from "next/image";
import PFHIcon from "public/assets/preserve-family-history.png";
import LAYAIcon from "public/assets/learn-about-your-ancestors.png";
import {
  AboutSectionHeading,
  AboutSectionText,
} from "@/components/atoms/About/Primitives";

const AboutQuickInfo = () => (
  <section className="pb-16 md:pb-20">
    <div className="bg-pale-yellow pb-32 pt-20 text-custom-black max-md:px-4 sm:pb-20">
      <div className="container mx-auto space-y-10 sm:space-y-14">
        <AboutSectionHeading
          as="h2"
          className="mx-auto max-w-[25ch] text-center text-2xl text-custom-black sm:max-w-[30ch]"
        >
          A Secure platform to preserve your family history for generations to
          come
        </AboutSectionHeading>
        <div className="grid gap-10 sm:grid-cols-2">
          <div className="flex items-center justify-center max-sm:order-2">
            <div className="w-full max-w-[500px] space-y-3 text-center max-sm:mx-auto sm:text-left md:space-y-10">
              <AboutSectionHeading className="max-sm:mx-auto max-sm:max-w-[15ch]">
                Preserve your family history
              </AboutSectionHeading>
              <AboutSectionText className="max-sm:mx-auto max-sm:max-w-[25ch]">
                Plant your roots, preserving your family history for eternity.
              </AboutSectionText>
            </div>
          </div>
          <div className="mx-auto max-sm:order-1 max-sm:max-w-xs">
            <Image src={PFHIcon} alt="Preserve your family history" />
          </div>
        </div>
      </div>
    </div>
    <div className="container mx-auto -mt-20">
      <div className="grid gap-10 max-sm:items-center sm:grid-cols-2">
        <div className="mx-auto text-custom-black max-sm:max-w-xs">
          <Image
            src={LAYAIcon}
            className="max-sm:ml-5"
            alt="Learn about your ancestors"
          />
        </div>
        <div className="flex items-center">
          <div className="w-full space-y-3 md:space-y-10">
            <AboutSectionHeading className="max-w-[15ch] text-center max-sm:mx-auto sm:mt-20 sm:text-left lg:mt-8">
              Learn about your ancestors
            </AboutSectionHeading>
            <AboutSectionText className="max-w-[30ch] max-sm:mx-auto max-sm:text-center sm:max-w-[28ch]">
              Uncover the branches of your heritage. Unveil the secrets of your
              ancestors.
            </AboutSectionText>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutQuickInfo;
