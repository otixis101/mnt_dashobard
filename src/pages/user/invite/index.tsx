import React from "react";
import AppLayout from "@/components/Layouts/AppLayout";
import Button from "@/components/atoms/Button";
import { useRouter } from "next/router";
import SuccessModal from "@/components/molecules/SuccessModal";
import InviteMemberForm from "@/components/organisms/InviteMemberForm";

const steps = ["invite", "success"] as const;

// chore: help me

type InviteSteps = (typeof steps)[number] | (string & {});

type Props = {
  onInvite(): void;
  onSkip(): void;
};

const DefaultPage = ({ onInvite, onSkip }: Props) => (
  <React.Fragment>
    <h1 className="font-medium md:text-xl">
      Improve your experience by inviting others
    </h1>
    <div className="absolute left-[48%] top-[40%] flex min-h-[600px] w-full max-w-sm -translate-x-1/2 -translate-y-1/2 items-center justify-center">
      <div className="mx-auto max-w-[200px]">
        <Button onClick={onInvite} intent="outline" roundedFull showIcon>
          Invite Others
        </Button>
      </div>

      <Button onClick={onSkip} className="absolute bottom-0 min-w-full">
        Skip
      </Button>
    </div>
  </React.Fragment>
);

const StepWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center justify-center min-h-app md:min-h-[calc(100vh-180px)]">
    <div className="w-full">{children}</div>
  </div>
);

const InviteFamilyMembers = () => {
  const router = useRouter();

  const handleNavigation = (step: InviteSteps) => {
    router.push({ query: { step } });
  };

  const renderSelection = (step: InviteSteps) => {
    switch (step) {
      case "invite":
        return (
          <StepWrapper>
            <InviteMemberForm
              onCancel={() => router.push("/dashboard")}
              onSubmit={() => handleNavigation("success")}
            />
          </StepWrapper>
        );
      case "success":
        return (
          <StepWrapper>
            <SuccessModal
              btnText="Continue to family tree"
              text="Invite Sent successfully"
              onAccept={() => router.push("/dashboard")}
            />
          </StepWrapper>
        );
      default:
        return (
          <DefaultPage
            onInvite={() => handleNavigation("invite")}
            onSkip={() => router.push("/dashboard")}
          />
        );
    }
  };

  return (
    <AppLayout>
      <section className="relative mx-auto max-w-[90%] min-h-app">
        {renderSelection(String(router.query.step))}
      </section>
    </AppLayout>
  );
};

export default InviteFamilyMembers;
