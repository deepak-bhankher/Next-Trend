import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPackage,
  FiChevronDown,
  FiSearch,
  FiTrash2,
  FiExternalLink,
} from "react-icons/fi";
import { toast } from "react-toastify";
import api from "../utils/api";

const statusColors = {
  Processing: "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/40",
  Shipped: "bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-500/40",
  Delivered: "bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/40",
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [deletingId, setDeletingId] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/orders/all");
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

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

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) {
      return;
    }
    setDeletingId(orderId);
    try {
      await api.delete(`/orders/${orderId}`);
      toast.success("Order deleted");
      setOrders((prev) => prev.filter((o) => o._id !== orderId));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete order");
    } finally {
      setDeletingId(null);
    }
  };

  // Filtered orders
  const filteredOrders = orders.filter((order) => {
    const currentStatus = order.isDelivered ? "Delivered" : order.status || "Processing";
    const matchesStatus = statusFilter === "All" || currentStatus === statusFilter;

    const term = search.toLowerCase();
    const matchesSearch =
      order._id.toLowerCase().includes(term) ||
      order.user?.name?.toLowerCase().includes(term) ||
      order.user?.email?.toLowerCase().includes(term) ||
      order.shippingAddress?.city?.toLowerCase().includes(term);

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Orders Management</h1>
        <p className="text-[var(--muted)] text-sm mt-1">
          Track customer shipments, view addresses, and update fulfillment status ({orders.length} orders)
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Status Tabs */}
        <div className="flex flex-wrap gap-2">
          {["All", "Processing", "Shipped", "Delivered"].map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                statusFilter === tab
                  ? "gradient-primary text-[#080808] shadow-sm"
                  : "bg-[var(--card-bg)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <FiSearch
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)]"
            size={16}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customer name, email, city..."
            className="w-full bg-[var(--card-bg)] border border-[var(--border)] rounded-xl pl-10 pr-4 py-2 outline-none focus:border-[#83A4D4]/60 text-xs text-[var(--text)] placeholder:text-[var(--muted)] transition-colors"
          />
        </div>
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="text-center py-20 text-[var(--muted)] text-sm">
          <div className="w-8 h-8 border-3 border-[#83A4D4] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          Loading orders...
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-20 bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl">
          <FiPackage size={44} className="mx-auto mb-3 text-[var(--muted)] opacity-50" />
          <p className="text-sm font-semibold">No orders found</p>
          <p className="text-xs text-[var(--muted)] mt-1">
            {search || statusFilter !== "All"
              ? "Try resetting your search or status filter."
              : "When customers place orders, they will show up here."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {filteredOrders.map((order, i) => {
              const currentStatus = order.isDelivered
                ? "Delivered"
                : order.status || "Processing";

              return (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ delay: i * 0.02 }}
                  className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-5 hover:border-[var(--muted)]/40 transition-colors shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-sm text-[var(--text)]">
                          Order from {order.user?.name || "Customer"}
                        </p>
                        <span className="text-[10px] bg-[#83A4D4]/10 text-[#83A4D4] border border-[#83A4D4]/20 px-2 py-0.5 rounded-full font-bold">
                          {order.orderItems?.length || 0} items
                        </span>
                      </div>
                      <p className="text-[var(--muted)] text-xs mt-1">
                        Customer: <span className="text-[var(--text)] font-medium">{order.user?.name || "Guest"}</span> ({order.user?.email})
                      </p>
                      <p className="text-[var(--muted)] text-xs mt-0.5">
                        Ship to: {order.shippingAddress?.address}, {order.shippingAddress?.city} ({order.shippingAddress?.phone})
                      </p>
                      <p className="text-[var(--muted)] text-[11px] mt-1">
                        Placed on:{" "}
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
                      <div className="text-right">
                        <p className="text-xs text-[var(--muted)]">Total Amount</p>
                        <p className="font-black text-base text-[var(--text)]">₹{order.totalPrice?.toLocaleString()}</p>
                      </div>

                      {/* Status Dropdown */}
                      <div className="relative">
                        <button
                          onClick={() =>
                            setOpenDropdown(
                              openDropdown === order._id ? null : order._id,
                            )
                          }
                          className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border shadow-sm transition-all ${statusColors[currentStatus]}`}
                        >
                          {currentStatus} <FiChevronDown size={12} />
                        </button>
                        {openDropdown === order._id && (
                          <div className="absolute right-0 top-9 bg-[var(--bg)] border border-[var(--border)] rounded-xl overflow-hidden z-20 min-w-[140px] shadow-2xl">
                            {["Processing", "Shipped", "Delivered"].map((s) => (
                              <button
                                key={s}
                                onClick={() => handleStatusChange(order._id, s)}
                                className="w-full text-left px-4 py-2.5 text-xs text-[var(--muted)] hover:bg-[var(--card-bg)] hover:text-[var(--text)] transition-colors"
                              >
                                Mark as {s}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Details & Delete */}
                      <Link
                        to={`/admin/orders/${order._id}`}
                        className="p-2 rounded-lg border border-[var(--border)] hover:bg-[var(--bg)] text-[var(--muted)] hover:text-[var(--text)] transition-colors text-xs font-semibold flex items-center gap-1"
                        title="View Full Order Details"
                      >
                        <FiExternalLink size={14} /> View
                      </Link>

                      <button
                        onClick={() => handleDeleteOrder(order._id)}
                        disabled={deletingId === order._id}
                        className="p-2 rounded-lg border border-[var(--border)] hover:bg-red-500/10 text-[var(--muted)] hover:text-red-400 transition-colors disabled:opacity-40"
                        title="Delete Order"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  <div className="border-t border-[var(--border)] pt-3 flex flex-wrap gap-3">
                    {order.orderItems?.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 bg-[var(--bg)] px-3 py-1.5 rounded-xl border border-[var(--border)] text-xs"
                      >
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-6 h-6 rounded-md object-cover"
                            onError={(e) => {
                              e.target.src = "/men1.png";
                            }}
                          />
                        )}
                        <span className="font-medium text-[var(--text)]">{item.name}</span>
                        <span className="text-[var(--muted)]">Size {item.size} · ×{item.qty}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
