"use client"
import { signIn } from "next-auth/react";
import Button from "./Button";
import { useState } from "react";

export const AuthProvider = () => {
  const [isSigning, setIsSigning] = useState(false);

  const handleSignIn = async () => {
    setIsSigning(true)
    try {
      await signIn('google')
    } catch (error) {
      throw error
    }
    finally {
      setIsSigning(false)
    }
  }

  return (
    <>
      <Button title="Sign In" handleClick={handleSignIn} isSubmitting={isSigning} />
    </>
  )
}
export default AuthProvider