// src/components/ProtectedRoute/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";

// Bu bileşen, sadece token varsa içeri girmeye izin verir
function ProtectedRoute({ children }) {
  const location = useLocation();
  const token = localStorage.getItem("accessToken");

  if (!token) {
    // Giriş yoksa login sayfasına yönlendir
    // state: from ile, istersek sonra redirect sonrası geri dönebiliriz
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Token varsa çocuk bileşeni göster
  return children;
}

export default ProtectedRoute;
