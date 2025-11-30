import React from "react";
import { UserAuth } from "../Context/AuthContext";
import { Navigate } from "react-router";

type ProviderProps = {
  children: any;
};

function PrivateRoute({ children }: ProviderProps) {
  const { session } = UserAuth();

  if (session === undefined) {
    return <p>Loading...</p>;
  }

  return <>{session ? <>{children}</> : <Navigate to="/signup" />}</>;
}

export default PrivateRoute;
