// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDply3jffn_edAWV4w0l0KL35G0rVcTdiU",
  authDomain: "chat-53cfe.firebaseapp.com",
  projectId: "chat-53cfe",
  storageBucket: "chat-53cfe.appspot.com",
  messagingSenderId: "883626144408",
  appId: "1:883626144408:web:18b2cfc7c8d854378616ed",
  measurementId: "G-SD0GPHTC8H"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth= getAuth()
export const storage = getStorage();
export  const db=getFirestore(app)
