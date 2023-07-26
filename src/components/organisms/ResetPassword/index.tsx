import React, { useState } from "react";
import { Formik } from "formik";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import ResetPasswordFormField from "@/components/molecules/ResetPassword/ResetPasswordFormField";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import { EmailSchema } from "@/base/helpers/FormValidationSchemas";

type Credentials = {
  email: string;
};
const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onHandleSubmit = async (values: Credentials) => {
    const { email: userEmail } = values;
    setIsLoading(true);
    console.log("hello");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/reset-password-request`,
        {
          method: "POST",
          body: JSON.stringify({ email: userEmail }),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res && res.ok) {
        toast.success("Password reset link has been sent to your email");
        router.push(`/auth/resetpassword?step=checkemail&email=${userEmail}`);
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      /**
       * TODO toast error message for users feedback
       */

      toast("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ResetPasswordFormField type="email">
      <Formik
        initialValues={{ email: "" }}
        onSubmit={onHandleSubmit}
        validationSchema={EmailSchema}
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
            <Input
              parentClass="mb-4 max-w-[250px] w-full md:max-w-[343px]"
              label="Enter email"
              placeholder="Email address"
              labelClass="text-left text-lg"
              hint={touched.email && errors.email ? errors.email : ""}
              isError={!!(touched.email && errors.email)}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              type="email"
              name="email"
              required
            />
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
