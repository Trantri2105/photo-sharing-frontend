import { useState } from "react";
import "./Login.css";
import toast from "react-hot-toast";
import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    const body = {
      username: username,
      password: password,
    };
    try {
      const res = await axios.post(`${baseUrl}/auth/login`, body);
      const { access_token: token } = res.data;
      localStorage.setItem("token", token);
      if (localStorage.getItem("token")) {
        const res = await axios.get(`${baseUrl}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        navigate(`/users/${res.data.data._id}`);
      }
    } catch (e) {
      toast.error("Wrong username or password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {loading ? (
        <Loading />
      ) : (
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
          <Link
            to={"/change-password"}
            style={{
              textDecoration: "underline",
              fontSize: "14px",
              color: "blue",
              cursor: "pointer",
            }}
          >
            Forgot password?
          </Link>
        </div>
      )}
    </div>
  );
};

export default Login;
