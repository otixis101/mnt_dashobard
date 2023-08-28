import React, { useState } from "react";
import useFetchSubscriptionPlans from "@/base/hooks/api/useFetchSubscriptionPlans";
import AppLayout from "@/components/Layouts/AppLayout";
import { AboutSectionHeading } from "@/components/atoms/About/Primitives";
import SubscriptionDetailsCard from "@/components/molecules/Subscription/SubscriptionDetailsCard";
import PhotoFlowLoader from "@/components/molecules/PhotoFlow/PhotoFlowLoader";
import Axios from "@/base/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import PaymentCardDetails from "@/components/molecules/PaymentCard/PaymentCardDetails";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

const PaymentPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data, isLoading } = useFetchSubscriptionPlans();
  const { data: session, update } = useSession();

  const { query } = router;

  const { step, planId: planIdQuery } = router.query;

  const onSubscribe = async (planId: string) => {
    if (session) {
      setLoading(true);

      const payload = { planId };

      try {
        await Axios.post("stripe-payment", payload, {
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        });

        const updatedSession = {
          ...session,
          user: {
            ...session.user,
            isSubscribed: true,
          },
        };
        /** update the subscription status */
        update(updatedSession);
        toast.success("Subscription was successful");
        router.push("/account");
      } catch (err) {
        toast.error(String(err));
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please sign in");
    }
  };

  interface Params {
    key: string;
    value?: string;
    deleteAll?: boolean;
  }

  const handleQueryChange = (args: Params) => {
    const { deleteAll = false, key, value } = args;

    if (deleteAll) {
      router.push({ query: {} });
    } else if (value) {
      router.push({ query: { ...query, [key]: [value] } });
    } else {
      delete query[key];
      router.push({ query: { ...query } });
    }
  };

  const handleSubscription = (planId: string) => {
    if (session?.user.stripeCustomerId) {
      /** passing it as props incase the state update lags */
      onSubscribe(planId);
    } else {
      router.push({
        query: {
          step: "billing_details",
          planId,
        },
      });
    }
  };

  return (
    <AppLayout hideSpirals showUser>
      <div className="container flex items-center justify-center min-h-app">
        <div className="">
          {isLoading ? (
            <PhotoFlowLoader className="mb-20 h-auto" />
          ) : (
            data && (
              <div className="space-y-10">
                {loading && (
                  <div className="fixed inset-0 flex items-center justify-center bg-white/50">
                    <PhotoFlowLoader className="h-auto" />
                  </div>
                )}
                <div className="mb-4 space-y-2">
                  <AboutSectionHeading className="mx-auto text-center" as="h1">
                    Pricing
                  </AboutSectionHeading>
                  <p className="mx-auto max-w-[60ch] px-0 text-center text-lg text-gray-500">
                    Unlock the secrets of your past through our diverse ancestry
                    plans, tailored to your journey of discovery. Choose a plan
                    that suits your budget
                  </p>
                </div>
                {data.map(({ prices, product }) => (
                  <div className="" key={product.id}>
                    <div className="flex flex-col gap-4 sm:flex-row">
                      {prices.map(({ id: priceId, unit_amount, recurring }) => (
                        <SubscriptionDetailsCard
                          key={priceId}
                          duration={recurring.interval}
                          price={unit_amount / 100}
                          onClick={() => handleSubscription(priceId)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>

      {step === "billing_details" && (
        <Dialog.Root
          open
          onOpenChange={() => {
            handleQueryChange({ key: "step", deleteAll: true });
          }}
        >
          <Dialog.Portal>
            <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 z-20 bg-white/60" />
            <Dialog.Content
              asChild
              className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] z-50 w-full max-w-[95%] translate-x-[-50%] translate-y-[-50%] overflow-y-auto rounded-2xl bg-white shadow-[0px_0px_8px_3px_#0000001F] focus:outline-none min-[690px]:max-w-[670px]"
            >
              <div className="">
                <PaymentCardDetails
                  onSubmit={() => onSubscribe(String(planIdQuery))}
                  hideShadows
                  className="rounded-none"
                />

                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="absolute right-4 top-4 inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full text-4xl focus:shadow-[0_0_0_2px] focus:outline-none"
                    aria-label="Close"
                  >
                    <Cross2Icon width={24} height={24} />
                  </button>
                </Dialog.Close>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </AppLayout>
  );
};

export default PaymentPage;
