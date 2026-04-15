import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCuUZTPxGs0MOEPXlSF3Eq5r8pyLq_fP7E",
  authDomain: "learnova-dc989.firebaseapp.com",
  databaseURL: "https://learnova-dc989-default-rtdb.firebaseio.com",
  projectId: "learnova-dc989",
  storageBucket: "learnova-dc989.firebasestorage.app",
  messagingSenderId: "880047771797",
  appId: "1:880047771797:web:26b54e4ac103cea07e0b9c",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const firestore = getFirestore(app);
export default app;
