import { Routes, Route, Link, Navigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import Orders from "./Orders";
import Products from "./Products";

function AdminPanel() {
  // 🔒 PROTECT ADMIN ROUTE
  const role = localStorage.getItem("role");

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* SIDEBAR */}
      <div
        style={{
          width: "220px",
          background: "#111",
          color: "#fff",
          padding: "20px",
        }}
      >
        <h3 style={{ marginBottom: "20px" }}>Admin Panel</h3>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <Link style={linkStyle} to="">
            Dashboard
          </Link>

          <Link style={linkStyle} to="products">
            Products
          </Link>

          <Link style={linkStyle} to="orders">
            Orders
          </Link>
        </nav>
      </div>

      {/* CONTENT */}
      <div style={{ flex: 1, padding: "25px" }}>
        <Routes>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
}

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  padding: "8px 0",
};

export default AdminPanel;
