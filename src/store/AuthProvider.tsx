import {
  UserCredential,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { ReactNode, createContext, useContext, useState } from "react";

export type AuthContextValue = {
  login: (email: string, password: string) => Promise<string>;
  logout: () => Promise<void>;
  isLoading: boolean;
  user: any;
};

const AuthContext = createContext<AuthContextValue | null>(null);
interface IAuthProviderProps {
  children: ReactNode;
}
export default function AuthProvider(props: IAuthProviderProps) {
  const [user, setUser] = useState<string | null>(
    localStorage.getItem("loggedInEmail")
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // call this function when you want to authenticate the user
  const login = async (email: string, password: string): Promise<string> => {
    try {
      setIsLoading(true);
      const auth = getAuth();
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      localStorage.setItem("loggedInEmail", email);
      setUser(email);
      setIsLoading(false);
      return email;
      // If successful, you can redirect the user to another page or do something else
    } catch (error: any) {
      setIsLoading(false);
      throw error;
    }
  };

  // call this function to sign out logged in user
  const logout = async () => {
    setUser(null);
    const auth = getAuth();
    await signOut(auth);
    localStorage.clear();
  };

  const ctx: AuthContextValue = {
    login,
    logout,
    isLoading,
    user,
  };
  return (
    <AuthContext.Provider value={ctx}>{props?.children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
