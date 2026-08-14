import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
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
import AdminOrders from "./pages/AdminOrders";
import AdminOrderDetail from "./pages/AdminOrderDetail";



const App = () => {
  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

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
        <Route path="*" element={<NotFound />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/orders/:id" element={<AdminOrderDetail />} />
      </Routes>
      <Footer />
      <ToastContainer theme="dark" position="bottom-right" />
    </div>
  );
};

export default App;