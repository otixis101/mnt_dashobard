import SuggestionCard from "@/components/molecules/Switch/SuggestionCard";
import { Meta } from "@storybook/react";
import ProfileImage from "public/assets/hero_bg.jpg";
import AssignedByImage from "public/assets/family-legacy.png";

export default {
  title: "UI/Suggestion Card",
  component: SuggestionCard,
  argTypes: {},
} as Meta<typeof SuggestionCard>;

/** Using static image data as stories is configured not to resolve absolute paths
 *
 * @see story.ts
 */
export const Default = {
  args: {
    addedBy: {
      name: "A Really Long Name",
      image: AssignedByImage,
    },
    profileImage: ProfileImage,
    name: "Another Long Name",
    state: "Rivers State, Nigeria",
  },
};
