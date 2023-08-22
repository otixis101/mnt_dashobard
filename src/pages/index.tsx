import { GetServerSidePropsContext } from "next/types";
import { getSession, signOut } from "next-auth/react";
import { validateAuthToken } from "@/base/helpers/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface HomeProps {
  personId: string;
}

const Home = ({ personId }: HomeProps) => {
  const router = useRouter();

  useEffect(() => {
    if (personId) {
      router.push(`/dashboard/tree/${personId}`);
    } else {
      router.push(`/user/profile/update?step=moreinfo`);
    }
  }, [personId]);

  return null;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  const { personId, accessToken } = session?.user ?? {};

  if (session) {
    const isValidToken = await validateAuthToken(accessToken ?? "");

    if (!isValidToken) {
      signOut({
        callbackUrl: "/auth/signin",
      });
      return {
        props: {},
      };
    }
  }

  return {
    props: {
      personId: personId ?? "",
    },
  };
}

export default Home;
