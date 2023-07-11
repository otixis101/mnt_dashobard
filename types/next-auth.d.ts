import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    channel: "credentials" | "google";
    idToken: string;
    firstName: string;
    lastName: string;
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
    firstName: string;
    lastName: string;
    accessToken: string;
    refreshToken: string;
    idToken: string;
    channel: "credentials" | "google";
  }
}
