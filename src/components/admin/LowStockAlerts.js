import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function LowStockAlerts() {
  /* ======================
     HOOKS FIRST ✅
  ====================== */
  const [products, setProducts] = useState([]);
  const role = localStorage.getItem("role");

  /* ======================
     LOAD PRODUCTS
  ====================== */
  useEffect(() => {
    const storedProducts =
      JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  /* ======================
     ADMIN PROTECTION
  ====================== */
  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  /* ======================
     LOW STOCK FILTER
  ====================== */
  const lowStockItems = products.filter(
    (p) => Number(p.stock) <= Number(p.minStock)
  );

  return (
    <div style={{ padding: "30px" }}>
      <h2>🚨 Low Stock Alerts</h2>
      <p style={{ color: "#666" }}>
        Products that need immediate restocking
      </p>

      <table style={tableStyle}>
        <thead>
          <tr style={{ background: "#f2f2f2" }}>
            <th style={th}>Product ID</th>
            <th style={th}>Name</th>
            <th style={th}>Current Stock</th>
            <th style={th}>Min Stock</th>
            <th style={th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {lowStockItems.map((p, index) => (
            <tr key={index} style={{ background: "#ffecec" }}>
              <td style={td}>{p.id}</td>
              <td style={td}>{p.name}</td>
              <td style={td}>{p.stock}</td>
              <td style={td}>{p.minStock}</td>
              <td style={{ ...td, color: "red", fontWeight: "bold" }}>
                LOW
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {lowStockItems.length === 0 && (
        <p style={{ marginTop: "20px", color: "green" }}>
          ✅ All products are sufficiently stocked
        </p>
      )}
    </div>
  );
}

/* STYLES */
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
};

const th = {
  padding: "10px",
  textAlign: "left",
};

const td = {
  padding: "10px",
};

export default LowStockAlerts;
