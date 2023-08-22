import { signOut, useSession } from "next-auth/react";
import { validateAuthToken } from "@/base/helpers/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import PhotoFlowLoader from "@/components/molecules/PhotoFlow/PhotoFlowLoader";

// interface HomeProps {
//   personId: string;
//   session: Session | null;
// }
const Home = () => {
  const { data: session } = useSession();
  const { personId, accessToken } = session?.user ?? {};

  const router = useRouter();

  const validateToken = async (token: string) => {
    const isValidToken = await validateAuthToken(token);
    if (!isValidToken) {
      signOut({
        callbackUrl: "/auth/signin",
      });
    }
  };

  useEffect(() => {
    if (session) {
      validateToken(accessToken ?? "");
      if (personId) {
        router.push(`/dashboard/tree/${personId}`);
      } else {
        router.push(`/user/profile/update?step=moreinfo`);
      }
    } else {
      router.push("/auth/signin");
    }
  }, [session]);

  return <PhotoFlowLoader />;
};

export default Home;

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const userSession = await getSession(context);
//   const { personId: id, accessToken } = userSession?.user ?? {};

//   if (userSession) {
//     const isValidToken = await validateAuthToken(accessToken ?? "");

//     if (!isValidToken) {
//       signOut({
//         callbackUrl: "/auth/signin",
//       });
//       return {
//         redirect: {
//           destination: `/auth/signin`,
//           permanent: false,
//         },
//       };
//     }
//     return {
//       props: {
//         personId: id ?? null,
//         session: userSession ?? null,
//       },
//     };
//   }
//   return {
//     redirect: {
//       destination: `/auth/signin`,
//       permanent: false,
//     },
//   };
// }
