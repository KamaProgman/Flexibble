import admin from 'firebase-admin';
import { ProjectForm } from "@/common.types"
import { app } from "@/firebase/firebase.config"
import { getDownloadURL, getStorage, ref, uploadString } from 'firebase/storage';


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

