import Axios from "@/base/axios";
import useFetchPersonSetting from "@/base/hooks/api/useFetchPersonSetting";
import useFetchUserSubscription from "@/base/hooks/api/useFetchUserSubscription";
import { cn } from "@/base/utils";
import Avatar from "@/components/atoms/Avatar";
import Button from "@/components/atoms/Button";
import CardDetails from "@/components/atoms/CardDetails";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { toast } from "react-toastify";
import PhotoFlowLoader from "../../PhotoFlow/PhotoFlowLoader";
import { SwitchThumb, SwitchWrapper } from "../../Switch";

interface Props {
  onChange(checked: boolean): void;
  value: boolean;
  label: string;
}

const Switcher = ({ onChange, value, label }: Props) => (
  <div className="flex items-center justify-center gap-4 text-custom-black sm:text-xl">
    <SwitchWrapper
      onCheckedChange={onChange}
      checked={value}
      label={label}
      className="h-5 w-full max-w-[56px] data-[state=checked]:bg-[#9A7CF4] sm:w-14"
      class="w-full justify-between text-left text-sm text-black sm:text-base"
    >
      <SwitchThumb className="h-6 w-6 -translate-y-[2px] translate-x-0 bg-primary data-[state=checked]:translate-x-[35px]" />
    </SwitchWrapper>
  </div>
);

const SubscriptionDetails = ({ className }: { className?: string }) => (
  <p
    className={cn(
      "font-normal leading-[2] md:text-lg md:leading-[2]",
      className
    )}
  >
    Premium Membership: USD $10/mo <br />
    Renewed: <span className="font-medium text-primary">April 10,2023</span>
  </p>
);

interface IProfileHeader {
  email: string;
  name: string;
  membership?: boolean;
  className?: string;
}

const ProfileHeader = ({
  email,
  name,
  membership = false,
  className,
}: IProfileHeader) => (
  <div className={cn("mb-3", className)}>
    <div className="flex items-center gap-2">
      <h5 className="text-2xl font-medium capitalize text-primary md:whitespace-nowrap md:text-3xl">
        {name}
      </h5>

      <div className="mt-1 flex items-center gap-1.5">
        <span role="img" className="rounded-full bg-black p-1 text-sm" />
        <p className="capitalize text-black">
          {membership ? "Premium" : "Free"}
        </p>
        {membership && <AiFillStar size={24} className="text-yellow-500" />}
      </div>
    </div>
    <div className="text-sm">{email}</div>
  </div>
);

const options = [
  { label: "Make family tree private", name: "isTreePrivate" },
  {
    label: "Get notified about new family members",
    name: "recieveNotification",
  },
  { label: "Show profile in public search", name: "showInPublicSearch" },
] as const;

type FormKey = (typeof options)[number];

const UserProfileBody = () => {
  const [formData, setFormData] = useState<Record<FormKey["name"], boolean>>({
    showInPublicSearch: false,
    isTreePrivate: false,
    recieveNotification: false,
  });
  const [loading, setLoading] = useState(false);

  const { data: session, update } = useSession();
  const { data, isError, isLoading, mutate } = useFetchPersonSetting(
    session?.user?.personId ?? ""
  );

  const { data: subscriptionPlan } = useFetchUserSubscription();

  const handleSwitcherChange = (name: FormKey["name"]) => {
    setFormData((d) => ({ ...d, [name]: !d[name] }));
  };

  const onPrivacyUpdate = async () => {
    setLoading(true);
    try {
      await Axios.patch(`settings/${data?.personId}`, formData, {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      });
      toast.success("Privacy settings updated successfully");
      mutate();
    } catch (err) {
      toast.error(String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (session) {
      setLoading(true);
      try {
        const url = `stripe-payment/cancel/${subscriptionPlan?.id}`;
        const payload = {};
        await Axios.post(url, payload, {
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        });
        const updatedSession = {
          ...session,
          user: {
            ...session.user,
            isSubscribed: false,
          },
        };

        update(updatedSession);
        toast.success("Subscription cancelled");
      } catch (error) {
        toast.error(String(error));
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please login");
    }
  };

  useEffect(() => {
    if (data) {
      const { isTreePrivate, showInPublicSearch, recieveNotification } = data;
      setFormData({ isTreePrivate, showInPublicSearch, recieveNotification });
    }
  }, [data]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <PhotoFlowLoader className="" />
      </div>
    );

  if (!data && isError) return <pre>An error occurred while fetching</pre>;

  if (!data) return <div />;

  const { person } = data;

  return (
    <Fragment>
      {loading && (
        <div className="fixed inset-0 z-10 grid place-items-center bg-white/70">
          <PhotoFlowLoader />
        </div>
      )}
      <div className="my-10 block space-x-4 lg:flex">
        <div className="mb-8 space-y-4">
          <div className="relative h-56 w-56 overflow-hidden rounded-lg max-md:mx-auto">
            {person?.profilePhotoUrl ? (
              <Image
                src={person?.profilePhotoUrl}
                fill
                alt={person.firstName}
              />
            ) : (
              <Avatar
                name={{
                  firstName: person.firstName,
                  lastName: person.lastName,
                }}
              />
            )}
          </div>
          <ProfileHeader
            name={`${person.firstName} ${person.lastName}`}
            email={data.email}
            membership={session?.user.isSubscribed}
            className="mx-auto w-fit text-center md:hidden"
          />
        </div>
        <div className="flex w-full max-w-5xl flex-shrink-0 flex-col gap-5 gap-y-8 rounded-2xl bg-[#EEE]  p-6 md:flex-row">
          <div className="w-full">
            <ProfileHeader
              name={`${person.firstName} ${person.lastName}`}
              email={data.email}
              membership={session?.user.isSubscribed}
              className="max-md:hidden"
            />
            <div className="mb-3">
              <h3 className="mb-[13px] text-lg font-medium capitalize text-primary lg:mb-[9px]">
                Privacy settings
              </h3>
              <div className="w-full -translate-x-2 rounded-md bg-[#fff] px-4 py-5 md:max-w-md">
                <ul className="space-y-4">
                  {options.map(({ label, name }) => (
                    <li key={name}>
                      <Switcher
                        label={label}
                        value={formData[name]}
                        onChange={() => handleSwitcherChange(name)}
                      />
                    </li>
                  ))}
                  <Button
                    onClick={() => onPrivacyUpdate()}
                    className="ml-auto max-w-full translate-y-2 md:max-w-full"
                  >
                    Update Preference
                  </Button>
                </ul>
              </div>
            </div>
            <div className="mb-4 translate-y-2 space-y-2 font-medium text-primary md:text-lg">
              <Link href="/auth/resetpassword">Change Password</Link>
              <p>Manage Subscription</p>
            </div>
            <SubscriptionDetails className="pt-2 md:hidden" />
          </div>
          <div className="w-full">
            <h4 className="mb-2 font-semibold text-black">Billed with:</h4>
            <CardDetails
              cardLastNumber={
                data?.cardLastNumber ?? <span className="mb-1">----</span>
              }
              cardName={
                data?.cardName ?? <span className="text-sm">No card found</span>
              }
            />
            <div className="mt-3 space-y-3 md:pl-2">
              <SubscriptionDetails className="max-md:hidden" />
              <p className="font-medium capitalize text-[#5724EB] md:text-lg">
                Update payment method
              </p>

              <div className="flex flex-col justify-between gap-4 max-md:pt-3 md:flex-row md:items-center">
                {session?.user.isSubscribed ? (
                  <button
                    type="button"
                    onClick={handleCancelSubscription}
                    className="block text-sm capitalize text-black"
                  >
                    Cancel subscription
                  </button>
                ) : (
                  <Link
                    href="/user/subscribe"
                    className="block capitalize text-black md:text-lg"
                  >
                    Subscribe to premium
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
                  type="button"
                  className="flex cursor-pointer items-center gap-2 text-sm text-black"
                >
                  <FiLogOut className="text-lg" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default UserProfileBody;
