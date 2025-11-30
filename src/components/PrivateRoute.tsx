import React from "react";
import { UserAuth } from "../Context/AuthContext";
import { Navigate } from "react-router";

type ProviderProps = {
  children: any;
};

function PrivateRoute({ children }: ProviderProps) {
  const { session } = UserAuth();
  return <>{session ? <>{children}</> : <Navigate to="/signup" />}</>;
}

export default PrivateRoute;
