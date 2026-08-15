import { useState, useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiPackage, FiMapPin, FiUser, FiMail, FiPhone, FiCalendar } from "react-icons/fi";
import { toast } from "react-toastify";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

const statusColors = {
  Processing: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  Shipped: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Delivered: "bg-green-500/15 text-green-400 border-green-500/30",
};

const AdminOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchOrder = async () => {
    try {
      const { data } = await api.get(`/orders/${id}`);
      setOrder(data);
    } catch (error) {
      console.error("Error fetching order:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.isAdmin) fetchOrder();
  }, [id, user]);

  const handleStatusChange = async (newStatus) => {
    setUpdating(true);
    try {
      const { data } = await api.put(`/orders/${id}/status`, { status: newStatus });
      setOrder(data);
      toast.success(`Order marked as ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="bg-[var(--bg)] text-[var(--text)] min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user || !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (!order) {
    return (
      <div className="bg-[var(--bg)] text-[var(--text)] min-h-screen flex items-center justify-center text-[var(--muted)]">
        Order not found.
      </div>
    );
  }

  const currentStatus = order.isDelivered ? "Delivered" : order.status || "Processing";

  return (
    <div className="bg-[var(--bg)] text-[var(--text)] min-h-screen pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <button
          onClick={() => navigate("/admin/orders")}
          className="inline-flex items-center cursor-pointer gap-2 text-[var(--muted)] hover:text-[var(--text)] text-sm mb-8 transition-colors"
        >
          <FiArrowLeft size={16} /> Back to Dashboard
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-start justify-between gap-4 mb-10"
        >
          <div>
            <p className="text-[var(--muted)] text-xs uppercase tracking-widest mb-1">Order</p>
            <h1 className="text-2xl font-bold">#{order._id.slice(-10)}</h1>
            <p className="text-[var(--muted)] text-xs mt-2 flex items-center gap-1.5">
              <FiCalendar size={12} />
              {new Date(order.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          <div className="text-right">
            <p className="text-[var(--muted)] text-xs uppercase tracking-widest mb-2">Status</p>
            <div className="flex gap-2">
              {["Processing", "Shipped", "Delivered"].map((s) => (
                <button
                  key={s}
                  disabled={updating}
                  onClick={() => handleStatusChange(s)}
                  className={`text-xs font-semibold px-3.5 py-2 rounded-full border transition-all disabled:opacity-40 ${
                    currentStatus === s
                      ? statusColors[s]
                      : "bg-[var(--card-bg)] text-[var(--muted)] border-[var(--border)] hover:text-[var(--text)]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Customer Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6"
          >
            <h2 className="font-semibold text-sm uppercase tracking-wide text-[var(--muted)] mb-5">
              Customer
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <FiUser size={14} className="text-[var(--muted)]" />
                <span>{order.user?.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiMail size={14} className="text-[var(--muted)]" />
                <span className="text-[var(--muted)]">{order.user?.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiPhone size={14} className="text-[var(--muted)]" />
                <span className="text-[var(--muted)]">{order.shippingAddress.phone}</span>
              </div>
            </div>
          </motion.div>

          {/* Shipping Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6"
          >
            <h2 className="font-semibold text-sm uppercase tracking-wide text-[var(--muted)] mb-5 flex items-center gap-2">
              <FiMapPin size={14} /> Shipping Address
            </h2>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              {order.shippingAddress.address}
              <br />
              {order.shippingAddress.city}, {order.shippingAddress.postalCode}
              <br />
              {order.shippingAddress.country}
            </p>
          </motion.div>

          {/* Payment Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6"
          >
            <h2 className="font-semibold text-sm uppercase tracking-wide text-[var(--muted)] mb-5">
              Payment
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">Method</span>
                <span>{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">Status</span>
                <span className={order.isPaid ? "text-green-400" : "text-yellow-400"}>
                  {order.isPaid ? "Paid" : "Pending"}
                </span>
              </div>
              <div className="border-t border-[var(--border)] pt-3 flex justify-between font-bold">
                <span>Total</span>
                <span>₹{order.totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6 mt-6"
        >
          <h2 className="font-semibold text-sm uppercase tracking-wide text-[var(--muted)] mb-5 flex items-center gap-2">
            <FiPackage size={14} /> Items ({order.orderItems.length})
          </h2>
          <div className="space-y-4">
            {order.orderItems.map((item) => (
              <div key={item._id} className="flex items-center gap-4 pb-4 border-b border-[var(--border)] last:border-0 last:pb-0">
                  <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover bg-[var(--card-bg)]"
                />
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-[var(--muted)] text-xs mt-1">
                    Size {item.size} · Qty {item.qty}
                  </p>
                </div>
                <p className="font-semibold text-sm">₹{(item.price * item.qty).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminOrderDetail;