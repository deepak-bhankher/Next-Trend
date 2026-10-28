import { getImageUrl } from "../utils/imageUrl";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
    <>
      {/* SCREEN DASHBOARD VIEW (Hidden when printing) */}
      <div className="space-y-6 print:hidden">
        {/* Back button & Action buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/admin/orders")}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
          >
            <FiArrowLeft size={16} /> Back to Orders
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] text-xs font-semibold hover:border-[var(--muted)] transition-colors cursor-pointer"
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
            <div className="flex justify-end">
              <button
                disabled={updating}
                onClick={() => handleStatusChange("Delivered")}
                className={`text-xs font-bold px-4 py-2 rounded-xl border transition-all ${
                  currentStatus === "Delivered"
                    ? "bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-500/40 shadow-sm"
                    : "bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-600 shadow-md cursor-pointer hover:scale-105 active:scale-95"
                } disabled:opacity-50`}
              >
                {updating ? "Updating..." : currentStatus === "Delivered" ? "✓ Delivered" : "Delivered"}
              </button>
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
                      src={getImageUrl(item.image)}
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

      {/* ================= PRINT-ONLY RETAIL TAX INVOICE ================= */}
      <div className="hidden print:block font-sans text-black bg-white p-6 max-w-4xl mx-auto printable-bill">
        {/* Header */}
        <div className="flex justify-between items-start border-b-2 border-black pb-5">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-black uppercase">
              NEXT TREND
            </h1>
            <p className="text-xs font-semibold text-gray-700 tracking-wider uppercase mt-0.5">
              Premium Sneakers & Footwear
            </p>
            <p className="text-xs text-gray-800 mt-2">
              <span className="font-bold text-black">WhatsApp / Support:</span> +91 90533 77725
            </p>
            <p className="text-xs text-gray-800">
              <span className="font-bold text-black">Online Store:</span> quiet-torrone-c6d13f.netlify.app
            </p>
          </div>

          <div className="text-right">
            <span className="inline-block px-3 py-1 bg-black text-white text-xs font-black uppercase tracking-wider rounded mb-2">
              TAX INVOICE / RETAIL BILL
            </span>
            <div className="text-xs text-gray-900 space-y-1">
              <p>
                <span className="font-bold text-black">Order ID:</span> {order._id}
              </p>
              <p>
                <span className="font-bold text-black">Order Date:</span>{" "}
                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p>
                <span className="font-bold text-black">Fulfillment Status:</span>{" "}
                <span className="font-black text-black uppercase">
                  {order.isDelivered ? "Delivered" : order.status || "Processing"}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Customer & Shipping Addresses */}
        <div className="grid grid-cols-2 gap-4 my-5">
          <div className="border border-black rounded p-3 text-xs leading-relaxed">
            <p className="font-black text-black uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">
              Customer Details (Billed To)
            </p>
            <p className="font-bold text-sm text-black">{order.user?.name || "Customer"}</p>
            <p className="text-gray-900"><span className="font-bold text-black">Phone:</span> {order.shippingAddress?.phone || "N/A"}</p>
            <p className="text-gray-900"><span className="font-bold text-black">Email:</span> {order.user?.email || "N/A"}</p>
          </div>

          <div className="border border-black rounded p-3 text-xs leading-relaxed">
            <p className="font-black text-black uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">
              Shipping Destination (Ship To)
            </p>
            <p className="text-gray-900 font-semibold">{order.shippingAddress?.address}</p>
            <p className="text-gray-900">
              {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}
            </p>
            <p className="text-gray-900">{order.shippingAddress?.country || "India"}</p>
          </div>
        </div>

        {/* Items Table */}
        <div className="my-5">
          <table className="w-full text-xs text-left border-collapse border border-black">
            <thead>
              <tr className="bg-gray-100 border-b border-black text-black">
                <th className="p-2 border-r border-black font-bold w-10 text-center">#</th>
                <th className="p-2 border-r border-black font-bold">Item Description</th>
                <th className="p-2 border-r border-black font-bold text-center w-20">Size</th>
                <th className="p-2 border-r border-black font-bold text-center w-14">Qty</th>
                <th className="p-2 border-r border-black font-bold text-right w-24">Price</th>
                <th className="p-2 font-bold text-right w-28">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems?.map((item, idx) => (
                <tr key={idx} className="border-b border-gray-300">
                  <td className="p-2 border-r border-black text-center font-medium text-gray-800">
                    {idx + 1}
                  </td>
                  <td className="p-2 border-r border-black font-bold text-black">
                    {item.name}
                  </td>
                  <td className="p-2 border-r border-black text-center font-semibold text-black">
                    UK {item.size}
                  </td>
                  <td className="p-2 border-r border-black text-center font-semibold text-black">
                    {item.qty}
                  </td>
                  <td className="p-2 border-r border-black text-right text-gray-900 font-medium">
                    ₹{item.price?.toLocaleString()}
                  </td>
                  <td className="p-2 text-right font-bold text-black">
                    ₹{(item.price * item.qty).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Payment Summary & Total */}
        <div className="flex justify-between items-start mt-4 pt-2">
          <div className="w-1/2 pr-4 text-xs text-gray-700 space-y-2">
            <div className="border border-black rounded p-3 bg-gray-50">
              <p className="font-bold text-black uppercase mb-1">Payment Information</p>
              <p><span className="font-semibold text-black">Payment Mode:</span> {order.paymentMethod || "Cash on Delivery (COD)"}</p>
              <p>
                <span className="font-semibold text-black">Payment Status:</span>{" "}
                <span className="font-black text-black uppercase">
                  {order.isPaid ? "PAID" : "COD / PENDING AT DELIVERY"}
                </span>
              </p>
            </div>
            <p className="text-[10px] text-gray-600 italic mt-2">
              * Return/Exchange: Within 7 days with original packaging & invoice.
            </p>
          </div>

          <div className="w-1/2 pl-4">
            <div className="border border-black rounded overflow-hidden text-xs">
              <div className="flex justify-between p-2 border-b border-gray-200">
                <span className="text-gray-700">Items Subtotal:</span>
                <span className="font-semibold text-black">₹{order.totalPrice?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between p-2 border-b border-gray-200">
                <span className="text-gray-700">Delivery Charges:</span>
                <span className="font-bold text-black uppercase">FREE</span>
              </div>
              <div className="flex justify-between p-2 border-b border-gray-200">
                <span className="text-gray-700">Estimated Taxes:</span>
                <span className="font-semibold text-gray-800">Included</span>
              </div>
              <div className="flex justify-between p-2.5 bg-gray-100 font-black text-sm text-black">
                <span>Grand Total:</span>
                <span className="text-base font-black">₹{order.totalPrice?.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t-2 border-black mt-8 pt-4 text-center text-xs text-gray-700 space-y-1">
          <p className="font-bold text-black uppercase tracking-wider">
            Thank you for shopping with Next Trend!
          </p>
          <p className="text-[11px] text-gray-500">
            This is an official computer-generated retail tax invoice. No signature required.
          </p>
        </div>
      </div>
    </>
  );
};

export default AdminOrderDetail;
