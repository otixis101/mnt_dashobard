import { Meta, StoryObj } from "@storybook/react";
import Radio from "@/components/atoms/Input/Radio";

const meta: Meta<typeof Radio> = {
  title: "UI/Radio",
  component: Radio,
};

export default meta;

type Story = StoryObj<typeof Radio>;

export const progress: Story = {
  args: {
    options: ["Male", "Female", "Other"],
    label: "Select Gender",
  },
};
