import { useState } from "react";
import { Link } from "react-router";
import { UserAuth } from "../Context/AuthContext";

function SignUp() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const { session, signUpNewUser, signOut } = UserAuth();
  console.log(session);

  return (
    <div>
      <form className="max-w-md mx-auto pt-24">
        <h2 className="font-bold pb-2">Sign up today</h2>
        <p>
          Already have an account? <Link to="/signin">Sign In!</Link>
        </p>

        <div className="flex flex-col !py-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 mt-4"
            type="email"
            placeholder="Email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 mt-4"
            type="password"
            placeholder="Password"
          />
          <button type="submit" className="mt-4" disabled={loading}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
