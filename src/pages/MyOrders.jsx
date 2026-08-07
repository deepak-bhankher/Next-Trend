import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiPackage, FiChevronRight } from "react-icons/fi";
import api from "../utils/api";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <div className="bg-dark text-white min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-dark text-white min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-10">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <FiPackage size={48} className="mx-auto mb-4 text-white/20" />
            <p className="text-white/50 mb-8">You haven't placed any orders yet.</p>
            <Link
              to="/products"
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
                  className="flex items-center justify-between bg-white/5 border border-white/10 hover:border-white/30 rounded-2xl p-5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                      <FiPackage className="text-white/60" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        Order #{order._id.slice(-8)}
                      </p>
                      <p className="text-white/40 text-xs mt-1">
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
                      <p className="text-white/40 text-xs">
                        {order.isDelivered ? "Delivered" : "Processing"}
                      </p>
                    </div>
                    <FiChevronRight className="text-white/40" />
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