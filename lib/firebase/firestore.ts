import { db } from "@/firebase/firebase.config";
import { collection, getDocs, query } from "@firebase/firestore/lite";

async function getData<T>(collectionName: string) {
	let arr: T[] = [];

	try {
		let ref = query(collection(db, collectionName));

		const snapshot = await getDocs(ref);

		snapshot.forEach((doc) => {
			arr.push({
				id: doc.id,
				...doc.data(),
			} as T);
		});

		return arr;
	} catch (error) {
		throw new Error("");
	}
}

export { getData };
