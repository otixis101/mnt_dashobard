import AboutIconGroup from "@/components/molecules/About/AboutIconGroup";
import Image from "next/image";
import GroupedPeople from "public/assets/about-people-group.png";

const AboutFirstSection = () => (
  <section id="about" className="container mx-auto">
    <div className="grid items-center gap-8 py-11 sm:grid-cols-2 md:px-5  lg:justify-between lg:px-0">
      <div className="flex items-center justify-center">
        <AboutIconGroup />
      </div>
      <div className="lg:max-w-[80%]">
        <Image
          src={GroupedPeople}
          alt="people"
          className="mx-auto max-sm:max-w-[330px]"
        />
      </div>
    </div>
  </section>
);

export default AboutFirstSection;
