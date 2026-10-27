import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiDollarSign,
  FiShoppingBag,
  FiClock,
  FiBox,
  FiArrowUpRight,
  FiChevronRight,
  FiSliders,
  FiUser,
  FiHeart,
  FiSmile,
} from "react-icons/fi";
import api from "../../utils/api";

const statusColors = {
  Processing: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  Shipped: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Delivered: "bg-green-500/15 text-green-400 border-green-500/30",
};

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const { data } = await api.get("/orders/stats");
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch admin stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center text-[var(--muted)]">
        <div className="w-8 h-8 border-3 border-[#83A4D4] border-t-transparent rounded-full animate-spin mr-3" />
        Loading analytics...
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Revenue",
      value: `₹${(stats?.totalRevenue || 0).toLocaleString()}`,
      subtitle: "Gross sales value",
      icon: FiDollarSign,
      gradient: "from-emerald-500/20 to-teal-500/5",
      accent: "text-emerald-400",
    },
    {
      title: "Total Orders",
      value: stats?.totalOrders || 0,
      subtitle: `${stats?.deliveredOrders || 0} Delivered`,
      icon: FiShoppingBag,
      gradient: "from-blue-500/20 to-indigo-500/5",
      accent: "text-blue-400",
    },
    {
      title: "Pending Orders",
      value: stats?.pendingOrders || 0,
      subtitle: "Needs dispatching",
      icon: FiClock,
      gradient: "from-amber-500/20 to-orange-500/5",
      accent: "text-amber-400",
    },
    {
      title: "Live Products",
      value: stats?.totalProducts || 0,
      subtitle: "In catalog",
      icon: FiBox,
      gradient: "from-purple-500/20 to-pink-500/5",
      accent: "text-purple-400",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Admin Overview</h1>
          <p className="text-[var(--muted)] text-sm mt-1">
            Real-time performance, inventory, and recent orders
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/orders"
            className="inline-flex items-center gap-2 gradient-primary text-[#080808] px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:scale-[1.02] transition-transform shadow-md shadow-[#83A4D4]/20"
          >
            <FiShoppingBag size={15} /> View Orders ({stats?.pendingOrders || 0} Pending)
          </Link>
          <Link
            to="/admin/website"
            className="inline-flex items-center gap-2 bg-[var(--card-bg)] border border-[var(--border)] hover:border-[var(--muted)] px-4 py-2.5 rounded-xl text-xs font-semibold text-[var(--text)] transition-colors"
          >
            <FiSliders size={15} /> Website Sections
          </Link>
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`relative overflow-hidden rounded-2xl border border-[var(--border)] bg-gradient-to-br ${card.gradient} p-5 backdrop-blur-sm`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                  {card.title}
                </span>
                <div className={`p-2 rounded-xl bg-white/5 border border-white/10 ${card.accent}`}>
                  <Icon size={18} />
                </div>
              </div>

              <div className="mt-4">
                <p className="text-2xl lg:text-3xl font-black tracking-tight">{card.value}</p>
                <p className="text-xs text-[var(--muted)] mt-1">{card.subtitle}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Category Shortcut Panels */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted)] mb-3">
          Manage Shoes By Category
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to="/admin/category/men"
            className="group p-5 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] hover:border-[#83A4D4]/40 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-[#83A4D4]/10 text-[#83A4D4]">
                <FiUser size={20} />
              </div>
              <FiArrowUpRight className="text-[var(--muted)] group-hover:text-[var(--text)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <h3 className="font-bold text-base">Men's Shoes</h3>
            <p className="text-xs text-[var(--muted)] mt-1">
              View all men shoes, update stock, or add new pair.
            </p>
          </Link>

          <Link
            to="/admin/category/women"
            className="group p-5 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] hover:border-[#83A4D4]/40 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-[#A1FFCE]/10 text-[#A1FFCE]">
                <FiHeart size={20} />
              </div>
              <FiArrowUpRight className="text-[var(--muted)] group-hover:text-[var(--text)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <h3 className="font-bold text-base">Women's Shoes</h3>
            <p className="text-xs text-[var(--muted)] mt-1">
              View all women shoes, update stock, or add new pair.
            </p>
          </Link>

          <Link
            to="/admin/category/kids"
            className="group p-5 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] hover:border-[#83A4D4]/40 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-amber-400/10 text-amber-400">
                <FiSmile size={20} />
              </div>
              <FiArrowUpRight className="text-[var(--muted)] group-hover:text-[var(--text)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <h3 className="font-bold text-base">Kids' Shoes</h3>
            <p className="text-xs text-[var(--muted)] mt-1">
              View all kids shoes, update stock, or add new pair.
            </p>
          </Link>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-bold text-lg">Recent Customer Orders</h2>
            <p className="text-xs text-[var(--muted)]">Live incoming purchases</p>
          </div>
          <Link
            to="/admin/orders"
            className="text-xs font-semibold text-[#83A4D4] hover:underline flex items-center gap-1"
          >
            View All Orders ({stats?.totalOrders || 0}) <FiChevronRight size={14} />
          </Link>
        </div>

        {!stats?.recentOrders || stats.recentOrders.length === 0 ? (
          <div className="text-center py-12 text-[var(--muted)] text-sm">
            No orders placed yet.
          </div>
        ) : (
          <div className="divide-y divide-[var(--border)]">
            {stats.recentOrders.map((order) => {
              const currentStatus = order.isDelivered ? "Delivered" : order.status || "Processing";
              return (
                <div
                  key={order._id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 first:pt-0 last:pb-0"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">#{order._id.slice(-8)}</span>
                      <span
                        className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${statusColors[currentStatus]}`}
                      >
                        {currentStatus}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--muted)] mt-1">
                      {order.user?.name || "Customer"} ({order.shippingAddress?.city || "India"}) ·{" "}
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <span className="font-black text-sm">₹{order.totalPrice?.toLocaleString()}</span>
                    <Link
                      to={`/admin/orders/${order._id}`}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-[var(--border)] hover:bg-[var(--bg)] transition-colors"
                    >
                      View
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
