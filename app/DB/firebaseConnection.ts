// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = { 
  apiKey: process?.env.NEXT_PUBLIC_APIKEY, 
  authDomain: process?.env.NEXT_PUBLIC_AUTHDOMAIN, 
  databaseURL: process?.env.NEXT_PUBLIC_DATABASEURL, 
  projectId: process?.env.NEXT_PUBLIC_PROJECTID, 
  storageBucket: process?.env.NEXT_PUBLIC_STORAGEBUCKET, 
  messagingSenderId: process?.env.NEXT_PUBLIC_MESSAGINGSENDERID, 
  appId: process?.env.NEXT_PUBLIC_APID, 
  measurementId: process?.env.NEXT_PUBLIC_MESSUREMENTID
};


export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db=getFirestore(app);
export const storage=getStorage(app);