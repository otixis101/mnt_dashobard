import {
  AboutSectionHeading,
  AboutSectionText,
} from "@/components/atoms/About/Primitives";
import Image from "next/image";
import ConnectWithFamily from "public/assets/connect-with-family.png";
import MConnectWithFamily from "public/assets/mobile-desktop-application.png";
import Desktop from "public/assets/desktop-application.png";

const AboutDesktopGuide = () => (
  <section>
    <div className="bg-midpup p-10 sm:py-5">
      <div className="container mx-auto md:px-5 lg:px-0">
        <div className="grid items-center border sm:grid-cols-2 sm:gap-10">
          <div className="mx-auto px-3 sm:order-2 sm:px-0">
            <Image src={ConnectWithFamily} alt="" />
          </div>
          <div className="flex items-center justify-center sm:order-1">
            <div className="space-y-3 max-sm:text-center md:space-y-5">
              <AboutSectionHeading as="h1" className="mt-8 max-w-[14ch]">
                Connect with your family
              </AboutSectionHeading>
              <AboutSectionText className="max-w-[25ch] text-custom-black">
                Let My Native Tree be the bridge that connects generations,
                binding your family in a timeless embrace.
              </AboutSectionText>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="py-10 md:pb-14">
      <Image
        src={Desktop}
        className="mx-auto hidden sm:block"
        alt="desktop application"
      />
      <Image
        src={MConnectWithFamily}
        className="mx-auto block sm:hidden"
        alt="desktop application"
      />
      <div className="mx-auto h-2 max-w-[40%] rounded-full bg-primary sm:h-5 sm:max-w-[300px]">
        <div />
      </div>
    </div>
  </section>
);

export default AboutDesktopGuide;
