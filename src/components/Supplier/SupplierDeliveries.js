import { useState } from "react";
import { Navigate } from "react-router-dom";

function SupplierDeliveries() {
  // ✅ HOOKS FIRST (ALWAYS)
  const role = localStorage.getItem("role");

  const [deliveries] = useState([
    {
      id: "DEL-001",
      orderId: "ORD-001",
      product: "Laptop",
      quantity: 20,
      deliveryDate: "2026-01-12",
      status: "In Transit",
    },
    {
      id: "DEL-002",
      orderId: "ORD-002",
      product: "Keyboard",
      quantity: 50,
      deliveryDate: "2026-01-08",
      status: "Delivered",
    },
  ]);

  // 🟡 AFTER hooks → conditional rendering
  if (!role) {
    return <p style={{ padding: "30px" }}>Checking access...</p>;
  }

  if (role !== "supplier") {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <h2>Deliveries</h2>
      <p>Delivery status for shipped orders</p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Delivery ID</th>
            <th>Order ID</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Delivery Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {deliveries.map((delivery) => (
            <tr key={delivery.id}>
              <td>{delivery.id}</td>
              <td>{delivery.orderId}</td>
              <td>{delivery.product}</td>
              <td>{delivery.quantity}</td>
              <td>{delivery.deliveryDate}</td>
              <td>
                <span
                  style={{
                    fontWeight: 600,
                    color:
                      delivery.status === "Delivered"
                        ? "green"
                        : "orange",
                  }}
                >
                  {delivery.status}
                </span>
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

export default SupplierDeliveries;
