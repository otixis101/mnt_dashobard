/* eslint-disable consistent-return */
/* eslint-disable default-case */
import React, { useMemo } from "react";
import { useRouter } from "next/router";
import AppLayout from "@/components/Layouts/AppLayout";
import AddMemberPage from "@/components/organisms/AddMemberPage";
import MultiPageHeader from "@/components/molecules/UpdateProfile/MultiPageHeader";
import FirstForm from "@/components/molecules/AlmostThere/AlmostThereForms/FirstForm";
import SuggestionsPage from "@/components/organisms/UpdateProfile/SuggestionsPage";
import SuccessModal from "@/components/molecules/SuccessModal";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";

const Steps = ["bio-data", "suggestion", "relationship", "complete"] as const;

type StepsQuery = (typeof Steps)[number];

interface AddMemberPageProps {
  personId: string;
}
const AddMember = ({ personId }: AddMemberPageProps) => {
  const router = useRouter();

  const { query } = router;

  const { step } = query;

  const notValidStep = useMemo(
    () => !Steps.includes(step as StepsQuery),
    [step]
  );

  if (notValidStep || !step)
    return (
      <AppLayout>
        <section className="container h-app">
          <p>
            Invalid step provided for add family member, please make sure the
            url is correct
          </p>
        </section>
      </AppLayout>
    );
  const dummyStep = step as StepsQuery;

  const currentStep = Steps.indexOf(dummyStep);

  const renderSelection = (selected: StepsQuery): JSX.Element => {
    switch (selected) {
      case "bio-data":
        return <AddMemberPage />;
      case "suggestion":
        return (
          <SuggestionsPage nextPath={{ step: "relationship" }} isUser={false} />
        );
      case "relationship":
        return <FirstForm />;
      case "complete":
        return (
          <div className="fixed inset-0 flex items-center justify-center bg-white">
            <div className="w-full">
              <SuccessModal
                btnText="Continue to family tree"
                text="Relative Added"
                onAccept={() => router.push(`/dashboard/tree/${personId}`)}
              />
            </div>
          </div>
        );
    }
  };

  const handleNavigation = (action: "prev" | "next") => {
    if (action === "prev") {
      router.push({ query: { ...router.query, step: Steps[currentStep - 1] } });
    } else {
      router.push({ query: { ...router.query, step: Steps[currentStep + 1] } });
    }
  };

  return (
    <AppLayout hideSpirals showUser image="/assets/user-1.png" name="Hi, Amara">
      <section className="bg-white pt-20 min-h-app">
        <div className="w-full space-y-10">
          <MultiPageHeader
            text="Add a member to the family tree"
            steps={Steps.length}
            currentStep={currentStep + 1}
            onNextClick={() => handleNavigation("next")}
            onPrevClick={() => handleNavigation("prev")}
            className="w-full max-w-xl text-left"
          />
          <div className="mx-auto max-w-[90%] md:max-w-2xl">
            {renderSelection(String(query.step) as StepsQuery)}
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);
  const { personId } = session?.user ?? {};

  if (!personId) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      personId,
    },
  };
};

export default AddMember;
