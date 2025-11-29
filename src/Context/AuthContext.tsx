// import { useEffect, useContext, createContext, useState } from "react";

// const AuthContext = createContext();

// export const AuthContextProvider = ({ children }) => {
//   const [session, setSession] = useState(undefined);

//   return (
//     <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
//   );
// };

// export const userAuth = () => {
//   return useContext(AuthContext);
// };

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase-client";

type SessionType = any | null | undefined;

interface AuthContextType {
  session: SessionType;
}

interface AuthContextType {
  session: SessionType;
  signUpNewUser: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface ProviderProps {
  children: any;
}

export const AuthContextProvider = ({ children }: ProviderProps) => {
  const [session, setSession] = useState<SessionType>(undefined);

  // Sign Up
  const signUpNewUser = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.log("There was a problem signing up:", error);
      return { success: false, error };
    }
    return { success: true, data };
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  // Sign Out
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ session, signUpNewUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthContextProvider");
  }
  return ctx;
};
