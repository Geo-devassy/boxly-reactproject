import { useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([
    {
      id: "ORD-1001",
      customer: "John Doe",
      status: "Pending",
      total: 2500,
    },
    {
      id: "ORD-1002",
      customer: "Alice Smith",
      status: "Shipped",
      total: 4200,
    },
    {
      id: "ORD-1003",
      customer: "Michael Lee",
      status: "Delivered",
      total: 1800,
    },
  ]);

  const updateStatus = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>📦 Orders</h2>
      <p style={{ color: "#888" }}>Manage customer orders</p>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr style={{ background: "#f2f2f2" }}>
            <th style={th}>Order ID</th>
            <th style={th}>Customer</th>
            <th style={th}>Total (₹)</th>
            <th style={th}>Status</th>
            <th style={th}>Update</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={td}>{order.id}</td>
              <td style={td}>{order.customer}</td>
              <td style={td}>{order.total}</td>
              <td style={td}>{order.status}</td>
              <td style={td}>
                <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(order.id, e.target.value)
                  }
                >
                  <option>Pending</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th = { padding: "10px", textAlign: "left" };
const td = { padding: "10px" };

export default Orders;
