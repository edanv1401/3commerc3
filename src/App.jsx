import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import ProductDetail from "./pages/ProductDetail";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="admin" element={<Admin />} />
        <Route path="product/:id" element={<ProductDetail />} />
      </Route>
    </Routes>
  );
}
