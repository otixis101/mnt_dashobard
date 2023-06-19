import Button from "@/components/atoms/Button";
import { StoryFn, Meta } from "@storybook/react";

export default {
  title: "UI/Button",
  component: Button,
  argTypes: {
    roundedFull: {
      type: "boolean",
    },
    disabled: {
      type: "boolean",
    },
    loading: {
      type: "boolean",
    },
    showIcon: {
      type: "boolean",
    },
    children: {
      type: "string",
    },
    icon: {
      type: "function",
    },
  },
} as Meta<typeof Button>;

const ButtonTemplate: StoryFn<typeof Button> = (args) => (
  <Button {...args}>{args.children ?? "Button"}</Button>
);

export const Primary = ButtonTemplate.bind({});

Primary.args = {
  intent: "primary",
};

export const Outline = ButtonTemplate.bind({});

Outline.args = {
  intent: "outline",
};

export const IconButton = ButtonTemplate.bind({});

IconButton.args = {
  showIcon: true,
};
