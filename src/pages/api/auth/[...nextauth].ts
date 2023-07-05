import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
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
          };
          return user;
        }
        throw new Error(message);
      },
    }),
    // GoogleProvider({}),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.accessToken = user.accessToken;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.email = token.email;
        session.user.accessToken = token.accessToken;
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
