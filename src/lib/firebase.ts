import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA_Zt9XsSM0KwrVxu8YmHihlSsrgLx_oe4",
  authDomain: "aethric-code.firebaseapp.com",
  projectId: "aethric-code",
  storageBucket: "aethric-code.firebasestorage.app",
  messagingSenderId: "899279666919",
  appId: "1:899279666919:web:ca8abf68b528646fce2c42",
  measurementId: "G-8PFBSJBFD3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
