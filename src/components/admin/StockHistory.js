import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function StockHistory() {
  // ✅ HOOKS FIRST
  const [history, setHistory] = useState([]);
  const [filterType, setFilterType] = useState("ALL");
  const [search, setSearch] = useState("");

  const role = localStorage.getItem("role");

  // 🔄 LOAD HISTORY
  useEffect(() => {
    if (role !== "admin") return;

    const data =
      JSON.parse(localStorage.getItem("stockHistory")) || [];
    setHistory(data);
  }, [role]);

  // 🔒 ADMIN PROTECTION
  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // 🔍 FILTER LOGIC
  const filteredHistory = history.filter((h) => {
    const matchesType =
      filterType === "ALL" || h.type === filterType;

    const matchesSearch = h.productId
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesType && matchesSearch;
  });

  return (
    <div style={{ padding: "30px" }}>
      <h2>📊 Stock History (Admin)</h2>
      <p style={{ color: "#666" }}>
        Complete inward & outward audit log
      </p>

      {/* FILTERS */}
      <div style={filterBar}>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="ALL">All</option>
          <option value="IN">Inward</option>
          <option value="OUT">Outward</option>
        </select>

        <input
          type="text"
          placeholder="Search by Product ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <table style={tableStyle}>
        <thead>
          <tr style={{ background: "#f2f2f2" }}>
            <th style={th}>Type</th>
            <th style={th}>Product ID</th>
            <th style={th}>Quantity</th>
            <th style={th}>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredHistory.map((h, index) => (
            <tr key={index}>
              <td style={td}>
                {h.type === "IN" ? "🔼 Inward" : "🔽 Outward"}
              </td>
              <td style={td}>{h.productId}</td>
              <td style={td}>{h.quantity}</td>
              <td style={td}>{h.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredHistory.length === 0 && (
        <p style={{ marginTop: "20px", color: "#999" }}>
          No records found
        </p>
      )}
    </div>
  );
}

/* STYLES */
const filterBar = {
  display: "flex",
  gap: "12px",
  marginTop: "15px",
};

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

export default StockHistory;
