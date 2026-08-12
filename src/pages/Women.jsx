import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingBag, FiStar, FiFilter, FiChevronDown } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { womenProducts } from "../data/products";

const sorts = ["Featured", "Price: Low to High", "Price: High to Low", "Top Rated"];
const badgeColors = {
  Bestseller: "bg-[#83A4D4]/20 text-[#B6FBFF] border-[#83A4D4]/30",
  New: "bg-[#A1FFCE]/20 text-[#A1FFCE] border-[#A1FFCE]/30",
  Hot: "bg-red-500/20 text-red-400 border-red-500/30",
  "Top Rated": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Sale: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  Premium: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

const ProductCard = ({ item, i }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const { addToCart } = useCart();
  const discount = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    addToCart({
      product: `women-${item.id}`,
      name: item.name,
      image: item.image,
      price: item.price,
      size: selectedSize,
      qty: 1,
    });
    toast.success("Added to cart!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.06 }}
      className="group glass-card rounded-2xl overflow-hidden hover:border-[#A1FFCE]/25 transition-all duration-300 shadow-lg shadow-black/40"
    >
      <Link to={`/women/${item.id}`}>
        <div className="relative aspect-square overflow-hidden bg-white/3">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {item.badge && (
            <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border backdrop-blur-sm ${badgeColors[item.badge]}`}>
              {item.badge}
            </span>
          )}
          <span className="absolute top-3 right-3 bg-green-500/20 text-green-400 border border-green-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
            -{discount}%
          </span>
        </div>
      </Link>

      <div className="p-4">
        <p className="gradient-text-secondary text-[10px] uppercase tracking-widest mb-1 font-semibold">{item.brand}</p>
        <h3 className="font-semibold text-sm text-white mb-2 truncate">{item.name}</h3>

        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, idx) => (
              <FiStar key={idx} size={10} className={idx < Math.floor(item.rating) ? "fill-yellow-400 text-yellow-400" : "text-white/20"} />
            ))}
          </div>
          <span className="text-white/40 text-[10px]">({item.reviews})</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {item.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSize(s)}
              className={`text-[10px] font-semibold px-2 py-1 rounded-lg border transition-all ${selectedSize === s ? "gradient-secondary text-[#080808] border-transparent" : "glass-card text-white/70 hover:border-[#A1FFCE]/40"}`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold gradient-text-primary text-base">₹{item.price.toLocaleString()}</span>
            <span className="text-white/30 text-xs line-through ml-2">₹{item.originalPrice.toLocaleString()}</span>
          </div>
          <button
            onClick={handleAddToCart}
            className="w-8 h-8 gradient-secondary cursor-pointer rounded-xl flex items-center justify-center hover:opacity-80 transition-opacity shadow-lg shadow-[#A1FFCE]/20"
          >
            <FiShoppingBag size={14} className="text-[#080808]" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Women = () => {
  const [sort, setSort] = useState("Featured");
  const [showSort, setShowSort] = useState(false);

  const sorted = [...womenProducts].sort((a, b) => {
    if (sort === "Price: Low to High") return a.price - b.price;
    if (sort === "Price: High to Low") return b.price - a.price;
    if (sort === "Top Rated") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="bg-dark text-white min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <p className="uppercase tracking-[0.3em] text-white/40 text-xs mb-2">Collection</p>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">Women's Shoes</h1>
              <p className="text-white/40 text-sm mt-2">{womenProducts.length} products</p>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowSort(!showSort)}
                className="glass-btn flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-white/70 hover:text-white transition-colors"
              >
                <FiFilter size={14} />
                {sort}
                <FiChevronDown size={14} className={`transition-transform ${showSort ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {showSort && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                    className="absolute right-0 top-12 glass-card rounded-xl overflow-hidden z-20 min-w-[180px] shadow-xl shadow-black/50">
                    {sorts.map((s) => (
                      <button key={s} onClick={() => { setSort(s); setShowSort(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-white/5 ${sort === s ? "gradient-text-secondary font-semibold" : "text-white/60"}`}>
                        {s}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-6 mb-10 flex items-center justify-between flex-wrap gap-4 border-[#A1FFCE]/15">
          <div>
            <p className="gradient-text-secondary text-xs uppercase tracking-widest font-semibold mb-1">Exclusive</p>
            <h2 className="text-xl font-bold">New Arrivals — Women's Edition 2025</h2>
          </div>
          <span className="gradient-secondary text-[#080808] text-xs font-bold px-4 py-2 rounded-full">Explore →</span>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {sorted.map((item, i) => <ProductCard key={item.id} item={item} i={i} />)}
        </div>
      </div>
    </div>
  );
};

export default Women;