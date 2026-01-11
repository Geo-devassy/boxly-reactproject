import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Reg() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!username || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    // 🔹 Fake register (no backend)
    localStorage.setItem(
      "user",
      JSON.stringify({ username, email })
    );

    // 🔹 Redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h2>Register</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br /><br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Reg;
