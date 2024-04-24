"use client"
import { signIn } from "next-auth/react";

export const AuthProvider = () => {
  return (
    <>
      <button onClick={() => signIn('google')}>Sign In</button>
    </>
  )
}
export default AuthProvider