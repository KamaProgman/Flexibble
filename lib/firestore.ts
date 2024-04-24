// import { db, auth } from "@/firebase/firebase.config";
// import { where } from "@firebase/firestore";
// import { collection, getDocs, query } from "@firebase/firestore/lite";

// async function getData<T>(collectionName: string) {
// 	let arr: T[] = [];

// 	try {
// 		let ref = query(collection(db, collectionName));

// 		const snapshot = await getDocs(ref);

// 		snapshot.forEach((doc) => {
// 			arr.push({
// 				id: doc.id,
// 				...doc.data(),
// 			} as T);
// 		});

// 		return arr;
// 	} catch (error) {
// 		throw new Error("");
// 	}
// }

// export { getData };

// export async function getUser(email: string) {
// 	try {
// 		const userRef = query(collection(db, 'users'), where('email', '==', email))

// 		const querySnapshot = await getDocs(userRef)

// 		if (querySnapshot) {
// 			// const userData = querySnapshot.docs[1].data()

// 			// return userData
// 		}
// 		else throw new Error("")
// 	} catch (error) {
// 		console.error("Error getting user by email:", error);
// 		throw error;
// 	}
// }