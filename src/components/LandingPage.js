import "../App.css";
import bgImage from "../ai-generated-inventory-logistic-warehouse-background-photo.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      localStorage.removeItem("user");
      localStorage.removeItem("role");

      if (username === "admin" && password === "admin123") {
        localStorage.setItem("user", "admin");
        localStorage.setItem("role", "admin");
        navigate("/admin");
        return;
      }

      if (username === "staff" && password === "staff123") {
        localStorage.setItem("user", "staff");
        localStorage.setItem("role", "staff");
        navigate("/staff");
        return;
      }

      if (username === "supplier" && password === "supplier123") {
        localStorage.setItem("user", "supplier");
        localStorage.setItem("role", "supplier");
        navigate("/supplier");
        return;
      }

      let users = [];
      try {
        users = JSON.parse(localStorage.getItem("users")) || [];
      } catch {}

      const foundUser = users.find(
        (u) => u.username === username && u.password === password
      );

      if (foundUser) {
        localStorage.setItem("user", foundUser.username);
        localStorage.setItem("role", foundUser.role);
        navigate(`/${foundUser.role}`);
        return;
      }

      setLoading(false);
      alert("Invalid username or password");
    }, 800);
  };

  return (
    <div
      className="app-background"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* NAVBAR */}
      <div className="top-nav">
        <h2 className="logo">Boxly</h2>

        <div className="nav-auth">
          <button
            className="auth-btn login-btn"
            onClick={() => {
              setUsername("");
              setPassword("");
              setShowLogin(true);
            }}
          >
            Login
          </button>

          <button
            className="auth-btn register-btn"
            onClick={() => setShowRegister(true)}
          >
            Register
          </button>
        </div>
      </div>

      {/* HERO */}
      <div className="hero-overlay">
        <div className="hero-container">
          <div className="hero-left">
            <h1 className="boxly-animate">Boxly</h1>
            <p>
              Smart logistics and supply chain solutions delivering seamless
              fulfillment services with speed, reliability, and efficiency.
            </p>
          </div>
        </div>
      </div>

      {/* LOGIN MODAL */}
      {showLogin && (
        <div className="modal-overlay" onClick={() => setShowLogin(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2>Login</h2>

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="primary-btn"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <button
              className="close-btn"
              onClick={() => setShowLogin(false)}
              disabled={loading}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* REGISTER MODAL */}
      {showRegister && (
        <div className="modal-overlay" onClick={() => setShowRegister(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2>Register</h2>
            <p style={{ fontSize: "14px", color: "#666" }}>
              Registration disabled.
              <br />
              Contact admin to create an account.
            </p>

            <button
              className="close-btn"
              onClick={() => setShowRegister(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* LOADER */}
      {loading && <Loader />}
    </div>
  );
}

export default LandingPage;
