import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag } from "react-icons/fi";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, updateQty } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  if (cartItems.length === 0) {
    return (
      <div className="bg-dark text-white min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-6">
        <FiShoppingBag size={48} className="text-white/20 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-white/50 mb-8">Looks like you haven't added any shoes yet.</p>
        <Link
          to="/products"
          className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-dark text-white min-h-screen pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-10">Your Cart</h1>

        <div className="space-y-4 mb-10">
          <AnimatePresence>
            {cartItems.map((item) => (
              <motion.div
                key={`${item.product}-${item.size}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-5 bg-white/5 border border-white/10 rounded-2xl p-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-white/50 text-sm">Size: {item.size}</p>
                  <p className="font-bold mt-1">₹{item.price}</p>
                </div>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                  <button
                    onClick={() => updateQty(item.product, item.size, item.qty - 1)}
                    className="text-white/70 hover:text-white"
                  >
                    <FiMinus size={14} />
                  </button>
                  <span className="w-4 text-center text-sm">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.product, item.size, item.qty + 1)}
                    className="text-white/70 hover:text-white"
                  >
                    <FiPlus size={14} />
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.product, item.size)}
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <FiTrash2 size={18} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex justify-between items-center">
          <div>
            <p className="text-white/50 text-sm">Subtotal</p>
            <p className="text-2xl font-bold">₹{subtotal}</p>
          </div>
          <button
            onClick={() => navigate("/checkout")}
            className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;