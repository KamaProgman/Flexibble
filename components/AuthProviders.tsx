"use client"

import { signInWithGoogle } from "@/lib/auth";
import { signIn } from "next-auth/react";

export const AuthProvider = () => {
  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle()
      window.location.reload()

      console.log('User signed in with Google successfully');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  }

  return (
    <>
      <button onClick={() => signIn('google')}>Sign In</button>
    </>
  )
}
export default AuthProvider