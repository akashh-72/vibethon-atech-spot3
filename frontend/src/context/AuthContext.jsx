import { createContext, useContext, useEffect, useState } from "react";
import { onAuthChange, getUserProfile } from "../services/auth";
import { ref, update } from "firebase/database";
import { db } from "../services/firebase";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthChange(async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const p = await getUserProfile(firebaseUser.uid);
        setProfile(p);
        // Update last active
        await update(ref(db, `users/${firebaseUser.uid}`), {
          lastActive: Date.now(),
        });
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const refreshProfile = async () => {
    if (user) {
      const p = await getUserProfile(user.uid);
      setProfile(p);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
