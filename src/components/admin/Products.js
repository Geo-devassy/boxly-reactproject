import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function Products() {
  // ✅ ALL HOOKS FIRST
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    id: "",
    name: "",
    category: "",
    stock: "",
    minStock: "",
  });
  const [editingId, setEditingId] = useState(null);

  const role = localStorage.getItem("role");

  // ✅ useEffect ALWAYS runs (never conditional)
  useEffect(() => {
    if (role !== "admin") return;

    const stored = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(stored);
  }, [role]);

  // 🔒 ROLE PROTECTION (AFTER HOOKS)
  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // ✏️ INPUT HANDLER
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ➕ ADD / ✏️ UPDATE
  const saveProduct = () => {
    const { id, name, category, stock, minStock } = form;

    if (!id || !name || !category || stock === "" || minStock === "") {
      alert("All fields are required");
      return;
    }

    let updatedProducts;

    if (editingId) {
      updatedProducts = products.map((p) =>
        p.id === editingId
          ? {
              ...p,
              ...form,
              stock: Number(stock),
              minStock: Number(minStock),
            }
          : p
      );
      setEditingId(null);
    } else {
      if (products.some((p) => p.id === id)) {
        alert("Product ID already exists");
        return;
      }

      updatedProducts = [
        ...products,
        {
          ...form,
          stock: Number(stock),
          minStock: Number(minStock),
        },
      ];
    }

    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    setForm({ id: "", name: "", category: "", stock: "", minStock: "" });
  };

  // 📝 EDIT
  const editProduct = (product) => {
    setForm({
      id: product.id,
      name: product.name,
      category: product.category,
      stock: product.stock,
      minStock: product.minStock,
    });
    setEditingId(product.id);
  };

  // 🗑 DELETE
  const deleteProduct = (id) => {
    if (!window.confirm("Delete this product?")) return;

    const updated = products.filter((p) => p.id !== id);
    localStorage.setItem("products", JSON.stringify(updated));
    setProducts(updated);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>🛠 Product Management (Admin)</h2>

      {/* FORM */}
      <div style={formStyle}>
        <input
          name="id"
          placeholder="Product ID"
          value={form.id}
          onChange={handleChange}
          disabled={editingId}
        />
        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />
        <input
          name="stock"
          type="number"
          placeholder="Initial Stock"
          value={form.stock}
          onChange={handleChange}
        />
        <input
          name="minStock"
          type="number"
          placeholder="Min Stock"
          value={form.minStock}
          onChange={handleChange}
        />

        <button className="primary-btn" onClick={saveProduct}>
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </div>

      {/* TABLE */}
      <table style={tableStyle}>
        <thead>
          <tr style={{ background: "#f2f2f2" }}>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Min Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr
              key={p.id}
              style={{
                background: p.stock < p.minStock ? "#ffecec" : "white",
              }}
            >
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.stock}</td>
              <td>{p.minStock}</td>
              <td>
                <button onClick={() => editProduct(p)}>Edit</button>{" "}
                <button onClick={() => deleteProduct(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const formStyle = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  marginBottom: "20px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

export default Products;
