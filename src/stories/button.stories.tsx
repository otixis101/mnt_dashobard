import Button from "@/components/atoms/Button";
import { Meta, StoryFn } from "@storybook/react";

// This is a dummy component to demonstrate how to use Storybook.
const meta: Meta = {
  title: "Button",
};
export default meta;

export const ButtonStory: StoryFn<typeof Button> = () => <Button></Button>;
