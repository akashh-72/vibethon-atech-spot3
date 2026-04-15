import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { ref, set, get } from "firebase/database";
import { auth, db } from "./firebase";

export const registerUser = async (email, password, displayName) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, { displayName });
  // Initialize user profile in DB
  await set(ref(db, `users/${userCredential.user.uid}`), {
    displayName,
    email,
    createdAt: Date.now(),
    xp: 0,
    level: 1,
    streak: 0,
    lastActive: Date.now(),
    completedModules: [],
    badges: [],
    quizScores: {},
  });
  return userCredential.user;
};

export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const logoutUser = () => signOut(auth);
export const logout = logoutUser; // alias

export const getUserProfile = async (uid) => {
  const snapshot = await get(ref(db, `users/${uid}`));
  return snapshot.exists() ? snapshot.val() : null;
};

export const onAuthChange = (callback) => onAuthStateChanged(auth, callback);
