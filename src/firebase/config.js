import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC9mz4ZD3xms10kdslcHImeZaVY-rawEG8",
  authDomain: "seymursite-8bd16.firebaseapp.com",
  projectId: "seymursite-8bd16",
  storageBucket: "seymursite-8bd16.firebasestorage.app",
  messagingSenderId: "285928583091",
  appId: "1:285928583091:web:0611ac2dd8246b7df765c6",
  measurementId: "G-SLMV8KCFCV"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

