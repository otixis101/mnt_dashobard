import Input from "@/components/atoms/Input";
import { Meta } from "@storybook/react";

export default {
  title: "UI/Input",
  component: Input,
  argTypes: {
    ...Input.arguments,
    hintIcon: {
      description:
        "Can be of type ReactNode or true, if it is true, it defaults to an info icon, or you can specify the desired icon",
      type: "boolean",
    },
  },
} as Meta<typeof Input>;

export const Default = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
  },
};

export const InputWithHint = {
  args: {
    ...Default.args,
    hint: "Hint",
  },
};

export const InputWithHintIcon = {
  args: {
    ...InputWithHint.args,
    hintIcon: true,
    isError: true,
  },
};
