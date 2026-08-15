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
                    <div className="w-12 h-12 rounded-xl bg-[var(--card-bg)] flex items-center justify-center">
                      <FiPackage className="text-[var(--muted)]" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        Order #{order._id.slice(-8)}
                      </p>
                      <p className="text-[var(--muted)] text-xs mt-1">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}{" "}
                        · {order.orderItems.length} item(s)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-bold">₹{order.totalPrice}</p>
                      <p className="text-[var(--muted)] text-xs">
                        {order.isDelivered ? "Delivered" : "Processing"}
                      </p>
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