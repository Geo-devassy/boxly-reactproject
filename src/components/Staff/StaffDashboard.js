import { Navigate, useNavigate, useLocation, Outlet } from "react-router-dom";

function StaffDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
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
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      {/* SIDEBAR - ALWAYS VISIBLE */}
      <div style={sidebarStyle}>
        <div>
          <div style={brandContainer}>
            <h2 style={brandTitle}>Boxly</h2>
            <span style={brandBadge}>Staff</span>
          </div>

          <nav style={navStyle}>
            {/* Removed Dashboard button as requested */}
            <button 
              onClick={() => navigate("/staff/products")} 
              style={getLinkStyle(location.pathname.includes("products"))}
            >
              📦 Products
            </button>
            <button 
              onClick={() => navigate("/staff/inward")} 
              style={getLinkStyle(location.pathname.includes("inward"))}
            >
              🔼 Stock Inward
            </button>
            <button 
              onClick={() => navigate("/staff/outward")} 
              style={getLinkStyle(location.pathname.includes("outward"))}
            >
              🔽 Stock Outward
            </button>
            <button 
              onClick={() => navigate("/staff/history")} 
              style={getLinkStyle(location.pathname.includes("history"))}
            >
              🕒 History
            </button>
          </nav>
        </div>

        <button 
          onClick={logout} 
          style={logoutBtn}
          onMouseOver={(e) => (e.target.style.background = "#b71c1c")}
          onMouseOut={(e) => (e.target.style.background = "#d32f2f")}
        >
          Logout
        </button>
      </div>

      {/* MAIN CONTENT AREA */}
      <div style={{ flex: 1, padding: "40px", overflowY: "auto" }}>
        <div style={contentContainer}>
          {/* This renders the Products/Inward/Outward components */}
          <Outlet /> 
        </div>
      </div>
    </div>
  );
}

/* ===== STYLES (Kept exactly as your aesthetic theme) ===== */
const sidebarStyle = { width: "260px", background: "#111111", color: "#fff", padding: "30px 20px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "sticky", top: 0, height: "100vh" };
const brandContainer = { marginBottom: "40px", paddingLeft: "10px", borderBottom: "1px solid #222", paddingBottom: "15px" };
const brandTitle = { margin: 0, fontSize: "24px", fontWeight: "800" };
const brandBadge = { fontSize: "11px", background: "#3182ce", color: "#fff", padding: "2px 8px", borderRadius: "12px", textTransform: "uppercase", fontWeight: "bold", marginTop: "5px", display: "inline-block" };
const navStyle = { display: "flex", flexDirection: "column", gap: "10px" };
const getLinkStyle = (active) => ({ background: active ? "#222" : "transparent", color: active ? "#fff" : "#888", border: "none", borderLeft: active ? "4px solid #3182ce" : "4px solid transparent", padding: "12px 15px", textAlign: "left", borderRadius: "8px", cursor: "pointer", fontSize: "15px", transition: "all 0.2s", width: "100%" });
const logoutBtn = { background: "#d32f2f", color: "#fff", border: "none", padding: "12px", borderRadius: "10px", cursor: "pointer", fontWeight: "bold", transition: "0.3s" };
const contentContainer = { maxWidth: "1200px", margin: "0 auto" };

export default StaffDashboard;