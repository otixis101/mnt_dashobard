import React, { FC } from "react";

interface Props {
  progress: "half" | "full";
}

const MoreInfoProgressBar: FC<Props> = ({ progress }) => (
  <div className="relative m-4 h-2 rounded-full bg-gray-300 p-1">
    {progress === "half" ? (
      <div className="absolute left-0 top-0 ml-[50%] h-[90%] w-3/6 rounded-full bg-blue-700" />
    ) : (
      <div className="" />
    )}
  </div>
);

export default MoreInfoProgressBar;
