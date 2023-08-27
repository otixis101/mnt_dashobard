import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { Formik, FormikHelpers } from "formik";
import Link from "next/link";
import GoogleLogo from "public/assets/icon/google.svg";
import CustomAuthButton from "@/components/atoms/CustomAuthButton";
import { signIn, signOut, useSession } from "next-auth/react";
import { Logincredentials } from "@/pages/api/auth/[...nextauth]";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AuthSchema } from "@/base/helpers/FormValidationSchemas";
import { toast } from "react-toastify";

const LoginForm = () => {
  const router = useRouter();
  const { token, email } = router.query;
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { data: session, status, update } = useSession();

  const handleLogin = async (
    values: Logincredentials,
    { resetForm }: FormikHelpers<Logincredentials>
  ) => {
    const { email: userEmail, password } = values;
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: userEmail.trim(),
        password: password.trim(),
      });

      if (res && res.status === 200) {
        toast.success("Login successful");
        router.push("/");
      } else {
        toast.error(res?.error);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
      resetForm();
    }
  };

  const handleGoogleSignIn = async (authToken: string) => {
    setIsGoogleLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`,
        {
          method: "POST",
          body: JSON.stringify({ token: authToken }),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res && res.ok) {
        const { data } = await res.json();
        setIsGoogleLoading(true);
        await update({
          ...session,
          user: {
            ...session?.user,
            ...data,
          },
        });
        setIsGoogleLoading(false);
        toast.success("Login successful");

        if (data.personId) {
          router.push(`/dashboard/tree/${data.personId}`);
        } else {
          router.push("/user/profile/update?step=moreinfo");
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
      signOut();
    } finally {
      setIsGoogleLoading(false);
    }
  };

  useEffect(() => {
    if (
      session &&
      session.user.channel === "google" &&
      status === "authenticated"
    ) {
      const googleAuthToken = session.user.accessToken;
      handleGoogleSignIn(googleAuthToken);
    }
  }, [status]);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify-email`,
          {
            method: "PATCH",
            body: JSON.stringify({ code: token, email }),
            headers: { "Content-Type": "application/json" },
          }
        );
        if (res && res.ok) {
          toast.success("Email verified successfully");
          /**
           * TODO show user success message
           */
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (token && email) {
      verifyUser();
    }
  }, [email, token]);

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
        validationSchema={AuthSchema}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          handleBlur,
          errors,
          touched,
        }) => (
          <form
            onSubmit={handleSubmit}
            className="mt-4 flex flex-col gap-4 space-y-1"
          >
            <fieldset>
              <Input
                hint={touched.email && errors.email ? errors.email : ""}
                isError={!!(touched.email && errors.email)}
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
              <Input
                hint={
                  touched.password && errors.password ? errors.password : ""
                }
                isError={!!(touched.password && errors.password)}
                required
                password
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
                <Link href="/auth/resetpassword" className="text-primary">
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
            <Button
              loading={isLoading}
              type="submit"
              className="max-w-full md:max-w-full"
            >
              Login
            </Button>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-full bg-gray-500" />
                <p className="-mt-1 w-fit text-gray-500">or</p>
                <span className="h-[1px] w-full bg-gray-500" />
              </div>
              <CustomAuthButton
                onClick={async () => signIn("google", { redirect: false })}
                icon={GoogleLogo}
                loading={isGoogleLoading}
                name="Continue with Google"
              />
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
