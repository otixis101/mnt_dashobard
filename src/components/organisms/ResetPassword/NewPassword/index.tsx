import React, { useState } from "react";
import { useRouter } from "next/router";
import { Formik } from "formik";
import { toast } from "react-toastify";

import ResetPasswordFormField from "@/components/molecules/ResetPassword/ResetPasswordFormField";
import Button from "@/components/atoms/Button";
import PasswordInput from "@/components/atoms/PasswordInput";
import { StringSchema } from "@/base/helpers/FormValidationSchemas";

interface Props {
  token: string;
}
interface Credentials {
  password: string;
}

const Index = ({ token }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onHandleSubmit = async (values: Credentials) => {
    const { password } = values;
    setIsLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/reset-password`,
        {
          method: "POST",
          body: JSON.stringify({ password, resetToken: token }),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res && res.ok) {
        toast.success("Password reset successful");
        /**
         * TODO route users to the Email Sent Page
         */
        router.push(`/auth/resetpassword?step=resetsuccess`);
      }
    } catch (err: any) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ResetPasswordFormField type="password">
      <Formik
        initialValues={{ password: "" }}
        onSubmit={onHandleSubmit}
        validationSchema={StringSchema}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
        }) => (
          <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            <fieldset className="mb-4 w-full max-w-[250px] md:max-w-[343px]">
              <PasswordInput
                required
                name="password"
                type="password"
                label="Enter your password"
                placeholder="Password"
                hint={
                  touched.password && errors.password ? errors.password : ""
                }
                isError={!!(touched.password && errors.password)}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
              />
              <p className="mt-2 text-start text-sm text-gray-500">
                Password must contain at least 6 characters 1 uppercase 1
                lowercase and 1 number
              </p>
            </fieldset>
            <Button type="submit" loading={isLoading}>
              Reset
            </Button>
          </form>
        )}
      </Formik>
    </ResetPasswordFormField>
  );
};

export default Index;
