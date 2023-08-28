import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    personId: string;
    role: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    channel: "credentials" | "google";
    idToken: string;
    firstName: string;
    lastName: string;
    isSubscribed: boolean;
    stripeCustomerId: string | null;
  }
  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    email: string;
    personId: string;
    firstName: string;
    lastName: string;
    accessToken: string;
    refreshToken: string;
    idToken: string;
    channel: "credentials" | "google";
    isSubscribed: boolean;
    stripeCustomerId: string | null;
  }
}
