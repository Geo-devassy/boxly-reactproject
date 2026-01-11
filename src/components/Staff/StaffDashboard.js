import { Navigate, useNavigate } from "react-router-dom";

function StaffDashboard() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  // 🔒 Protect staff route
  if (role !== "staff") {
    return <Navigate to="/" replace />;
  }

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Staff Dashboard</h1>
      <p style={{ color: "#666" }}>
        View stock information and perform daily warehouse operations
      </p>

      {/* ACTIONS */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
          flexWrap: "wrap",
        }}
      >
        <button
          className="primary-btn"
          onClick={() => navigate("/staff/products")}
        >
          📦 View Products (Read Only)
        </button>

        <button
          className="primary-btn"
          onClick={() => navigate("/staff/inward")}
        >
          🔼 Stock Inward
        </button>

        <button
          className="primary-btn"
          onClick={() => navigate("/staff/outward")}
        >
          🔽 Stock Outward
        </button>

        <button
          className="primary-btn"
          onClick={() => navigate("/staff/history")}
        >
          📊 Stock History
        </button>
      </div>

      {/* LOGOUT */}
      <div style={{ marginTop: "40px" }}>
        <button className="close-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default StaffDashboard;
