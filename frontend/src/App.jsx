// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import DashboardPage from "./pages/DashboardPage/DashboardPage.jsx";
import SharedLayout from "./layouts/SharedLayout/SharedLayout.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import OrdersPage from "./pages/OrdersPage/OrdersPage.JSX";
import ProductsPage from "./pages/ProductsPage/ProductsPage.jsx";
import SuppliersPage from "./pages/SuppliersPage/SuppliersPage.jsx";
import CustomersPage from "./pages/CustomersPage/CustomersPage.jsx";
function App() {
  return (
    <Routes>
      {/* Root'u login'e yönlendir */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected alan: SharedLayout içinde nested rotalar */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <SharedLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="suppliers" element={<SuppliersPage />} />

       <Route path="customers" element={<CustomersPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
