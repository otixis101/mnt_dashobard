/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";

// icons
import { BiLink } from "react-icons/bi";

interface Credential {
  email: string;
}
const Index = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shareToken, setShareToken] = useState<string>("");
  const [host, setHost] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHost(window.location.origin);
    }
  }, []);

  const router = useRouter();
  const { personId } = router.query;

  const onHandleSubmit = async (values: Credential) => {
    const { email } = values;
    setIsLoading(true);
    const emails = email.split(",").map((mail) => mail.trim());

    // console.log(emails);

    if (session && shareToken.length > 0) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/share-tree/share`,
          {
            method: "POST",
            body: JSON.stringify({
              emails,
              treeLink: `${host}/dashboard/tree/${personId}?share-token=${shareToken}`, // dashboard?id=dynamic
            }),
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${session.user.accessToken}`,
            },
          }
        );
        if (res && res.ok) {
          toast.success("Invite Link created successfully");
          router.push(`/dashboard/tree/${personId}/share?step=success`);
        }
      } catch (err) {
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    const hostname = window.location.origin;
    setHost(hostname);
    if (session && Object.keys(session?.user).length !== 0) {
      // console.log(session?.user, ">>>> user");

      const createShareLink = async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/share-tree`,
          {
            method: "POST",
            body: JSON.stringify({
              id: session.user.id,
            }),
            headers: {
              authorization: `Bearer ${session.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (res && res.ok) {
          // toast.success("Dynamic Link created successfully");
          const result = await res.json();
          setShareToken(result.data.shareToken);
        }
      };

      createShareLink();
    }
  }, [session?.user]);

  const onCopyLink = () => {
    navigator.clipboard.writeText(
      `${host}/dashboard/?share-token=${shareToken}`
    );

    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="container px-4 max-sm:h-app">
      <div className="mx-auto mt-12 flex flex-col justify-center gap-6 rounded-lg md:mt-12 md:h-96 md:w-2/6 md:border md:px-20 md:py-72 [&>*]:mb-2 [&>*]:text-center">
        <h2 className="text-2xl font-medium capitalize text-black md:text-3xl">
          share family tree
        </h2>
        <Formik initialValues={{ email: "" }} onSubmit={onHandleSubmit}>
          {({
            handleSubmit,
            handleChange,
            values,
            handleBlur,
            touched,
            errors,
          }) => (
            <form
              className="flex flex-col items-center"
              onSubmit={handleSubmit}
            >
              <div className="mb-3">
                <Input
                  parentClass="mb-1 max-w-[250px] w-full md:max-w-[343px]"
                  label="Enter email addresses, Seperate with comma"
                  placeholder="Enter email"
                  labelClass="text-left text-lg"
                  hint={touched.email && errors.email ? errors.email : ""}
                  isError={!!(touched.email && errors.email)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  type="text"
                  name="email"
                  required
                />
                {shareToken.length > 0 && (
                  <button
                    onClick={onCopyLink}
                    className="flex cursor-pointer items-center text-primary"
                  >
                    <BiLink className="mr-1 text-3xl" />
                    <span className="text-lg">Copy tree Link</span>
                  </button>
                )}
              </div>

              <Button className="my-3" type="submit" loading={isLoading}>
                Continue
              </Button>
              <Button intent="outline" type="submit">
                Cancel
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Index;
