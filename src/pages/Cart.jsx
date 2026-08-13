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
        <FiShoppingBag size={48} className="text-white/10 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-white/40 mb-8">Looks like you haven't added any shoes yet.</p>
        <Link to="/men" className="gradient-primary text-[#080808] px-8 py-3 rounded-full font-bold hover:opacity-90 hover:scale-105 transition-all accent-glow">
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
                className="flex items-center gap-3 sm:gap-5 glass-card rounded-2xl p-3 sm:p-4 shadow-lg shadow-black/30"
              >
                <img src={item.image} alt={item.name} className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white text-sm sm:text-base truncate">{item.name}</h3>
                  <p className="text-white/40 text-xs sm:text-sm">Size: {item.size}</p>
                  <p className="font-bold mt-1 gradient-text-secondary text-sm">₹{item.price}</p>
                </div>
                <div className="flex items-center gap-2 glass-btn rounded-full px-2.5 py-1.5 flex-shrink-0">
                  <button onClick={() => updateQty(item.product, item.size, item.qty - 1)} className="text-white/50 hover:text-[#B6FBFF] transition-colors">
                    <FiMinus size={13} />
                  </button>
                  <span className="w-4 text-center text-sm text-white">{item.qty}</span>
                  <button onClick={() => updateQty(item.product, item.size, item.qty + 1)} className="text-white/50 hover:text-[#A1FFCE] transition-colors">
                    <FiPlus size={13} />
                  </button>
                </div>
                <button onClick={() => removeFromCart(item.product, item.size)} className="text-white/20 hover:text-red-400 transition-colors flex-shrink-0">
                  <FiTrash2 size={16} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="glass-card rounded-2xl p-4 sm:p-6 flex justify-between items-center shadow-xl shadow-black/40">
          <div>
            <p className="text-white/40 text-sm">Subtotal</p>
            <p className="text-2xl font-black gradient-text-secondary">₹{subtotal}</p>
          </div>
          <button
            onClick={() => navigate("/checkout")}
            className="gradient-primary text-[#080808] px-8 py-3 rounded-full font-bold hover:opacity-90 hover:scale-105 transition-all accent-glow"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
