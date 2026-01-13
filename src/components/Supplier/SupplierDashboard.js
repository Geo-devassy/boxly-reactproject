import { Link, Navigate, useNavigate, Outlet, useLocation } from "react-router-dom";

function SupplierDashboard() {
  const navigate = useNavigate();
  const location = useLocation(); // Used to detect which page the user is on

  const role = localStorage.getItem("role");

  if (!role) {
    return <p style={{ padding: "40px", textAlign: "center", color: "#666" }}>Verifying Credentials...</p>;
  }

  if (role !== "supplier") {
    return <Navigate to="/" replace />;
  }

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Logic to determine if a link is currently active
  const isActive = (path) => location.pathname === path;

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      {/* SIDEBAR - UPDATED TO BLACK */}
      <div style={sidebarStyle}>
        <div>
          {/* Brand Header */}
          <div style={brandContainer}>
            <h2 style={brandTitle}>Supplier</h2>
            <span style={brandBadge}>Portal</span>
          </div>

          <nav style={navStyle}>
            <Link to="/supplier" style={getLinkStyle(isActive("/supplier"))}>
              <span style={iconStyle}>📊</span> Dashboard
            </Link>
            <Link to="/supplier/orders" style={getLinkStyle(isActive("/supplier/orders"))}>
              <span style={iconStyle}>📦</span> Orders
            </Link>
            <Link to="/supplier/deliveries" style={getLinkStyle(isActive("/supplier/deliveries"))}>
              <span style={iconStyle}>🚚</span> Deliveries
            </Link>
            <Link to="/supplier/stock-requests" style={getLinkStyle(isActive("/supplier/stock-requests"))}>
              <span style={iconStyle}>📥</span> Stock Requests
            </Link>
          </nav>
        </div>

        {/* Logout at bottom */}
        <button 
          onClick={logout} 
          style={logoutBtn}
          onMouseOver={(e) => (e.target.style.background = "#b71c1c")}
          onMouseOut={(e) => (e.target.style.background = "#d32f2f")}
        >
          Sign Out
        </button>
      </div>

      {/* MAIN CONTENT AREA */}
      <div style={{ flex: 1, padding: "40px", overflowY: "auto" }}>
        <div style={contentContainer}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

/* ===== UPDATED MODERN UI STYLES (BLACK THEME) ===== */

const sidebarStyle = {
  width: "260px",
  background: "#111111", // Pure/Midnight Black
  color: "#fff",
  padding: "30px 20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  boxShadow: "4px 0 10px rgba(0,0,0,0.1)",
  position: "sticky",
  top: 0,
  height: "100vh",
  borderRight: "1px solid #222" // Subtle separation
};

const brandContainer = {
  marginBottom: "40px",
  paddingLeft: "10px",
  borderBottom: "1px solid #222", // Divider for the header
  paddingBottom: "15px"
};

const brandTitle = {
  margin: 0,
  fontSize: "24px",
  fontWeight: "800",
  letterSpacing: "-0.5px",
};

const brandBadge = {
  fontSize: "11px",
  background: "#f59e0b", // Amber accent color
  color: "#fff",
  padding: "2px 8px",
  borderRadius: "12px",
  textTransform: "uppercase",
  fontWeight: "bold",
  marginTop: "4px",
  display: "inline-block"
};

const navStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

// Updated Dynamic style function for Black Sidebar
const getLinkStyle = (active) => ({
  color: active ? "#ffffff" : "#888888", // Active is white, inactive is dimmed
  textDecoration: "none",
  padding: "12px 16px",
  borderRadius: "10px",
  background: active ? "#222222" : "transparent", // Subtle grey background for active
  borderLeft: active ? "4px solid #f59e0b" : "4px solid transparent",
  display: "flex",
  alignItems: "center",
  fontWeight: active ? "600" : "400",
  transition: "all 0.2s ease",
  gap: "12px"
});

const iconStyle = {
  fontSize: "18px"
};

const contentContainer = {
  maxWidth: "1200px",
  margin: "0 auto"
};

const logoutBtn = {
  background: "#d32f2f",
  color: "#fff",
  border: "none",
  padding: "12px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "14px",
  transition: "all 0.3s ease",
  marginTop: "20px"
};

export default SupplierDashboard;