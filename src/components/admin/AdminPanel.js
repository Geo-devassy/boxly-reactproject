import { Routes, Route, Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import Orders from "./Orders";
import Products from "./Products";
import StockHistory from "./StockHistory";
import LowStockAlerts from "./LowStockAlerts";
import UserManagement from "./UserManagement";

function AdminPanel() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const location = useLocation(); // Used to highlight the active link

  // 🔒 PROTECT ADMIN ROUTE
  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // 🚪 LOGOUT
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Helper to determine if a link is active
  const isActive = (path) => {
    const currentPath = location.pathname.split("/").pop();
    return currentPath === path || (path === "" && currentPath === "admin");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f4f7f6" }}>
      {/* SIDEBAR */}
      <div
        style={{
          width: "260px",
          background: "#1a1a1a", // Deep dark gray for a premium look
          color: "#fff",
          padding: "30px 20px",
          display: "flex",
          flexDirection: "column",
          boxShadow: "4px 0 10px rgba(0,0,0,0.1)",
          position: "sticky",
          top: 0,
          height: "100vh"
        }}
      >
        <div style={{ marginBottom: "40px", paddingLeft: "10px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: "bold", margin: 0, color: "#4facfe" }}>
            Boxly
          </h2>
          <small style={{ color: "#888", textTransform: "uppercase", letterSpacing: "1px" }}>
            Warehouse Admin
          </small>
        </div>

        {/* NAV LINKS */}
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            flexGrow: 1,
          }}
        >
          <Link 
            style={getLinkStyle(isActive(""))} 
            to=""
          >
            📊 Dashboard
          </Link>

          <Link 
            style={getLinkStyle(isActive("products"))} 
            to="products"
          >
            📦 Products
          </Link>

          <Link 
            style={getLinkStyle(isActive("orders"))} 
            to="orders"
          >
            🛒 Orders
          </Link>

          <Link 
            style={getLinkStyle(isActive("history"))} 
            to="history"
          >
            🕒 Stock History
          </Link>

          <Link 
            style={getLinkStyle(isActive("low-stock"))} 
            to="low-stock"
          >
            ⚠️ Low Stock
          </Link>

          <Link 
            style={getLinkStyle(isActive("users"))} 
            to="users"
          >
            👥 Users
          </Link>
        </nav>

        {/* LOGOUT AT BOTTOM */}
        <button
          onClick={handleLogout}
          style={{
            marginTop: "auto",
            background: "rgba(217, 83, 79, 0.1)",
            color: "#d9534f",
            border: "1px solid #d9534f",
            padding: "12px",
            cursor: "pointer",
            borderRadius: "8px",
            fontWeight: "bold",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.target.style.background = "#d9534f";
            e.target.style.color = "#fff";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "rgba(217, 83, 79, 0.1)";
            e.target.style.color = "#d9534f";
          }}
        >
          Logout
        </button>
      </div>

      {/* CONTENT AREA */}
      <div style={{ flex: 1, padding: "40px", overflowY: "auto" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Routes>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="history" element={<StockHistory />} />
            <Route path="low-stock" element={<LowStockAlerts />} />
            <Route path="users" element={<UserManagement />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

// Dynamic styling function for Nav Links
const getLinkStyle = (active) => ({
  color: active ? "#fff" : "#b8b8b8",
  textDecoration: "none",
  padding: "12px 15px",
  borderRadius: "8px",
  background: active ? "#4facfe" : "transparent",
  fontWeight: active ? "600" : "400",
  transition: "all 0.2s ease",
  display: "flex",
  alignItems: "center",
  gap: "10px"
});

export default AdminPanel;