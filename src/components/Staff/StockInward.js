import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function StockInward() {
  // ✅ ALL HOOKS FIRST (NO CONDITIONS ABOVE)
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  const role = localStorage.getItem("role");

  // ✅ useEffect MUST be here (no early return before this)
  useEffect(() => {
    if (role !== "staff") return;

    const storedProducts = JSON.parse(localStorage.getItem("products"));

    if (storedProducts && storedProducts.length > 0) {
      setProducts(storedProducts);
    } else {
      const demoProducts = [
        {
          id: "P-1001",
          name: "Laptop",
          category: "Electronics",
          stock: 20,
          minStock: 10,
        },
        {
          id: "P-1002",
          name: "Office Chair",
          category: "Furniture",
          stock: 5,
          minStock: 15,
        },
      ];
      localStorage.setItem("products", JSON.stringify(demoProducts));
      setProducts(demoProducts);
    }
  }, [role]);

  // 🔼 STOCK INWARD LOGIC
  const handleInward = () => {
    if (!productId || !quantity || Number(quantity) <= 0) {
      alert("Please select product and enter valid quantity");
      return;
    }

    const updatedProducts = products.map((p) =>
      p.id === productId
        ? { ...p, stock: p.stock + Number(quantity) }
        : p
    );

    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);

    const history =
      JSON.parse(localStorage.getItem("stockHistory")) || [];

    history.push({
      type: "IN",
      productId,
      quantity: Number(quantity),
      date: new Date().toLocaleString(),
    });

    localStorage.setItem("stockHistory", JSON.stringify(history));

    alert("Stock inward recorded successfully ✅");
    setProductId("");
    setQuantity("");
  };

  // ✅ ROLE CHECK INSIDE JSX (NOT BEFORE HOOKS)
  if (role !== "staff") {
    return <Navigate to="/" replace />;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h2>🔼 Stock Inward</h2>
      <p style={{ color: "#666" }}>
        Record incoming stock (Staff only)
      </p>

      <div
        style={{
          maxWidth: "400px",
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        >
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.id})
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Quantity received"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <button className="primary-btn" onClick={handleInward}>
          Add Stock
        </button>

        <button className="close-btn" onClick={() => navigate("/staff")}>
          Back
        </button>
      </div>
    </div>
  );
}

export default StockInward;
