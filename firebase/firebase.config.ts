import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAgAICJRXPle0dNfCfgMkG-hcV949YkVsg",
  authDomain: "flexibble-4943a.firebaseapp.com",
  databaseURL: "https://flexibble-4943a-default-rtdb.firebaseio.com",
  projectId: "flexibble-4943a",
  storageBucket: "flexibble-4943a.appspot.com",
  messagingSenderId: "375706988990",
  appId: "1:375706988990:web:c76bb72d056397c52c09ef",
  measurementId: "G-H4WQBN15CZ"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);



