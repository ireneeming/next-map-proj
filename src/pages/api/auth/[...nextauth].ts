import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import GoogleProvider from "next-auth/providers/google";
import Google from "next-auth/providers/google";
import { pages } from "next/dist/build/templates/app-page";

const prisma = new PrismaClient();

export const authOptions = {
 // Configure one or more authentication providers
 adapter: PrismaAdapter(prisma),
 providers: [
  // ...add more providers here
  GoogleProvider({
   clientId: process.env.GOOGLE_CLIENT_ID || "",
   clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  }),
 ],
 pages: {
  signIn: "/users/login",
 },
};

export default NextAuth(authOptions);
