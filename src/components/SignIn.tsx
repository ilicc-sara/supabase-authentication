import { useState } from "react";
import { Link } from "react-router";
import { UserAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router";

function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const { session, signInUser } = UserAuth();
  console.log(session);

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signInUser(email, password);

      if (result.success) {
        navigate("/dashboard");
      }
    } catch (error) {
      setError("an error occured");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignIn} className="max-w-md mx-auto pt-24">
        <h2 className="font-bold pb-2">Sign In</h2>
        <p>
          Don't have an account? <Link to="/signup">Sign Up!</Link>
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
            Sign In
          </button>
          {error && <p className="text-red-600 text-center pt-4">{error}</p>}
        </div>
      </form>
    </div>
  );
}

export default SignIn;
