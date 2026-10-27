import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OrderDetail from "./pages/OrderDetail";
import MyOrders from "./pages/MyOrders";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Kids from "./pages/Kids";
import LocalProductDetail from "./pages/LocalProductDetail";
import Browse from "./pages/Browse";
import Products from "./pages/Products";

// Admin Imports
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCategoryShoes from "./pages/admin/AdminCategoryShoes";
import AdminProductForm from "./pages/admin/AdminProductForm";
import AdminOrders from "./pages/AdminOrders";
import AdminOrderDetail from "./pages/AdminOrderDetail";
import AdminWebsiteCustomizer from "./pages/admin/AdminWebsiteCustomizer";

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div>
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* Public Storefront Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />

        <Route path="/men" element={<Men />} />
        <Route path="/men/shop" element={<Browse category="men" />} />
        <Route path="/men/:id" element={<LocalProductDetail category="men" />} />

        <Route path="/women" element={<Women />} />
        <Route path="/women/shop" element={<Browse category="women" />} />
        <Route path="/women/:id" element={<LocalProductDetail category="women" />} />

        <Route path="/kids" element={<Kids />} />
        <Route path="/kids/shop" element={<Browse category="kids" />} />
        <Route path="/kids/:id" element={<LocalProductDetail category="kids" />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/about" element={<About />} />

        {/* Dedicated Admin Portal Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="orders/:id" element={<AdminOrderDetail />} />

          {/* Category-Specific Shoes Management */}
          <Route path="category/:category" element={<AdminCategoryShoes />} />
          <Route path="category/:category/new" element={<AdminProductForm />} />
          <Route path="category/:category/edit/:id" element={<AdminProductForm />} />

          {/* Website Sections & Customizer */}
          <Route path="website" element={<AdminWebsiteCustomizer />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <WhatsAppButton />}
      <ToastContainer theme="dark" position="bottom-right" />
    </div>
  );
};

export default App;