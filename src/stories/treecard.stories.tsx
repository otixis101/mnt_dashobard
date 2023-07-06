import { Meta, StoryObj } from "@storybook/react";
import TreeCard from "@/components/molecules/TreeCard";

const meta: Meta<typeof TreeCard> = {
  title: "UI/Treecard",
  component: TreeCard,
};

export default meta;

type Story = StoryObj<typeof TreeCard>;

export const treeCard: Story = {
  args: {
    imageSrc:
      "https://freepngimg.com/download/girl/147846-professional-woman-business-png-file-hd.png",
    personName: "Adams Mary",
    identity: "You",
  },
};
