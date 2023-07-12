/* eslint-disable default-case */
import React, { useEffect, useMemo } from "react";
import AppLayout from "@/components/Layouts/AppLayout";
import MoreInfoPage from "@/components/organisms/UpdateProfile/MoreInfoPage";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { toast } from "react-toastify";
import MoreInfoHeader from "@/components/molecules/UpdateProfile/MoreInfoHeader";
import { useRouter } from "next/router";
import SuggestionsPage from "@/components/organisms/UpdateProfile/SuggestionsPage";
import AboutPage from "@/components/organisms/UpdateProfile/AboutPage";

/** position of element in the array matters, would be nice if i had used a map or a hash table, who knows */
const AllSteps = ["moreinfo", "suggestions", "about"] as const;

type Steps = (typeof AllSteps)[number];

// eslint-disable-next-line @typescript-eslint/ban-types
type GetProps = GetServerSideProps<{ step: Steps | (string & {}) }>; // ? {} allows string to be passed, see type definition for input type

const PageHeader: Record<Steps, string> = {
  moreinfo: "Welcome, we need some more information about you",
  suggestions:
    "Is this you? someone added a family member with similar details",
  about: "Almost there!",
};

export const getServerSideProps: GetProps = async (ctx) => {
  const { query } = ctx;

  if ("step" in query) {
    if (AllSteps.includes(String(query.step) as Steps)) {
      return {
        props: {
          step: query.step as unknown as Steps,
        },
      };
    }

    return {
      props: {
        step: String(query.step),
      },
    };
  }

  return {
    props: {
      step: "moreinfo",
    },
  };
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const UserProfile = ({ step }: Props) => {
  const notValidStep = useMemo(() => !AllSteps.includes(step as Steps), [step]);
  const router = useRouter();

  useEffect(() => {
    if (notValidStep) {
      toast.error(`Expected ${AllSteps.join(", ")}, but received ${step}`);
    }
  }, [notValidStep, step]);

  if (notValidStep)
    return (
      <AppLayout>
        <section className="container h-app">
          <p>
            Invalid step provided for update profile, please make sure the url
            is correct
          </p>
        </section>
      </AppLayout>
    );

  // eslint-disable-next-line consistent-return
  const renderSelectedSteps = (steps: Steps): React.JSX.Element => {
    // typescript already enforces a JSX return
    switch (steps) {
      case "moreinfo":
        return <MoreInfoPage />;
      case "suggestions":
        return <SuggestionsPage />;
      case "about":
        return <AboutPage />;
    }
  };

  /**
   * this variable allows me to assert step as Steps, due to a problem with the ts compiler, it would always throw an error, although step has been narrowed down to `Step` already
   */
  const dummyStep = step as Steps;

  const currentStep = AllSteps.indexOf(dummyStep);

  const handleNavigation = (action: "prev" | "next") => {
    const url = "/user/profile/update?step=";

    if (action === "prev") {
      router.push(`${url}${AllSteps[currentStep - 1]}`);
    } else {
      router.push(`${url}${AllSteps[currentStep + 1]}`);
    }
  };

  return (
    <AppLayout>
      <section className="relative flex items-center justify-center px-4 md:min-h-[calc(100vh-100px)]">
        <div className="w-full space-y-5 min-h-app max-md:py-10 max-md:pb-20 md:space-y-7 md:pt-20">
          <MoreInfoHeader
            text={PageHeader[dummyStep]}
            steps={AllSteps.length}
            currentStep={currentStep + 1}
            onPrevClick={() => handleNavigation("prev")}
            onNextClick={() => handleNavigation("next")}
          />
          {renderSelectedSteps(dummyStep)}
        </div>
      </section>
    </AppLayout>
  );
};

export default UserProfile;
