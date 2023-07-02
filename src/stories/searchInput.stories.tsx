import SearchBar from "@/components/molecules/SearchBar";
import { Meta } from "@storybook/react";

export default {
  title: "UI/SearchInput",
  component: SearchBar,
  argTypes: {
    renderAs: {
      defaultValue: "div",
      type: "string",
    },
    onSearch: {
      type: "function",
    },
    placeholder: {
      type: "string",
    },
  },
} as Meta<typeof SearchBar>;

export const Default = {
  args: {
    placeholder: "Placeholder",
  },
};
