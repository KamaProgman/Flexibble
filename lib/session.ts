import { NextAuthOptions, User, getServerSession } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import { SessionInterface } from "@/common.types";
import { createUser, getUser } from "./actions";
import jsonwebtoken from 'jsonwebtoken'
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })
  ],
  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(
        {
          ...token,
          iss: "firebase",
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        secret
      );
      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token!, secret);
      return decodedToken as JWT;
    },
  },
  callbacks: {
    async signIn({ user }: { user: AdapterUser | User }) {
      try {
        const userExists = await getUser(user.email as string)
        if (!userExists) {
          await createUser(user)
          return true
        } else {
          return true
        }
      } catch (error) {
        return false
      }
    },
    async session({ session }) {
      const email = session.user?.email
      try {
        const userData = await getUser(email as string)

        session = {
          ...session,
          user: userData
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