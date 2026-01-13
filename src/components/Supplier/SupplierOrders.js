import { useState } from "react";
import { Navigate } from "react-router-dom";

function SupplierOrders() {
  // 🔒 ROLE PROTECTION
  const role = localStorage.getItem("role");

  const [orders, setOrders] = useState([
    {
      id: "ORD-001",
      product: "Laptop",
      quantity: 20,
      date: "2026-01-10",
      status: "Pending",
    },
    {
      id: "ORD-002",
      product: "Keyboard",
      quantity: 50,
      date: "2026-01-09",
      status: "Delivered",
    },
  ]);

  // 🟡 Prevent blank screen while role loads
  if (!role) {
    return <p style={{ padding: "30px" }}>Checking access...</p>;
  }

  // 🔴 Block non-supplier users
  if (role !== "supplier") {
    return <Navigate to="/" replace />;
  }

  const markDelivered = (id) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id
          ? { ...order, status: "Delivered" }
          : order
      )
    );
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Orders</h2>
      <p>Orders received from warehouse</p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Order Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.product}</td>
              <td>{order.quantity}</td>
              <td>{order.date}</td>
              <td>
                <span
                  style={{
                    color:
                      order.status === "Delivered"
                        ? "green"
                        : "orange",
                    fontWeight: 600,
                  }}
                >
                  {order.status}
                </span>
              </td>
              <td>
                {order.status === "Pending" ? (
                  <button
                    onClick={() => markDelivered(order.id)}
                    style={deliverBtn}
                  >
                    Mark Delivered
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

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const deliverBtn = {
  padding: "6px 12px",
  background: "#2e7d32",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default SupplierOrders;
