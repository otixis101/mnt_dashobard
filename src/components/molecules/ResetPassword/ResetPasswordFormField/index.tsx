import React from "react";

interface Props {
  type: "email" | "password";
  children: React.ReactNode;
}
const index = ({ type, children }: Props) => (
  <div className="container px-4 max-sm:h-app">
    <div className="mx-auto mt-12 flex flex-col justify-center gap-6 rounded-lg md:mt-24 md:h-96 md:w-3/6 md:border md:px-20 md:py-72 [&>*]:mb-2 [&>*]:text-center">
      <h2 className="text-2xl font-medium text-black md:text-3xl">
        Reset Password
      </h2>
      <p className="text-lg text-gray-600 md:text-xl">
        Please enter your {type === "email" ? "email address" : "new password"}{" "}
        to reset your password
      </p>
      {children}
    </div>
  </div>
);

export default index;
