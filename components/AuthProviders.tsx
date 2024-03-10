'use client'

import { signInWithGoogle } from "@/lib/firebase/auth"

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
      <button onClick={handleSignInWithGoogle}>Sign In</button>
    </>
  )
}
export default AuthProvider