import { db } from "@/firebase/firebase.config"
import { collection, getDocs, query } from "@firebase/firestore"

async function getCollections<T>(collectioName: string) {
  let arr: T[] = []

  try {
    let ref = query(collection(db, collectioName))
    const snapshot = await getDocs(ref)

    snapshot.forEach((doc) => {
      arr.push({
        id: doc.id,
        ...doc.data()
      } as T)
    })

    return arr
  } catch (error) {
    throw error;
  }
}