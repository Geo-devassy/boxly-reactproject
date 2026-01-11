import { Navigate, useNavigate } from "react-router-dom";

function SupplierDashboard() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  if (role !== "supplier") {
    return <Navigate to="/" replace />;
  }

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Supplier Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default SupplierDashboard;
