import { cn } from "@/base/utils";

interface RenderAsDiv {
  renderAs?: "div";
  onSearch?(): void;
}

interface RenderAsForm {
  renderAs?: "form";
  onSearch?(event: React.FormEvent<HTMLFormElement>): void;
}

interface DefaultProps {
  placeholder: string;
  className?: string;
}

type Props = DefaultProps & (RenderAsDiv | RenderAsForm);

const SearchBar = (props: Props) => {
  const { placeholder, onSearch, renderAs: Element = "div", className } = props;

  return (
    <Element
      className={cn(
        "relative flex w-full items-center justify-between gap-4 rounded-lg bg-[hsla(0,_0%,_94%,_1)] py-2.5 pl-5 pr-2",
        "focus-within:ring-2 focus-within:ring-primary",
        className
      )}
      onSubmit={Element === "form" ? (onSearch as VoidFunction) : undefined}
    >
      <input
        placeholder={placeholder}
        className="h-full w-full bg-transparent text-[hsla(0,_0%,_44%,_1)] outline-none sm:text-lg"
      />
      <button
        type={Element === "div" ? "button" : "submit"}
        className="rounded-lg bg-primary p-2 px-8 text-white"
        onClick={Element === "div" ? (onSearch as VoidFunction) : undefined}
      >
        Search
      </button>
    </Element>
  );
};

export default SearchBar;
