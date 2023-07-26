import { InviteFamilyMemberSchema } from "@/base/helpers/FormValidationSchemas";
import { handleSchemaValidation } from "@/base/utils/validation";
import Button from "@/components/atoms/Button";
import SeparatorInput from "@/components/atoms/Input/SeparatorInput";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { UrlObject } from "url";

type LinkType = string | (string & UrlObject);
interface Props {
  onSubmit(): void;
  onCancel: LinkType | (() => void);
}

const InviteMemberForm = ({ onSubmit, onCancel }: Props) => {
  const [emails, setEmails] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { data: session } = useSession();

  const inviteFamilyMember = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/invite`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
          body: JSON.stringify({
            invitee: emails,
            type: "DEFAULT",
          }),
        }
      );
      if (res.status === 200) {
        toast.success("Profile created successfully");
        const data = await res.json();
        console.log(data);

        onSubmit();
      }
    } catch (err) {
      toast.error("An error occurred");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleSchemaValidation({
      data: emails,
      schema: InviteFamilyMemberSchema,
      onError: setError,
      onSuccess: inviteFamilyMember,
    });
  };

  return (
    <div className="p-3">
      <form
        onSubmit={handleSubmit}
        className="mx-auto min-h-[500px] w-full max-w-md space-y-10 rounded-lg p-3 text-center md:border md:px-8 md:py-14"
      >
        <h4 className="mx-auto max-w-[18ch] text-2xl text-custom-black">
          Invite family member to My Native Tree
        </h4>
        <div className="pt-6 text-left">
          <SeparatorInput
            label="Enter email address"
            placeholder="Enter email address separated by a comma"
            tags={emails}
            onTagsChange={setEmails}
            tagsType="email"
            hint={error}
            isError={Boolean(error)}
          />
        </div>
        <div className="space-y-4 pt-3">
          <Button type="submit" loading={loading} className="min-w-full">
            Invite
          </Button>
          {onCancel instanceof Function ? (
            <Button onClick={onCancel} className="min-w-full" intent="outline">
              Cancel
            </Button>
          ) : (
            <Button
              loading={loading}
              href={onCancel}
              className="min-w-full"
              intent="outline"
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default InviteMemberForm;
