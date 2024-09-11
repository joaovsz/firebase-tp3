import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
// import { auth } from "@/firebaseConfig";
import { ReactNode } from "react";
import { auth } from "@/firebaseConfig";
import { useRouter } from "expo-router";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  isAdmin: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      console.log(user);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);
  const logout = async () => {
    setLoading(true);
    try {
      const auth = getAuth();
      console.log(auth);
      await signOut(auth);
      setUser(null);
      router.replace("/");
    } catch (error: any) {
      console.log(error);
      alert("Sign out failed: " + error.message);
    }
    setLoading(false);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        isAdmin,
        setIsAdmin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
