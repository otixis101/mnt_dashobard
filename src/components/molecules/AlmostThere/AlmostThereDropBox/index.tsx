import React, { ChangeEvent } from "react";
import { cn } from "@/base/utils";
import { AiOutlineDelete } from "react-icons/ai";

interface Props {
  className: string;
  name?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  file: File | undefined;
  onFileDelete(): void;
}
const AlmostThereDropBox = (props: Props) => {
  const { className, name, onChange, file, onFileDelete } = props;

  return (
    <div className={cn(className)}>
      <span className="mb-2 block text-gray-800">Upload images</span>
      <div className="relative mb-1 flex h-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dotted border-gray-400 bg-[#F3F3F3] focus-within:border-primary hover:border-primary">
        {!file ? (
          <React.Fragment>
            <input
              type="file"
              name={name}
              className="absolute inset-0 cursor-pointer opacity-0"
              multiple={false}
              onChange={onChange}
            />
            <p className="mx-1">Drop files here to upload...</p>
            <button
              type="button"
              className="mt-2 w-1/2 rounded-full border-[1px] border-gray-100 bg-[#E8E8E8] px-5 py-1.5 text-black"
              tabIndex={-1}
            >
              Browse Files
            </button>
          </React.Fragment>
        ) : (
          <div className="flex items-center gap-2">
            <button
              className="rounded-full p-1.5 text-red-500"
              type="button"
              onClick={onFileDelete}
            >
              <span className="sr-only">Delete file</span>
              <AiOutlineDelete size={20} />
            </button>
            <span>{file.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlmostThereDropBox;
