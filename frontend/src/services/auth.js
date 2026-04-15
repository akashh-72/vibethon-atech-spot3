import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { ref, set, get, update } from "firebase/database";
import { auth, db } from "./firebase";

const googleProvider = new GoogleAuthProvider();

export const registerUser = async (email, password, displayName) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, { displayName });
  return await initializeProfile(userCredential.user, displayName, email);
};

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const snap = await get(ref(db, `users/${user.uid}`));
    if (!snap.exists()) {
      await initializeProfile(user, user.displayName, user.email);
    } else {
      await updateStreak(user.uid, snap.val());
    }
    return user;
  } catch (error) {
    throw error;
  }
};

const initializeProfile = async (user, displayName, email) => {
  const profileData = {
    displayName,
    email,
    createdAt: Date.now(),
    xp: 0,
    level: 1,
    streak: 1,
    lastActive: Date.now(),
    completedModules: [],
    completedLessons: {},
    badges: [],
    quizScores: {},
  };
  await set(ref(db, `users/${user.uid}`), profileData);
  return user;
};

const updateStreak = async (uid, profile) => {
  const now = Date.now();
  const last = profile.lastActive || 0;
  const diffDays = Math.floor((now - last) / (1000 * 60 * 60 * 24));

  let newStreak = profile.streak || 0;
  if (diffDays === 1) {
    newStreak += 1;
  } else if (diffDays > 1) {
    newStreak = 1;
  }

  await update(ref(db, `users/${uid}`), {
    lastActive: now,
    streak: newStreak
  });
};

export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const snap = await get(ref(db, `users/${userCredential.user.uid}`));
  if (snap.exists()) {
    await updateStreak(userCredential.user.uid, snap.val());
  }
  return userCredential.user;
};

export const logoutUser = () => signOut(auth);
export const logout = logoutUser; // alias

export const getUserProfile = async (uid) => {
  const snapshot = await get(ref(db, `users/${uid}`));
  return snapshot.exists() ? snapshot.val() : null;
};

export const onAuthChange = (callback) => onAuthStateChanged(auth, callback);
