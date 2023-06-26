import AboutIconBox from "@/components/atoms/About/AboutIconBox";
import PlantIcon from "public/assets/plant-tree.svg";
import WaterIcon from "public/assets/water-tree.svg";
import WatchIcon from "public/assets/watch-tree.svg";

const AboutIconGroup = () => (
  <div className="space-y-8">
    <AboutIconBox icon={PlantIcon} text="Plant a tree for your ancestors" />
    <div className="ml-4 flex items-center gap-2 md:gap-3">
      <div className="mr-4 h-6 w-6 rounded-full bg-pale-orange md:h-8 md:w-8" />
      <AboutIconBox
        icon={WaterIcon}
        text="Water it with stories and memories"
        variant="white"
      />
    </div>
    <AboutIconBox icon={WatchIcon} text="Watch it grow into a legacy" />
  </div>
);

export default AboutIconGroup;
