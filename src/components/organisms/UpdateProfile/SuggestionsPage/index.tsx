import SuggestionCard from "@/components/molecules/Switch/SuggestionCard";
import useStore from "@/base/store";
import { useState } from "react";
import { toast } from "react-toastify";
import { BsArrowLeft } from "react-icons/bs";
import Axios from "@/base/axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Props {
  /** next step to redirect to */
  nextPath?: Record<string, string>;
  isUser?: boolean;
}

const SuggestionsPage = (props: Props) => {
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { createPersonData, setPersonData } = useStore();
  const { data: session } = useSession();

  const { nextPath = { step: "about" }, isUser = true } = props;

  if (!createPersonData || !createPersonData.hasSugestion)
    return (
      <div className="mx-auto w-full max-w-xs py-20 max-sm:mx-auto sm:max-w-lg">
        <div>
          <p className="mt-10">
            No suggestions found,{" "}
            <Link
              className="text-center text-primary underline underline-offset-4"
              href={{ query: { ...router.query, ...nextPath } }}
            >
              please proceed forward
            </Link>
          </p>
        </div>
      </div>
    );

  const { suggestions, _tempProfileId } = createPersonData;

  const {
    contributor,
    person: { firstName, lastName, homeTown, userId },
  } = suggestions[selected];

  const handlePersonAccept = async () => {
    if (session) {
      const { user } = session;
      setLoading(true);
      const payload = {
        _tempDataId: _tempProfileId,
        acceptedPersonId: userId,
        acceptedSuggestion: "true",
        isUser,
      };

      try {
        const res = await Axios.post("person/accept-suggestion", payload, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });

        setPersonData({ ...createPersonData, _tempProfileId: res.data.data });

        toast.success("User updated");
        router.push({ query: { ...router.query, ...nextPath } });
      } catch (error) {
        toast.error(String(error));
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("You are not signed in, sign in to continue");
    }
  };

  const handlePersonReject = () => {
    if (selected < suggestions.length - 1) {
      setSelected((c) => c + 1);
    } else {
      toast.info("You are all caught up, proceed to the next step");
      router.push({ query: { step: "about" } });
    }
  };

  return (
    <div className="mx-auto w-full max-w-xs py-20 max-sm:mx-auto sm:max-w-lg">
      {loading && (
        <div className="fixed inset-0 z-50 bg-white bg-opacity-40">
          <span className="sr-only">Loading</span>
        </div>
      )}
      <div>
        <div className="mb-4 h-6">
          {selected > 0 && (
            <button
              onClick={() => setSelected((c) => c - 1)}
              className="flex items-center gap-2"
              type="button"
            >
              <BsArrowLeft className="h-6 w-6 cursor-pointer" />
              <span>Previous</span>
            </button>
          )}
        </div>
        <SuggestionCard
          key={firstName}
          addedBy={{
            name: `${contributor.firstName} ${contributor.lastName}`,
          }}
          name={`${firstName} ${lastName}`}
          state={homeTown}
          onAccept={handlePersonAccept}
          onReject={handlePersonReject}
        />
      </div>
    </div>
  );
};

export default SuggestionsPage;
