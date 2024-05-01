import { ProjectForm } from "@/common.types"
import { db, storage } from "@/firebase/firebase.config"
import { getDownloadURL, ref, uploadBytes, uploadString } from 'firebase/storage';
import { addDoc, collection, getDocs, query, where } from "@firebase/firestore";
import { User } from "next-auth";


export const uploadImage = async (imageFile: File) => {
  try {
    const imageRef = ref(storage, `images/${imageFile.name}`)
    await uploadBytes(imageRef, imageFile)
    const downloadURL = await getDownloadURL(imageRef)

    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}
export const createNewProject = async (form: ProjectForm, creatorId: string) => {
  try {
    if (form.image) {
      const imageUrl = await uploadImage(form.image);

      const { image, ...formDataWithoutImage } = form;

      let projectsRef = collection(db, 'projects');
      const newProjectRef = await addDoc(projectsRef, {
        ...formDataWithoutImage,
        creatorId: creatorId,
        imageUrl: imageUrl
      });

      console.log('Project created successfully!', newProjectRef.id);
    }
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
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
      name: user.name,
      email: user.email,
      image: user?.image
    });

    return true;
    true
  } catch (error) {
    console.error('Error creating user:', error);
  }
}