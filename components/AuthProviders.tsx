"use client"
import { signIn } from "next-auth/react";
import Button from "./Button";

export const AuthProvider = () => {
  return (
    <>
      <Button title="Sign In" handleClick={() => signIn('google')} />
    </>
  )
}
export default AuthProvider