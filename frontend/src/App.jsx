// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import DashboardPage from "./pages/DashboardPage/DashboardPage.jsx";
import SharedLayout from "./layouts/SharedLayout/SharedLayout.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";

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
        <Route path="orders" element={<div>All Orders Page</div>} />
        <Route path="products" element={<div>All Products Page</div>} />
        <Route path="suppliers" element={<div>All Suppliers Page</div>} />
        <Route path="customers" element={<div>Customers Data Page</div>} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
