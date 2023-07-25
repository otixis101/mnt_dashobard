import { cn } from "@/base/utils";
import React, { useState } from "react";

interface DefaultProps {
  placeholder: string;
  className?: string;
  initialValue?: string;
  onSearch(value: string): void;
}

type Props = DefaultProps;

const SearchBar = (props: Props) => {
  const { placeholder, onSearch, className, initialValue } = props;
  const [value, setValue] = useState<string>(initialValue ?? "");

  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-between gap-4 rounded-lg bg-[hsla(0,_0%,_94%,_1)] py-2.5 pl-5 pr-2",
        "focus-within:ring-2 focus-within:ring-primary",
        className
      )}
    >
      <input
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="h-full w-full bg-transparent text-[hsla(0,_0%,_44%,_1)] outline-none sm:text-lg"
      />
      <button
        type="button"
        className="rounded-lg bg-primary p-2 px-8 text-white"
        onClick={() => onSearch(value)}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
