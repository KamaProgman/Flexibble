import { ProjectForm, ProjectInterface } from "@/common.types"
import { db, storage } from "@/firebase/firebase.config"
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where, updateDoc, Query, DocumentData } from "@firebase/firestore";
import { User } from "next-auth";

const serverUrl = 'http://localhost:3000' || process.env.NEXT_PUBLIC_SERVER_URL;

export const fetchToken = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/auth/token`);

    return response.json();
  } catch (err) {
    throw err;
  }
};

export async function getCollection<T>(collectioName: string) {
  try {
    let ref = collection(db, collectioName)
    const snapshot = await getDocs(ref)

    let arr: T[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }) as T)

    return arr
  } catch (error) {
    throw error;
  }
}

export async function getProjects(category: string | null = null) {
  try {
    let ref: Query<DocumentData> = collection(db, "projects")

    if (category) {
      ref = query(ref, where('category', '==', category))
    }

    const snapshot = await getDocs(ref)
    let projects = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }) as ProjectInterface)

    return projects
  } catch (error) {
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

export const createNewProject = async (form: ProjectForm, user: User) => {
  try {
    if (form.image) {
      const imageUrl = await uploadImage(form.image);
      const { image, ...formDataWithoutImage } = form;

      let projectsRef = collection(db, 'projects');
      const newProjectRef = await addDoc(projectsRef, {
        ...formDataWithoutImage,
        imageUrl: imageUrl,
        createdBy: {
          name: user.name,
          email: user.email,
          avatarUrl: user.image,
          id: user.id,
        }
      });
      console.log('Project created successfully!', newProjectRef.id);
    }
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
}

export const getUserProjects = async (userId: string) => {
  try {
    const ref = collection(db, "projects")
    const q = query(ref, where("createdBy.id", "==", userId))
    const snapshot = await getDocs(q)
    const projects = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }) as ProjectInterface)

    return projects
  } catch (error) {
    throw error;
  }
}

export const getProjectDetails = async (id: string) => {
  try {
    const docRef = doc(db, "projects", id);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      return { id, ...snapshot.data() }
    } else {
      console.log('No such document!');
      return null
    }
  } catch (error) {
    throw error;
  }
}

export const deleteProject = async (id: string, token: string) => {
  try {
    const ref = doc(db, 'projects', id)
    await deleteDoc(ref)

    console.log('Project deleted successfully:', id);
  } catch (error) {
    throw error;
  }
}

export const updateProject = async (projectId: string, form: Partial<ProjectForm>) => {
  function isDataUrl(value: string) {
    const dataUrlRegex = /^data:image\/([a-zA-Z]*);base64,/;

    return dataUrlRegex.test(value);
  }

  try {
    const ref = doc(db, 'projects', projectId);
    const { image, ...formDataWithoutImage } = form;
    let updatedForm = { ...formDataWithoutImage };

    if (form.image && isDataUrl(form?.imageUrl as string)) {
      const imageUrl = await uploadImage(form.image);
      updatedForm = {
        ...formDataWithoutImage,
        imageUrl: imageUrl
      };
    }
    await updateDoc(ref, updatedForm);
    console.log('Project editted successfully!', projectId);
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
}
