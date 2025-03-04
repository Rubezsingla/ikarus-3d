import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Firebase configuration (replace with your Firebase credentials)
const firebaseConfig = {
    apiKey: "AIzaSyDn_K4nc0FPnwZu5Yb3nUtfCuU6XfxGgpY",
    authDomain: "ikarus-e13a9.firebaseapp.com",
    projectId: "ikarus-e13a9",
    storageBucket: "ikarus-e13a9.firebasestorage.app",
    messagingSenderId: "941406135042",
    appId: "1:941406135042:web:3bdd7b6a708b77c481d81b",
    measurementId: "G-4GW0672R7B"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { storage, db, ref, uploadBytes, getDownloadURL, collection, addDoc };