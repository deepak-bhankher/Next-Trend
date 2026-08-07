import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheckCircle, FiClock, FiPackage } from "react-icons/fi";
import api from "../utils/api";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-dark text-white min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="bg-dark text-white min-h-screen flex items-center justify-center">
        Order not found.
      </div>
    );
  }

  return (
    <div className="bg-dark text-white min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <FiCheckCircle size={48} className="mx-auto mb-4 text-white" />
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-white/50">
            Order ID: <span className="text-white/70">{order._id}</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="font-semibold mb-5 flex items-center gap-2">
              <FiPackage /> Items
            </h2>
            <div className="space-y-4">
              {order.orderItems.map((item) => (
                <div key={item._id} className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-white/40 text-xs">
                      Size {item.size} × {item.qty}
                    </p>
                  </div>
                  <p className="text-sm font-semibold">₹{item.price * item.qty}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 mt-4 pt-4 flex justify-between font-bold">
              <span>Total</span>
              <span>₹{order.totalPrice}</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="font-semibold mb-3">Shipping Address</h2>
              <p className="text-white/60 text-sm leading-relaxed">
                {order.shippingAddress.address}, {order.shippingAddress.city}
                <br />
                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                <br />
                Phone: {order.shippingAddress.phone}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="font-semibold mb-3 flex items-center gap-2">
                <FiClock /> Order Status
              </h2>
              <div className="flex items-center gap-2 text-sm">
                <span
                  className={`w-2 h-2 rounded-full ${
                    order.isPaid ? "bg-white" : "bg-white/30"
                  }`}
                />
                <span className="text-white/60">
                  Payment: {order.paymentMethod}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm mt-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    order.isDelivered ? "bg-white" : "bg-white/30"
                  }`}
                />
                <span className="text-white/60">
                  {order.isDelivered ? "Delivered" : "Processing"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <Link
            to="/products"
            className="inline-block bg-white text-black px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;