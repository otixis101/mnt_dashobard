/* eslint-disable jsx-a11y/no-static-element-interactions */
import { cn } from "@/base/utils";
import React, { useEffect, useRef, useState } from "react";
import { IoMdInformationCircle } from "react-icons/io";
import { toast } from "react-toastify";
import {
  EmailSchema,
  NumberSchema,
  SeparatorInputStringSchema,
} from "@/base/helpers/FormValidationSchemas";
import { motion } from "framer-motion";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";

interface TCProps {
  tags: string[];
  onRemove(idx: number): void;
}

const TagsContainer = ({ tags, onRemove }: TCProps) =>
  tags.map((tag, idx) => (
    <button
      className="flex h-full items-center justify-center gap-1 whitespace-nowrap rounded-lg bg-midpup px-2 py-1.5 text-[11px]"
      key={tag}
      onClick={() => onRemove(idx)}
      type="button"
    >
      {tag}
      <span>&times;</span>
    </button>
  ));

interface DefaultProps extends React.ComponentPropsWithoutRef<"input"> {
  label: string;
  hint?: string;
  isError?: boolean;
  hintIcon?: React.ReactNode | true;
  labelClass?: string;
  hintClass?: string;
  parentClass?: string;
  tags: string[];
  onTagsChange(tags: string[]): void;
  /** email, string, and number have their schema that tries to validate the input, you can pass a custom schema to be used for validation */
  tagsType?: "email" | "string" | "number" | (string & {});
  /** pass in a yup schema */
  validationSchema?: any;
}

type Props = Omit<DefaultProps, "value" | "defaultValue" | "onChange" | "type">;

/** @toda add focus out of input to trigger effect */
const SeparatorInput = (props: Props) => {
  const [shouldPopOver, setShouldPopOver] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const popOverContentRef = useRef<HTMLDivElement>(null);
  const [hasSeenToast, setHasSeenToast] = useState(false);

  const {
    label,
    name,
    id,
    isError,
    hint,
    className,
    labelClass,
    hintIcon,
    parentClass,
    hintClass,
    placeholder,
    tags,
    onTagsChange,
    tagsType = "string",
    validationSchema,
    ...prop
  } = props;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  /** 16 is an arbitrary number */
  const popoverWidth = (wrapperRef.current?.offsetWidth ?? 200) - 32;

  /** followed this article to implement this
   * @link https://softauthor.com/javascript-get-width-of-an-html-element/
   */
  const handleContentOverflow = () => {
    if (wrapperRef.current) {
      const { offsetWidth, scrollWidth } = wrapperRef.current;
      if (scrollWidth - 20 >= offsetWidth) {
        setShouldPopOver(true);
        if (!hasSeenToast) {
          toast.info("Click on the ... to expand view");
          setHasSeenToast(true);
        }
      }
    }
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    handleContentOverflow();
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const inputValue = event.currentTarget?.value.trim().toLowerCase() ?? "";
      if (inputValue) {
        if (!tags.includes(inputValue)) {
          let schema: any = validationSchema ?? SeparatorInputStringSchema;
          switch (tagsType) {
            case "email":
              schema = EmailSchema;
              break;
            case "number":
              schema = NumberSchema;
              break;
            case "string":
              schema = SeparatorInputStringSchema;
              break;
            default:
              break;
          }

          try {
            await schema.validate(inputValue);
            onTagsChange([...tags, inputValue]);
            /** weird issues with current target
             * @see https://stackoverflow.com/questions/66085763/why-currenttarget-value-is-null */
            if (inputRef.current) {
              inputRef.current.value = "";
            }
          } catch (error) {
            /**
             *   error type           message
             * [ "ValidationError", " Only numbers are accepted as a valid format", "..."] */
            const [, ...err] = String(error).split(":");

            toast.error(err.join(" ").trim());
          }
        } else {
          toast.error(`${inputValue} already exists`);
        }
      }
    } else if (event.key === "Backspace" && event.currentTarget.value === "") {
      if (!shouldPopOver) {
        onTagsChange(tags.slice(0, -1));
      }
    }
  };

  const handleRemoveTag = (idx: number) => {
    onTagsChange(tags.filter((_, i) => i !== idx));
    if (popOverContentRef.current) {
      const { offsetWidth } = popOverContentRef.current;

      /** 35 is also an arbitrary number */
      if (offsetWidth < popoverWidth - 35) {
        setShouldPopOver(false);
      }
    }
  };

  return (
    <div className={cn("space-y-2", parentClass)}>
      <label
        className={cn("grid grid-cols-1 gap-2 text-sm text-black", labelClass)}
      >
        <span className="font-medium">{label}</span>
        {/** for some weird reasons, click events affect TagsContainer component and is being passed down to them */}
        <div
          onClick={(e) => e.preventDefault()}
          className={cn(
            "flex h-14 items-center gap-1 overflow-hidden rounded-lg border-2 border-black p-4 py-3 outline-transparent placeholder:text-pale-black focus-within:border-primary focus-visible:outline-none",
            isError && "border-danger-1",
            className
          )}
          ref={wrapperRef}
        >
          {!shouldPopOver ? (
            <div className="flex items-center gap-1">
              <TagsContainer tags={tags} onRemove={handleRemoveTag} />
            </div>
          ) : (
            <div className="mr-1">
              <Popover>
                <PopoverTrigger>
                  <motion.div
                    className="text-light-slate-9 flex h-full w-full items-center gap-4 rounded-md bg-slate-200 px-2 text-base"
                    aria-label="view tags"
                    // using this to trigger an animation each time content changes
                    key={tags.length}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    ...
                  </motion.div>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  className="w-full max-w-full bg-white p-4"
                  style={{
                    width: popoverWidth,
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    ref={popOverContentRef}
                    className="flex max-w-fit flex-wrap gap-2"
                  >
                    <TagsContainer tags={tags} onRemove={handleRemoveTag} />
                  </motion.div>
                </PopoverContent>
              </Popover>
            </div>
          )}
          <input
            {...prop}
            placeholder={
              tags.length < 1
                ? placeholder ?? "Separate your tags with a comma"
                : undefined
            }
            className="h-full w-full min-w-[150px] border-none outline-none"
            ref={inputRef}
            type="text"
            name={name}
            onKeyDown={handleKeyDown}
            id={id ?? name}
          />
        </div>
      </label>
      {hint && (
        <div
          className={cn(
            "flex items-start gap-1 text-sm text-pale-black",
            isError && "text-danger-1",
            hintClass
          )}
        >
          {hintIcon
            ? hintIcon === true && <IoMdInformationCircle size={20} />
            : hintIcon}
          {hint}
        </div>
      )}
    </div>
  );
};

SeparatorInput.displayName = "SeparatorInput";

export default SeparatorInput;
