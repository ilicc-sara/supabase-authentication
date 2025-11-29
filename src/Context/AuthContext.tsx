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

import { createContext, useContext, useState } from "react";

type SessionType = any | null;

interface AuthContextType {
  session: SessionType;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface ProviderProps {
  children: any;
}

export const AuthContextProvider = ({ children }: ProviderProps) => {
  const [session, setSession] = useState<SessionType>(null);

  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthContextProvider");
  }
  return ctx;
};
