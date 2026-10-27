import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiPackage,
  FiMapPin,
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiPrinter,
} from "react-icons/fi";
import { toast } from "react-toastify";
import api from "../utils/api";

const statusColors = {
  Processing: "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/40",
  Shipped: "bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-500/15 dark:text-blue-300 dark:border-blue-500/40",
  Delivered: "bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/40",
};

const AdminOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchOrder = async () => {
    try {
      const { data } = await api.get(`/orders/${id}`);
      setOrder(data);
    } catch (error) {
      console.error("Error fetching order:", error);
      toast.error("Failed to load order");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

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

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center text-[var(--muted)]">
        <div className="w-8 h-8 border-3 border-[#83A4D4] border-t-transparent rounded-full animate-spin mr-3" />
        Loading order details...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-20 text-[var(--muted)]">
        Order not found.
      </div>
    );
  }

  const currentStatus = order.isDelivered ? "Delivered" : order.status || "Processing";

  return (
    <div className="space-y-6">
      {/* Back button & Action buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/admin/orders")}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--muted)] hover:text-[var(--text)] transition-colors"
        >
          <FiArrowLeft size={16} /> Back to Orders
        </button>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] text-xs font-semibold hover:border-[var(--muted)] transition-colors"
        >
          <FiPrinter size={15} /> Print Invoice
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-start justify-between gap-4 bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6"
      >
        <div>
          <p className="text-[var(--muted)] text-xs uppercase tracking-widest mb-1">
            Customer Order Summary
          </p>
          <h1 className="text-2xl font-black">{order.user?.name || "Customer"}'s Order</h1>
          <p className="text-[var(--muted)] text-xs mt-2 flex items-center gap-1.5">
            <FiCalendar size={13} />
            Placed on:{" "}
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
          <p className="text-[var(--muted)] text-xs uppercase tracking-widest mb-2">
            Change Fulfillment Status
          </p>
          <div className="flex gap-2">
            {["Processing", "Shipped", "Delivered"].map((s) => (
              <button
                key={s}
                disabled={updating}
                onClick={() => handleStatusChange(s)}
                className={`text-xs font-bold px-3.5 py-2 rounded-xl border transition-all disabled:opacity-40 ${
                  currentStatus === s
                    ? statusColors[s] + " shadow-sm"
                    : "bg-[var(--bg)] text-[var(--muted)] border-[var(--border)] hover:text-[var(--text)]"
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
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6 space-y-4">
          <h2 className="font-bold text-xs uppercase tracking-wider text-[var(--muted)]">
            Customer Contact
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2.5">
              <FiUser size={15} className="text-[var(--muted)] flex-shrink-0" />
              <span className="font-semibold">{order.user?.name || "Customer"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <FiMail size={15} className="text-[var(--muted)] flex-shrink-0" />
              <span className="text-[var(--muted)] text-xs break-all">{order.user?.email}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <FiPhone size={15} className="text-[var(--muted)] flex-shrink-0" />
              <span className="text-[var(--muted)] text-xs">
                {order.shippingAddress?.phone}
              </span>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6 space-y-4">
          <h2 className="font-bold text-xs uppercase tracking-wider text-[var(--muted)] flex items-center gap-2">
            <FiMapPin size={14} /> Shipping Destination
          </h2>
          <p className="text-sm text-[var(--muted)] leading-relaxed">
            <span className="text-[var(--text)] font-medium">{order.shippingAddress?.address}</span>
            <br />
            {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}
            <br />
            {order.shippingAddress?.country}
          </p>
        </div>

        {/* Payment Summary */}
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6 space-y-4">
          <h2 className="font-bold text-xs uppercase tracking-wider text-[var(--muted)]">
            Billing Summary
          </h2>
          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">Payment Mode</span>
              <span className="font-semibold text-[var(--text)]">{order.paymentMethod || "COD / Pending"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">Payment Status</span>
              <span className={order.isPaid ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                {order.isPaid ? "Paid" : "Pending Payment"}
              </span>
            </div>
            <div className="border-t border-[var(--border)] pt-3 flex justify-between text-sm font-black">
              <span>Total Bill</span>
              <span className="text-base">₹{order.totalPrice?.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ordered Items */}
      <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6">
        <h2 className="font-bold text-base mb-4 flex items-center gap-2">
          <FiPackage /> Ordered Items ({order.orderItems?.length || 0})
        </h2>

        <div className="divide-y divide-[var(--border)]">
          {order.orderItems?.map((item, idx) => (
            <div
              key={idx}
              className="py-4 flex items-center justify-between gap-4 first:pt-0 last:pb-0"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-[var(--bg)] border border-[var(--border)] overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/men1.png";
                    }}
                  />
                </div>
                <div>
                  <p className="font-bold text-sm text-[var(--text)]">{item.name}</p>
                  <p className="text-xs text-[var(--muted)] mt-1">
                    Size: <span className="text-[var(--text)] font-semibold">{item.size}</span> · Quantity: <span className="text-[var(--text)] font-semibold">×{item.qty}</span>
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-bold text-sm">₹{(item.price * item.qty).toLocaleString()}</p>
                <p className="text-[11px] text-[var(--muted)]">₹{item.price} each</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetail;