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
import { data } from "react-router";

type SessionType = any | null | undefined;

interface AuthContextType {
  session: SessionType;
}

interface AuthContextType {
  session: SessionType;
  signUpNewUser: (email: string, password: string) => Promise<any>;
  signInUser: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface ProviderProps {
  children: any;
}

export const AuthContextProvider = ({ children }: ProviderProps) => {
  const [session, setSession] = useState<SessionType>(undefined);

  // useEffect(() => {
  //   const signOutFunction = async () => {
  //     await supabase.auth.signOut();
  //   };
  //   signOutFunction();
  // }, []);

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

  // Sign In
  const signInUser = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        console.error("an error occured:", error);
        return { success: false, error: error.message };
      }
      console.log("sign-in success:", data);
      return { success: true, data };
    } catch (error) {
      console.error("an error occured:", error);
    }
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
    <AuthContext.Provider
      value={{ session, signUpNewUser, signInUser, signOut }}
    >
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
