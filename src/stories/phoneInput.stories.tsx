import PhoneInput from "@/components/atoms/PhoneInput";
import { Meta, StoryObj } from "@storybook/react";

const Template: Meta<typeof PhoneInput> = {
  title: "UI/Phone Input",
  component: PhoneInput,
  argTypes: {
    ...PhoneInput.arguments,
    onChange: {
      type: "function",
    },
    label: {
      type: "string",
    },
  },
};

type Story = StoryObj<typeof PhoneInput>;

export const Default: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
  },
};

export const PhoneInputWithHint = {
  args: {
    ...Default.args,
    hint: "Hint",
  },
};

export const PhoneInputWithHintIcon = {
  args: {
    ...PhoneInputWithHint.args,
    hintIcon: true,
    isError: true,
  },
};

export default Template;
