import { NextAuthOptions, User, getServerSession } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth"
import { auth, db } from "@/firebase/firebase.config";

import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { cert } from "firebase-admin/app";
import { serviceAccount } from "@/firebase/admin.config";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })
  ],
  // callbacks: {
  //   async signIn({ user }: { user: AdapterUser | User }) {
  //     try {

  //       return true
  //     } catch (error: any) {
  //       console.log(console.log(error));
  //       return false
  //     }
  //   },
  //   async session({ session }) {
  //     return session
  //   },
  // }
}

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  return session;
}

export const signOut = async (): Promise<void> => {
  await auth.signOut();
  window.location.reload()
};