import { useState } from "react";
import "./Signup.css";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password and confirm password are different!");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setLoading(false);
      return;
    }
    const body = {
      username: username,
      password: password,
      confirmPassword: confirmPassword,
    };
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/signup`, body);
      toast.success("Register successful");
      navigate("/login");
    } catch (e) {
      toast.error(`${e.response.data.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="auth-block">
          <div className="auth">
            <div className="signup">
              <form onSubmit={handleSignup}>
                <label htmlFor="chk" aria-hidden="true">
                  Sign up
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit">Sign up</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
