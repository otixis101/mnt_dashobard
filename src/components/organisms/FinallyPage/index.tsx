/* eslint-disable no-underscore-dangle */
import React, { useState } from "react";
import Button from "@/components/atoms/Button";
// import Radio from "@/components/atoms/Input/Radio";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { toast } from "react-toastify";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Axios from "@/base/axios";
// import { cn } from "@/base/utils";
import useStore from "@/base/store";

import Image from "next/image";


// const getToastMessage = (arg: unknown, msg: string) => {
//   if (!arg) {
//     toast.error(msg);
//     return true;
//   }

//   return false;
// };

interface Props {
  onPrevClick(): void;
  // onNextClick?(): void;
}

const FinallyPage = (props: Props) => {
  const { onPrevClick } =
    props;

  // const [file, setFile] = useState<File>();
  const [profilePhotoUrl, setProfilePhotoUrl] = useState("");
  const [bio, setBio] = useState<string>("");

  const { createPersonData } = useStore();


  const [loading, setLoading] = useState(false);


  const { data: session } = useSession();

  const router = useRouter();

  const { query } = router;


  const relative = createPersonData as DbPersonWithOutSuggestion;

  const suggestedRelative =
    query.isSuggestion === "true"
      ? (createPersonData as DbPersonWithSuggestion)
      : ([] as unknown as DbPersonWithSuggestion);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    if (session) {
      const { user } = session;

      const formDataPayload = new FormData();

      if (query.reference2) {
        formDataPayload.append("reference2", query.reference2 as string);
      }

      formDataPayload.append(
        "relativeId",
        query.isSuggestion === "true"
          ? suggestedRelative.suggestions[0].person._id
          : relative?.personId ?? ""
      );
      setLoading(true);
      try {
        const res = await Axios.post(`/person/family/add`, formDataPayload, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        });

        if (res) {
          toast.success("User profile updated successfully");
          router.push({
            query: {
              step: "complete",
            },
          });
        }
      } catch (error) {
        toast.error(String(error));
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("You are not signed, Sign in to proceed");
    }
  };

  return (
    <section className="flex flex-col lg:flex-row gap-6">
      <Image src={""} alt="" className="w-28 h-28 rounded-xl bg-gray-100" />
      <section className="grow flex flex-col gap-3">
        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
          <h1 className="text-4xl text-primary font-semibold">Ama Okeke</h1>
          <span className="bg-green-300 text-white p-2 px-16 rounded-lg w-fit">Mother</span>
        </div>
        <h1>Rivers State, Nigeria</h1>
        <div className="flex gap-2 items-center">
          <h1>11th June 1996</h1>
          <span className="w-2 h-2 rounded-full bg-gray-800" />
          <p>27 years</p>
        </div>
        <form className="pb-10" onSubmit={handleFormSubmit}>
          <textarea onChange={(e) => setBio(e.target.value)} rows={4} className="outline-primary placeholder:text-primary w-full border rounded-xl border-primary p-2" placeholder="Add bio about Ama" />

          <div className="flex items-center justify-between gap-6 my-8">
            <Button className="lg:px-0 lg:w-fit border lg:border-none border-primary bg-transparent text-black" onClick={onPrevClick}>
              <ArrowLeftIcon className="w-4 h-4" /> Back
            </Button>
            <Button loading={loading} className="" type="submit">
              Finish
            </Button>

          </div>
        </form>
      </section>
    </section >
  );
};

export default FinallyPage;
