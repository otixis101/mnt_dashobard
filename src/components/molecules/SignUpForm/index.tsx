import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { Formik } from "formik";
import Link from "next/link";
import GoogleLogo from "public/assets/icon/google.svg";
import AppleLogo from "public/assets/icon/apple.svg";
import CustomAuthButton from "@/components/atoms/CustomAuthButton";
import PasswordInput from "@/components/atoms/PasswordInput";

const SignUpForm = () => {
  const handleSignIn = (values: unknown) => {
    console.log(values);
  };

  return (
    <>
      <div>
        <h2 className="mb-2 text-[32px] font-extrabold text-gray-900">
          Sign up
        </h2>
        <p>Sign up to my native tree for free</p>
      </div>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSignIn}
      >
        {({ handleSubmit, handleChange, values, handleBlur }) => (
          <form
            onSubmit={handleSubmit}
            className="mt-4 flex flex-col gap-4 space-y-1"
          >
            <fieldset>
              <Input
                required
                name="email"
                type="email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                label="Enter your email"
                placeholder="Email"
              />
            </fieldset>
            <fieldset>
              <PasswordInput
                required
                name="password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                label="Enter your password"
                placeholder="Password"
              />
              <p className="mt-2 text-sm text-gray-500">
                Password must contain at least 6 characters 1 uppercase 1
                lowercase and 1 number
              </p>
            </fieldset>
            <p className="text-sm text-gray-500">
              Already have an account ?{" "}
              <Link href="/auth/signin" className="text-primary">
                Login
              </Link>
            </p>
            <Button type="submit" className="max-w-full md:max-w-full">
              Sign up
            </Button>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-full bg-gray-500" />
                <p className="-mt-1 w-fit text-gray-500">or</p>
                <span className="h-[1px] w-full bg-gray-500" />
              </div>
              <CustomAuthButton icon={GoogleLogo} name="Continue with Google" />
              <CustomAuthButton icon={AppleLogo} name="Continue with Apple" />
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default SignUpForm;
