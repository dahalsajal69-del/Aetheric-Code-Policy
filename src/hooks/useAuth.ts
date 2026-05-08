import { useState, useEffect } from 'react';
import { onAuthStateChanged, User, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';

const ADMIN_EMAIL = 'sajaldahal112@gmail.com';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        if (currentUser.email === ADMIN_EMAIL) {
          setUser(currentUser);
          setIsAdmin(true);
        } else {
          // If not admin, sign out automatically
          signOut(auth);
          setUser(null);
          setIsAdmin(false);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user.email !== ADMIN_EMAIL) {
        await signOut(auth);
        alert("Access denied. Only admins can log in.");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.code === 'auth/unauthorized-domain') {
        alert(`Firebase Domain Error:\n\nPlease go to Firebase Console -> Authentication -> Settings -> Authorized domains\n\nAdd this domain: ${window.location.hostname}`);
      } else {
        alert(`Login failed: ${error.message}`);
      }
    }
  };

  const logout = () => {
    return signOut(auth);
  };

  return { user, isAdmin, loading, login, logout };
}
