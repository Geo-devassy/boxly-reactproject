import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function AdminDashboard() {
  // ✅ HOOKS FIRST
  const [products, setProducts] = useState([]);
  const [history, setHistory] = useState([]);

  const role = localStorage.getItem("role");

  // 🔄 LOAD DATA
  useEffect(() => {
    if (role !== "admin") return;

    const storedProducts =
      JSON.parse(localStorage.getItem("products")) || [];
    const stockHistory =
      JSON.parse(localStorage.getItem("stockHistory")) || [];

    setProducts(storedProducts);
    setHistory(stockHistory);
  }, [role]);

  // 🔒 PROTECT ADMIN ROUTE (AFTER HOOKS)
  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // 📊 CALCULATIONS
  const totalProducts = products.length;

  const totalStock = products.reduce(
    (sum, p) => sum + Number(p.stock || 0),
    0
  );

  const lowStockCount = products.filter(
    (p) => p.stock < p.minStock
  ).length;

  const today = new Date().toLocaleDateString();

  const inwardToday = history.filter(
    (h) => h.type === "IN" && h.date.includes(today)
  ).length;

  const outwardToday = history.filter(
    (h) => h.type === "OUT" && h.date.includes(today)
  ).length;

  return (
    <div style={{ padding: "30px" }}>
      <h1>Admin Dashboard</h1>
      <p style={{ color: "#666" }}>
        Warehouse overview & system status
      </p>

      {/* STATS */}
      <div style={statsContainer}>
        <StatCard title="Total Products" value={totalProducts} />
        <StatCard title="Total Stock" value={totalStock} />
        <StatCard title="Low Stock Items" value={lowStockCount} alert />
        <StatCard title="Inward Today" value={inwardToday} />
        <StatCard title="Outward Today" value={outwardToday} />
      </div>
    </div>
  );
}

// 📦 REUSABLE CARD
function StatCard({ title, value, alert }) {
  return (
    <div
      style={{
        ...cardStyle,
        borderLeft: alert ? "5px solid red" : "5px solid #0b5ed7",
      }}
    >
      <h3 style={{ marginBottom: "10px" }}>{title}</h3>
      <h1>{value}</h1>
    </div>
  );
}

// 🎨 STYLES
const statsContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
  marginTop: "30px",
};

const cardStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

export default AdminDashboard;
