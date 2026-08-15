import { useState, useEffect } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiPackage, FiChevronDown } from "react-icons/fi";
import { toast } from "react-toastify";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

const statusColors = {
  Processing: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Shipped: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Delivered: "bg-green-500/20 text-green-400 border-green-500/30",
};

const AdminOrders = () => {
  const { user, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login"); // apni login route ke hisaab se change kar lena
  };

  const fetchOrders = async () => {
    try {
      const { data } = await api.get("/orders/all");
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.isAdmin) {
      fetchOrders();
    }
  }, [user]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status: newStatus });
      toast.success(`Order marked as ${newStatus}`);
      setOpenDropdown(null);
      fetchOrders();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  if (authLoading) {
    return (
      <div className="bg-[var(--bg)] text-[var(--text)] min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user || !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="bg-[var(--bg)] text-[var(--text)] min-h-screen pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-[var(--muted)]">
              Manage and track all customer orders
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center cursor-pointer gap-2 text-sm font-semibold px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
          >
            Log Out
          </button>
        </div>

        {loading ? (
          <div className="text-center text-[var(--muted)] py-20">
            Loading orders...
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <FiPackage size={48} className="mx-auto mb-4 text-[var(--muted)]" />
            <p className="text-[var(--muted)]">No orders yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, i) => {
              const currentStatus = order.isDelivered
                ? "Delivered"
                : order.status || "Processing";
              return (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="font-semibold text-sm">
                        Order #{order._id.slice(-8)}
                      </p>
                      <p className="text-[var(--muted)] text-xs mt-1">
                        {order.user?.name} ({order.user?.email})
                      </p>
                      <p className="text-[var(--muted)] text-xs mt-1">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <p className="font-bold">₹{order.totalPrice}</p>

                      <div className="relative">
                        <button
                          onClick={() =>
                            setOpenDropdown(
                              openDropdown === order._id ? null : order._id,
                            )
                          }
                          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${statusColors[currentStatus]}`}
                        >
                          {currentStatus} <FiChevronDown size={12} />
                        </button>
                        {openDropdown === order._id && (
                          <div className="absolute right-0 top-9 bg-[var(--bg)] border border-[var(--border)] rounded-xl overflow-hidden z-10 min-w-[140px] shadow-xl">
                            {["Processing", "Shipped", "Delivered"].map((s) => (
                              <button
                                key={s}
                                onClick={() => handleStatusChange(order._id, s)}
                                className="w-full text-left px-4 py-2.5 text-sm text-[var(--muted)] hover:bg-[var(--card-bg)] hover:text-[var(--text)] transition-colors"
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <Link
                        to={`/admin/orders/${order._id}`}
                        className="text-[var(--muted)] hover:text-[var(--text)] text-xs underline"
                      >
                        View
                      </Link>
                    </div>
                  </div>

                  <div className="border-t border-[var(--border)] pt-3 space-y-1">
                    {order.orderItems.map((item) => (
                      <p key={item._id} className="text-[var(--muted)] text-xs">
                        {item.name} (Size {item.size}) × {item.qty} — ₹
                        {item.price * item.qty}
                      </p>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
