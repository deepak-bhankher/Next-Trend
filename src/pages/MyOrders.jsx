import { getImageUrl } from "../utils/imageUrl";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiPackage, FiChevronRight } from "react-icons/fi";
import api from "../utils/api";
import { FiLogOut } from "react-icons/fi";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();
const navigate = useNavigate();


const handleLogout = async () => {
  await logout();
  toast.success("Logged out successfully");
  navigate("/");
};

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders/myorders");
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="bg-[var(--bg)] text-[var(--text)] min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-[var(--bg)] text-[var(--text)] min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
       <div className="flex items-center justify-between mb-10">
  <h1 className="text-4xl font-bold">My Orders</h1>
  <button
    onClick={handleLogout}
    className="flex items-center gap-2 bg-[var(--card-bg)] border border-[var(--border)] hover:border-[var(--muted)] text-[var(--muted)] hover:text-[var(--text)] px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
  >
    <FiLogOut size={16} /> Logout
  </button>
</div>

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <FiPackage size={48} className="mx-auto mb-4 text-[var(--muted)]" />
            <p className="text-[var(--muted)] mb-8">You haven't placed any orders yet.</p>
            <Link
              to="/men"
              className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, i) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/orders/${order._id}`}
                  className="flex items-center justify-between bg-[var(--card-bg)] border border-[var(--border)] hover:border-[var(--muted)] rounded-2xl p-5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-black/5 border border-[var(--border)] overflow-hidden flex-shrink-0 flex items-center justify-center relative">
                      {order.orderItems && order.orderItems[0]?.image ? (
                        <img
                          src={getImageUrl(order.orderItems[0].image)}
                          alt={order.orderItems[0].name || "Sneaker"}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/men1.png";
                          }}
                        />
                      ) : (
                        <FiPackage className="text-[var(--muted)]" size={24} />
                      )}
                      {order.orderItems?.length > 1 && (
                        <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                          +{order.orderItems.length - 1}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-[var(--text)] line-clamp-1">
                        {order.orderItems && order.orderItems[0]?.name ? order.orderItems[0].name : `Order #${order._id.slice(-8)}`}
                      </p>
                      <p className="text-[var(--muted)] text-xs mt-1">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}{" "}
                        · Size {order.orderItems && order.orderItems[0]?.size} · {order.orderItems?.length || 1} item(s)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-black text-base text-[var(--text)]">₹{order.totalPrice?.toLocaleString()}</p>
                      <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border inline-block mt-1 ${
                        order.isDelivered || order.status === "Delivered"
                          ? "bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-500/15 dark:text-emerald-300"
                          : order.status === "Shipped"
                          ? "bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-500/15 dark:text-blue-300"
                          : "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-500/15 dark:text-amber-300"
                      }`}>
                        {order.isDelivered || order.status === "Delivered" ? "Delivered" : order.status || "Processing"}
                      </span>
                    </div>
                    <FiChevronRight className="text-[var(--muted)]" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;