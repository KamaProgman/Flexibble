import { NextAuthOptions, User, getServerSession } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import { auth, createUser, getUser } from "@/firebase/firebase.config";
import { UserProfile, createUserWithEmailAndPassword } from "firebase/auth";
import { SessionInterface } from "@/common.types";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })
  ],
  callbacks: {
    async signIn({ user }: { user: AdapterUser | User }) {
      try {

        await createUserWithEmailAndPassword(auth, user.email as string, 'asd')

        await createUser(user)
        return true
      } catch (error) {
        return false
      }
    },
    async session({ session }) {
      try {
        if (session.user?.email) {
          const userData = await getUser(session.user.email) as UserProfile
          session.user = {
            ...session.user,
            ...userData,
          };
        }
        return session;
      } catch (error) {
        throw error;
      }
    }
  }
}

export async function getCurrentUser() {
  const session = await getServerSession(authOptions) as SessionInterface;

  return session;
}

// if (user.email) {
//   const userData = await getUser(user.email) as UserProfile;

//   // if (!userData) {
//   //   await createUser({
//   //     name: user.name,
//   //     email: user.email,
//   //     image: user.image
//   //   });
//   // }
// }