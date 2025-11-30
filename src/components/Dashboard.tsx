import React from "react";
import { UserAuth } from "../Context/AuthContext";

function Dashboard() {
  const { session } = UserAuth();

  console.log(session);
  return <div>Dashboard</div>;
}

export default Dashboard;
