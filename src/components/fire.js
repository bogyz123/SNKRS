// Import the functions you need from the SDKs you need
import { getAuth } from "@firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSpntZT7t68LH8v1wYZsvTfoPIm3qOAz4",
  authDomain: "snkrs-bdc02.firebaseapp.com",
  projectId: "snkrs-bdc02",
  storageBucket: "snkrs-bdc02.appspot.com",
  messagingSenderId: "767142886470",
  appId: "1:767142886470:web:35decb5e5a23d9a5671e47"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);