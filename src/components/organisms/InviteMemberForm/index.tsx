import Button from "@/components/atoms/Button";
import SeparatorInput from "@/components/atoms/Input/SeparatorInput";
import { useState } from "react";
import { UrlObject } from "url";

type LinkType = string | (string & UrlObject);
interface Props {
  onSubmit(): void;
  onCancel: LinkType | (() => void);
}

const InviteMemberForm = ({ onSubmit, onCancel }: Props) => {
  const [emails, setEmails] = useState<string[]>([]);

  return (
    <div className="p-3">
      <div className="mx-auto min-h-[500px] w-full max-w-md space-y-10 rounded-lg p-3 text-center md:border md:px-8 md:py-14">
        <h4 className="mx-auto max-w-[18ch] text-2xl text-custom-black">
          Invite family member to My Native Tree
        </h4>
        <div className="pt-6 text-left">
          <SeparatorInput
            placeholder="Enter email address"
            label="Enter email addresses, Separate with comma."
            tags={emails}
            onTagsChange={setEmails}
            tagsType="email"
          />
        </div>
        <div className="space-y-4 pt-3">
          <Button className="min-w-full" onClick={onSubmit}>
            Invite
          </Button>
          {onCancel instanceof Function ? (
            <Button onClick={onCancel} className="min-w-full" intent="outline">
              Cancel
            </Button>
          ) : (
            <Button href={onCancel} className="min-w-full" intent="outline">
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InviteMemberForm;
