import { auth } from "@/firebase/firebase.config"
import { GoogleAuthProvider, User, UserCredential, signInWithPopup } from "firebase/auth"

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      unsubscribe()
      resolve(user)
    }, error => {
      reject(error)
    }
    )
  })
}

export const signInWithGoogle = async (): Promise<UserCredential> => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    return userCredential;
  } catch (error) {
    throw error
  };
}

export const signOut = async (): Promise<void> => {
  try {
    await auth.signOut()
  } catch (error) {
    throw error
  }
}