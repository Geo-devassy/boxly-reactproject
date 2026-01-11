import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function StockOutward() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role !== "staff") return;

    const stored = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(stored);
  }, [role]);

  if (role !== "staff") {
    return <Navigate to="/" replace />;
  }

  const handleOutward = () => {
    const product = products.find((p) => p.id === productId);

    if (!product || quantity <= 0) {
      alert("Invalid product or quantity");
      return;
    }

    if (product.stock < quantity) {
      alert("Not enough stock available");
      return;
    }

    const updated = products.map((p) =>
      p.id === productId
        ? { ...p, stock: p.stock - Number(quantity) }
        : p
    );

    localStorage.setItem("products", JSON.stringify(updated));
    setProducts(updated);

    const history =
      JSON.parse(localStorage.getItem("stockHistory")) || [];

    history.push({
      type: "OUT",
      productId,
      quantity: Number(quantity),
      date: new Date().toLocaleString(),
    });

    localStorage.setItem("stockHistory", JSON.stringify(history));

    alert("Stock outward recorded ✅");
    setProductId("");
    setQuantity("");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>🔽 Stock Outward</h2>

      <div style={{ maxWidth: "400px", marginTop: "20px" }}>
        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        >
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.stock} available)
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Quantity dispatched"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <button className="primary-btn" onClick={handleOutward}>
          Reduce Stock
        </button>

        <button className="close-btn" onClick={() => navigate("/staff")}>
          Back
        </button>
      </div>
    </div>
  );
}

export default StockOutward;
