import { useState } from "react";
import { Navigate } from "react-router-dom";

function SupplierStockRequests() {
  // ✅ Hooks FIRST
  const role = localStorage.getItem("role");

  const [requests, setRequests] = useState([
    {
      id: "REQ-001",
      product: "Laptop",
      quantity: 15,
      requestedBy: "Warehouse A",
      date: "2026-01-11",
      status: "Pending",
    },
    {
      id: "REQ-002",
      product: "Keyboard",
      quantity: 40,
      requestedBy: "Warehouse B",
      date: "2026-01-09",
      status: "Approved",
    },
  ]);

  // 🟡 Access check AFTER hooks
  if (!role) {
    return <p style={{ padding: "30px" }}>Checking access...</p>;
  }

  if (role !== "supplier") {
    return <Navigate to="/" replace />;
  }

  const approveRequest = (id) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "Approved" } : req
      )
    );
  };

  return (
    <div>
      <h2>Stock Requests</h2>
      <p>Requests received from warehouses</p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Requested By</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((req) => (
            <tr key={req.id}>
              <td>{req.id}</td>
              <td>{req.product}</td>
              <td>{req.quantity}</td>
              <td>{req.requestedBy}</td>
              <td>{req.date}</td>
              <td>
                <span
                  style={{
                    fontWeight: 600,
                    color:
                      req.status === "Approved"
                        ? "green"
                        : "orange",
                  }}
                >
                  {req.status}
                </span>
              </td>
              <td>
                {req.status === "Pending" ? (
                  <button
                    onClick={() => approveRequest(req.id)}
                    style={approveBtn}
                  >
                    Approve
                  </button>
                ) : (
                  "—"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ===== STYLES ===== */

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const approveBtn = {
  padding: "6px 12px",
  background: "#1976d2",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default SupplierStockRequests;
