import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import api from "../utils/api";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ address: "", city: "", postalCode: "", country: "", phone: "" });

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to place your order");
      navigate("/login");
      return;
    }
    if (user?.isAdmin) {
      toast.error("Admins can't place orders");
      return;
    }

    setLoading(true);
    try {
      const orderItems = cartItems.map((item) => ({ name: item.name, qty: item.qty, size: item.size, image: item.image, price: item.price, product: item.product }));
      const { data } = await api.post("/orders", { orderItems, shippingAddress: form, totalPrice: subtotal });
      clearCart();
      toast.success("Order placed successfully!");
      navigate(`/orders/${data._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-[var(--card-bg)] border border-[var(--border)] rounded-xl px-4 py-3 outline-none focus:border-[#83A4D4]/50 transition-colors placeholder:text-[var(--muted)] text-[var(--text)] text-sm";

  return (
    <div className="bg-[var(--bg)] text-[var(--text)] min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-10">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={handlePlaceOrder} className="space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)] mb-4">Shipping Address</h2>
            <input name="address" value={form.address} onChange={handleChange} placeholder="Street Address" required className={inputClass} />
            <div className="grid grid-cols-2 gap-4">
              <input name="city" value={form.city} onChange={handleChange} placeholder="City" required className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl px-4 py-3 outline-none focus:border-[#83A4D4]/50 transition-colors placeholder:text-[var(--muted)] text-[var(--text)] text-sm" />
              <input name="postalCode" value={form.postalCode} onChange={handleChange} placeholder="Postal Code" required className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl px-4 py-3 outline-none focus:border-[#83A4D4]/50 transition-colors placeholder:text-[var(--muted)] text-[var(--text)] text-sm" />
            </div>
            <input name="country" value={form.country} onChange={handleChange} placeholder="Country" required className={inputClass} />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" required className={inputClass} />
            <button type="submit" disabled={loading || cartItems.length === 0}
              className="w-full gradient-primary text-[#080808] py-4 rounded-full font-bold hover:opacity-90 hover:scale-[1.02] transition-all accent-glow disabled:opacity-40 mt-4">
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </motion.form>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6 h-fit shadow-xl shadow-black/10">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)] mb-5">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={`${item.product}-${item.size}`} className="flex gap-3">
                  <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[var(--text)]">{item.name}</p>
                    <p className="text-[var(--muted)] text-xs">Size {item.size} × {item.qty}</p>
                  </div>
                  <p className="text-sm font-semibold text-[var(--text)]">₹{item.price * item.qty}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-[var(--border)] pt-4 flex justify-between font-bold text-lg">
              <span className="text-[var(--muted)]">Total</span>
              <span className="gradient-text-secondary">₹{subtotal}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;