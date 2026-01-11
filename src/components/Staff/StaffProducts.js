import { Navigate } from "react-router-dom";

function StaffProducts() {
  const role = localStorage.getItem("role");

  // 🔒 Staff-only access
  if (role !== "staff") {
    return <Navigate to="/" replace />;
  }

  // 📦 SAMPLE PRODUCTS (later replace with localStorage)
  const products = [
    {
      id: "P-1001",
      name: "Laptop",
      category: "Electronics",
      stock: 25,
      minStock: 10,
    },
    {
      id: "P-1002",
      name: "Office Chair",
      category: "Furniture",
      stock: 8,
      minStock: 15,
    },
    {
      id: "P-1003",
      name: "Printer Ink",
      category: "Consumables",
      stock: 50,
      minStock: 20,
    },
  ];

  return (
    <div style={{ padding: "30px" }}>
      <h2>📦 Product Stock (View Only)</h2>
      <p style={{ color: "#666" }}>
        Staff can view product stock levels only
      </p>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr style={{ background: "#f2f2f2" }}>
            <th style={th}>Product ID</th>
            <th style={th}>Product Name</th>
            <th style={th}>Category</th>
            <th style={th}>Current Stock</th>
            <th style={th}>Minimum Stock</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr
              key={p.id}
              style={{
                background: p.stock < p.minStock ? "#fff3f3" : "white",
              }}
            >
              <td style={td}>{p.id}</td>
              <td style={td}>{p.name}</td>
              <td style={td}>{p.category}</td>
              <td style={td}>{p.stock}</td>
              <td style={td}>{p.minStock}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p style={{ marginTop: "15px", fontSize: "13px", color: "#888" }}>
        ⚠ Products highlighted in red are below minimum stock level
      </p>
    </div>
  );
}

const th = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
  textAlign: "left",
};

const td = {
  padding: "10px",
  borderBottom: "1px solid #eee",
};

export default StaffProducts;
