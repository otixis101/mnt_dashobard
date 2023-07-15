import { Meta, StoryObj } from "@storybook/react";
import ProgressIndicator from "@/components/atoms/ProgressIndicator";

const meta: Meta<typeof ProgressIndicator> = {
  title: "UI/Progress",
  component: ProgressIndicator,
};

export default meta;

type Story = StoryObj<typeof ProgressIndicator>;

export const progress: Story = {
  args: {
    currentStep: 1,
    steps: 4,
  },
};
