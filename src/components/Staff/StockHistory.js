import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function StockHistory() {
  const [history, setHistory] = useState([]);
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role !== "staff") return;

    const data =
      JSON.parse(localStorage.getItem("stockHistory")) || [];
    setHistory(data);
  }, [role]);

  if (role !== "staff") {
    return <Navigate to="/" replace />;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h2>📊 Stock History</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr style={{ background: "#f2f2f2" }}>
            <th style={th}>Type</th>
            <th style={th}>Product ID</th>
            <th style={th}>Quantity</th>
            <th style={th}>Date</th>
          </tr>
        </thead>

        <tbody>
          {history.map((h, i) => (
            <tr key={i}>
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
    </div>
  );
}

const th = { padding: "10px", textAlign: "left" };
const td = { padding: "10px" };

export default StockHistory;
