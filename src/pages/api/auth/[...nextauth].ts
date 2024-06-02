import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/db";

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
