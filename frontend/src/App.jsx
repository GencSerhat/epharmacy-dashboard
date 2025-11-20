import { Routes, Route, Navigate } from "react-router-dom";

function App() {


  return (
    <>
       <Routes>
      {/* default olarak /login'e yönlendir */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Login Page */}
      <Route path="/login" element={<div>Login Page</div>} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<div>Dashboard Page</div>} />

      {/* Orders */}
      <Route path="/orders" element={<div>All Orders Page</div>} />

      {/* Products */}
      <Route path="/products" element={<div>All Products Page</div>} />

      {/* Suppliers */}
      <Route path="/suppliers" element={<div>All Suppliers Page</div>} />

      {/* Customers */}
      <Route path="/customers" element={<div>Customers Data Page</div>} />

      {/* eşleşmeyen her şey için fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  
    </>
  )
}

export default App
