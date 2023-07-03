import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { Formik } from "formik";
import Link from "next/link";
import GoogleLogo from "public/assets/icon/google.svg";
import AppleLogo from "public/assets/icon/apple.svg";
import PasswordInput from "@/components/atoms/PasswordInput";
import CustomAuthButton from "@/components/atoms/CustomAuthButton";
import { signIn } from "next-auth/react";
import { Logincredentials } from "@/pages/api/auth/[...nextauth]";
import { useRouter } from "next/router";

const LoginForm = () => {
  const router = useRouter();
  const handleLogin = async (values: Logincredentials) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (res && res.status === 200) {
        router.push("/dashboard");
      } else {
        console.log(res?.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <h2 className="mb-2 text-[32px] font-extrabold text-gray-900">
          Log In
        </h2>
        <p>To continue to My Native Tree </p>
      </div>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleLogin}
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
                Forgot Password ?{" "}
                <Link href="/" className="text-primary">
                  Reset
                </Link>
              </p>
            </fieldset>
            <p className="text-sm text-gray-500">
              Don&apos;t have an account yet ?{" "}
              <Link href="/auth/signup" className="text-primary">
                Sign Up
              </Link>
            </p>
            <Button type="submit" className="max-w-full md:max-w-full">
              Login
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

export default LoginForm;
