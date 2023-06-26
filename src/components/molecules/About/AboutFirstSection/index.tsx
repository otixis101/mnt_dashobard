import AboutIconGroup from "@/components/molecules/About/AboutIconGroup";
import Image from "next/image";
import GroupedPeople from "public/assets/about-people-group.png";

const AboutFirstSection = () => (
  <section className="container mx-auto">
    <div className="grid items-center gap-8 py-11 sm:grid-cols-2 lg:justify-between">
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