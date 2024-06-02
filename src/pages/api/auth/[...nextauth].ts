import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/db";

export const authOptions: NextAuthOptions = {
 // Configure one or more authentication providers
 session: {
  strategy: "jwt" as const,
  maxAge: 60 * 60 * 24,
  updateAge: 60 * 60 * 2,
 },
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
 callbacks: {
  session: ({ session, token }) => ({
   ...session,
   user: {
    ...session.user,
    id: token.sub,
   },
  }),
  jwt: async ({ user, token }) => {
   if (user) {
    token.sub = user.id;
   }
   return token;
  },
 },
};

export default NextAuth(authOptions);
