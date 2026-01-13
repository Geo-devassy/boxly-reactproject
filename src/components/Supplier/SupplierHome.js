function SupplierHome() {
  const stats = {
    products: 5,
    pendingOrders: 3,
    deliveredOrders: 12,
  };

  return (
    <>
      <h1>Supplier Dashboard</h1>

      <div style={cardGrid}>
        <div style={cardStyle}>
          <h3>Total Products Supplied</h3>
          <p style={countStyle}>{stats.products}</p>
        </div>

        <div style={cardStyle}>
          <h3>Pending Orders</h3>
          <p style={countStyle}>{stats.pendingOrders}</p>
        </div>

        <div style={cardStyle}>
          <h3>Delivered Orders</h3>
          <p style={countStyle}>{stats.deliveredOrders}</p>
        </div>
      </div>
    </>
  );
}

const cardGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
  marginTop: "25px",
};

const cardStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
};

const countStyle = {
  fontSize: "32px",
  fontWeight: "bold",
  marginTop: "10px",
};

export default SupplierHome;
