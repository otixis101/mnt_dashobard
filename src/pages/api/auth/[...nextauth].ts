import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

export type Logincredentials = {
  email: string;
  password: string;
};

type UserResponse = {
  email: string;
  role: string;
  id: string;
  accessToken: string;
  personId?: string;
  isSubscribed: boolean;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      /**
       ** Ignoring this error because we are not using a database and it is a known error from next-auth that has not been fixed
       */
      // @ts-ignore
      authorize: async (
        credentials: Logincredentials
      ): Promise<UserResponse | null> => {
        const { email, password } = credentials;

        const res = await fetch(
          `https://my-native-tree.onrender.com/api/auth/login`,
          {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const { data, message } = await res.json();
        if (res.ok) {
          const user = {
            role: data.role,
            email: data.email,
            id: data.id,
            accessToken: data.accessToken,
            personId: data.personId ?? null,
            isSubscribed: data?.isSubscribed ?? false,
            stripeCustomerId: data?.stripeCustomerId ?? null,
          };
          return user;
        }
        throw new Error(message);
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      if (trigger === "update") {
        token.accessToken = session.user.accessToken;
        token.id = session.user.id;
        token.firstName = session.user.firstName;
        token.lastName = session.user.lastName;
        token.email = session.user.email;
        token.role = session.user.role;
        token.personId = session.user.personId;
        token.isSubscribed = session.user.isSubscribed;
        token.stripeCustomerId = session.user.stripeCustomerId;
      }
      if (user) {
        if (account && account.provider === "google") {
          token.accessToken = account.access_token as string;
          token.refreshToken = account.refresh_token as string;
          token.channel = "google";
          token.id = user.id;
          token.email = user.email;
          token.role = user.role;
          token.personId = user.personId;
          token.isSubscribed = user.isSubscribed;
          token.stripeCustomerId = user.stripeCustomerId;
        } else {
          token.id = user.id;
          token.email = user.email;
          token.accessToken = user.accessToken;
          token.role = user.role;
          token.channel = "credentials";
          token.personId = user.personId;
          token.isSubscribed = user.isSubscribed;
          token.stripeCustomerId = user.stripeCustomerId;
        }
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session && token.channel === "credentials") {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.email = token.email;
        session.user.accessToken = token.accessToken;
        session.user.channel = token.channel;
        session.user.personId = token.personId;
        session.user.isSubscribed = token.isSubscribed;
        session.user.stripeCustomerId = token.stripeCustomerId;
      } else {
        session.user.channel = token.channel;
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.id = token.id;
        session.user.idToken = token.idToken;
        session.user.personId = token.personId;
        session.user.isSubscribed = token.isSubscribed;
        session.user.stripeCustomerId = token.stripeCustomerId;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
