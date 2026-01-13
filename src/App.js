import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom"; // Added Navigate for the redirect

/* ADMIN */
import AdminPanel from "./components/admin/AdminPanel";

/* STAFF */
import StaffDashboard from "./components/Staff/StaffDashboard";
import StaffProducts from "./components/Staff/StaffProducts";
import StockInward from "./components/Staff/StockInward";
import StockOutward from "./components/Staff/StockOutward";
import StockHistory from "./components/Staff/StockHistory";

/* SUPPLIER */
import SupplierDashboard from "./components/Supplier/SupplierDashboard";
import SupplierHome from "./components/Supplier/SupplierHome";
import SupplierOrders from "./components/Supplier/SupplierOrders";
import SupplierDeliveries from "./components/Supplier/SupplierDeliveries";
import SupplierStockRequests from "./components/Supplier/SupplierStockRequests";

/* ✅ REAL LANDING PAGE */
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <Routes>
      {/* LANDING */}
      <Route path="/" element={<LandingPage />} />

      {/* ADMIN */}
      <Route path="/admin/*" element={<AdminPanel />} />

      {/* STAFF - FIXED NESTING */}
      <Route path="/staff" element={<StaffDashboard />}>
        {/* Redirect /staff to /staff/products so the side panel stays visible */}
        <Route index element={<Navigate to="/staff/products" replace />} />
        <Route path="products" element={<StaffProducts />} />
        <Route path="inward" element={<StockInward />} />
        <Route path="outward" element={<StockOutward />} />
        <Route path="history" element={<StockHistory />} />
      </Route>

      {/* SUPPLIER */}
      <Route path="/supplier" element={<SupplierDashboard />}>
        <Route index element={<SupplierHome />} />
        <Route path="orders" element={<SupplierOrders />} />
        <Route path="deliveries" element={<SupplierDeliveries />} />
        <Route path="stock-requests" element={<SupplierStockRequests />} />
      </Route>
    </Routes>
  );
}

export default App;