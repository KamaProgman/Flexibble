import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import admin from 'firebase-admin';
import { User } from "next-auth";
import { addDoc, collection, getFirestore } from "@firebase/firestore";

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// const serviceAccount = require('../credentials/flexibble-4943a-firebase-adminsdk-im2n3-b18f89b70e.json')

// if (!admin.apps.length) {
// 	admin.initializeApp({
// 		credential: admin.credential.cert(serviceAccount),
// 		databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
// 	})
// }

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);


export const getUser = async (email: string) => {
	try {
		const userRecord = await admin.auth().getUserByEmail(email);
		const userData = {
			uid: userRecord.uid,
			email: userRecord.email,
		};
		return userData;
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
		});

		return true;
		true
	} catch (error) {
		console.error('Error creating user:', error);
	}
}
