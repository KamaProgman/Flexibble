import { ProjectForm } from "@/common.types"
import { app, db } from "@/firebase/firebase.config"
import { getDownloadURL, getStorage, ref, uploadString } from 'firebase/storage';
import { addDoc, collection, getDocs, getFirestore, query, where } from "@firebase/firestore";
import { User } from "next-auth";


export const uploadImage = async (imageData: string) => {
  try {
    const storage = getStorage(app)
    const imageRef = ref(storage, `images/${Date.now()}.jpg`)
    const snapshot = await uploadString(imageRef, imageData, 'data_url')
    const imageURL = await getDownloadURL(snapshot.ref);
  } catch (error) {
    throw error;
  }
}
export const createNewProject = async (form: ProjectForm, creator0Id: string, token: string) => {
  const imageUrl = await uploadImage(form.image)
}


export const getUser = async (email: string) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email))
    const snapshot = await getDocs(q)

    let user;

    snapshot.forEach((doc) => {
      user = { ...doc.data() }
    })

    return user;
  } catch (error) {
    console.error('Error getting user by email:', error);
    throw error;
  }
};

export const createUser = async (user: User) => {
  try {
    const usersCollectionRef = collection(db, "users");

    await addDoc(usersCollectionRef, {
      id: user?.id,
      name: user.name || null,
      email: user.email || null,
      image: user?.image
    });

    return true;
    true
  } catch (error) {
    console.error('Error creating user:', error);
  }
}