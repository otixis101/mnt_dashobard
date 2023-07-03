import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

export type Logincredentials = {
  email: string;
  password: string;
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
      ): Promise<Logincredentials | null> => {
        /**
         * This is where we would validate the user against our backend database
         *TODO: Implement api validation for user
         */

        const uservalidation = () => {
          if (
            credentials.email === "sunday@gmail.com" &&
            credentials.password === "sunday"
          ) {
            return { isValid: true };
          }
          return { isValid: false };
        };

        if (uservalidation().isValid) {
          const user = {
            ...credentials,
            id: "1",
            role: "admin",
            accessToken: "helloworld",
          };
          return user;
        }
        throw new Error("Invalid login");
      },
    }),
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
