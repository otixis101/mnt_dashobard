/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from "react";
import Button from "@/components/atoms/Button";
// import Radio from "@/components/atoms/Input/Radio";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { toast } from "react-toastify";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Axios from "@/base/axios";
// import { cn } from "@/base/utils";
import useStore from "@/base/store";
import { getAgeByDate } from "@/base/utils";

// import { format } from "date-fns";
import useFetchPerson from "@/base/hooks/api/useFetchPersonData";

// import Image from "next/image";


// const getToastMessage = (arg: unknown, msg: string) => {
//   if (!arg) {
//     toast.error(msg);
//     return true;
//   }

//   return false;
// };


// type Person = {
//   firstName?: string,
//   lastName?: string,
//   phoneNumber?: string,
//   stateOfOrigin?: string,
//   countryOfOrigin?: string,
//   dateOfBirth?: Date,
//   placeOfBirth?: string,
//   homeTown?: string,
//   mothersMaidenName?: string,
//   gender?: string,
//   facts?: string,
//   relationship?: string,
//   placeOfDeath?: string,
//   lifeStatus?: string,
//   profilePhoto?: File,
//   isUser?: boolean
// }

interface Props {
  onPrevClick(): void;
  // onNextClick?(): void;
}

const FinallyPage = (props: Props) => {
  const { onPrevClick } =
    props;

  const { data: session } = useSession();

  const [getData, setData] = useState<DbPerson | null>(null);

  // Get Relative Data from ref query
  const router = useRouter();
  const { query } = router;

  const relativeId = query.ref as string;

  // const getRelativeData = async () => {

  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_BASE_URL}/person?personId=${relativeId}`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${session?.user?.accessToken}`,
  //       },
  //     }
  //   );

  //   if (res && res.ok) {
  //     const { data: person } = await res.json();
  //     setData(person);
  //   }
  // };

  const { data } = useFetchPerson(relativeId ?? "");

  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data]);

  // useEffect(() => {
  //   getRelativeData();
  // }, []);

  // const [file, setFile] = useState<File>();
  // const [profilePhotoUrl, setProfilePhotoUrl] = useState("");

  const [bio, setBio] = useState<string>("");

  const { createPersonData } = useStore();

  const [loading, setLoading] = useState(false);



  // const { query } = router;

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

      if (query.ref) {
        formDataPayload.append("reference", query.ref as string);
      }

      formDataPayload.append(
        "about",
        bio
      );
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
      <img src={getData?.profilePhotoUrl} alt="pfp" className="w-28 h-28 rounded-xl bg-gray-100" />
      <section className="grow flex flex-col gap-3">
        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
          <h1 className="text-4xl text-primary font-semibold">{getData?.firstName} {getData?.lastName}</h1>
          <span className="bg-green-300 capitalize text-white p-2 px-16 rounded-lg w-fit">{query.relation}</span>
        </div>
        <h1>{getData ? `${getData?.stateOfOrigin}, ${getData.countryOfOrigin}` : ""}</h1>
        <div className="flex gap-2 items-center">
          <h1>{getData?.dateOfBirth}</h1>
          <span className="w-2 h-2 rounded-full bg-gray-800" />
          <p>{getAgeByDate(getData?.dateOfBirth ?? "")} years</p>
        </div>
        <form className="py-6" onSubmit={handleFormSubmit}>
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
