/* eslint-disable default-case */
import React, { useMemo } from "react";
import AppLayout from "@/components/Layouts/AppLayout";
import MoreInfoPage from "@/components/organisms/UpdateProfile/MoreInfoPage";
import { useRouter } from "next/router";
import SuggestionsPage from "@/components/organisms/UpdateProfile/SuggestionsPage";
import AboutPage from "@/components/organisms/UpdateProfile/AboutPage";
import { useSession } from "next-auth/react";
import MultiPageHeader from "@/components/molecules/UpdateProfile/MultiPageHeader";

/** position of element in the array matters, would be nice if i had used a map or a hash table, who knows */
const AllSteps = ["moreinfo", "about", "suggestions"] as const;

type Steps = (typeof AllSteps)[number];

const PageHeader: Record<Steps, string> = {
  moreinfo: "Welcome, we need some more information about you",
  suggestions:
    "Is this you? someone added a family member with similar details",
  about: "Almost there!",
};

const UserProfile = () => {
  const router = useRouter();
  const { data } = useSession();

  console.log(data);

  const { query } = router;

  const { step } = query;

  const notValidStep = useMemo(() => !AllSteps.includes(step as Steps), [step]);

  if (!step)
    return (
      <AppLayout>
        <section className="container h-app">
          <div />
        </section>
      </AppLayout>
    );

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

  // eslint-disable-next-line consistent-return
  const renderSelectedSteps = (steps: Steps): React.JSX.Element => {
    // typescript already enforces a JSX return
    switch (steps) {
      case "moreinfo":
        return <MoreInfoPage />;
      case "suggestions":
        return <SuggestionsPage />;
      case "about":
        return <AboutPage onPrevClick={() => handleNavigation("prev")} />;
    }
  };



  return (
    <AppLayout>
      <section className="relative flex items-center justify-center px-4 md:min-h-[calc(100vh-100px)]">
        <div className="w-full space-y-5 !overflow-auto min-h-app max-md:py-10 max-md:pb-20 md:space-y-7 md:pt-20">
          <MultiPageHeader
            text={PageHeader[dummyStep]}
            // steps={AllSteps.length}
            currentStep={currentStep + 1}
          // onPrevClick={() => handleNavigation("prev")}
          />
          {renderSelectedSteps(dummyStep)}
        </div>
      </section>
    </AppLayout>
  );
};

export default UserProfile;
