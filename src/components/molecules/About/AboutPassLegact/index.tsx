import {
  AboutSectionHeading,
  AboutSectionText,
} from "@/components/atoms/About/Primitives";
import Image from "next/image";
import BgImage from "public/assets/family-legacy.jpg";

const AboutPassLegacy = () => (
  <div className="bg-pale-yellow py-10">
    <div className="container mx-auto px-5 md:px-5 lg:px-0">
      <div className="grid items-center gap-8 sm:grid-cols-2">
        <Image src={BgImage} alt="" className="mx-auto rounded-lg sm:order-2" />
        <div className="flex items-center justify-center text-center sm:order-1 sm:text-left">
          <div className="mx-auto space-y-4 md:space-y-5 lg:space-y-8">
            <AboutSectionHeading className="max-sm:mx-auto">
              Pass on your family&apos;s legacy
            </AboutSectionHeading>
            <AboutSectionText className="max-sm:mx-auto">
              Pass down the legacy of your family through my native tree,
              ensuring your story lives on in the hearts of those you love.
            </AboutSectionText>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AboutPassLegacy;
