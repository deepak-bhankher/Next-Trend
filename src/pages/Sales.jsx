import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiHeart, FiShoppingBag, FiStar, FiZap, FiClock, FiTag } from "react-icons/fi";

const saleProducts = [
  { id: 1, image: "/men-1.jpg", name: "Air Force Runner", brand: "Nike", price: 5999, originalPrice: 12999, rating: 4.8, reviews: 124, category: "Men", sizes: [7, 8, 9, 10] },
  { id: 2, image: "/women-1.jpg", name: "Cloud Walk Lite", brand: "Nike", price: 4999, originalPrice: 10999, rating: 4.9, reviews: 203, category: "Women", sizes: [4, 5, 6, 7] },
  { id: 3, image: "/kids-1.jpg", name: "Mini Dash Runner", brand: "Nike", price: 1999, originalPrice: 5499, rating: 4.8, reviews: 112, category: "Kids", sizes: [1, 2, 3, 4] },
  { id: 4, image: "/men-2.jpg", name: "Ultra Boost X", brand: "Adidas", price: 6499, originalPrice: 13999, rating: 4.7, reviews: 98, category: "Men", sizes: [8, 9, 10] },
  { id: 5, image: "/women-2.jpg", name: "Velvet Step Pro", brand: "Adidas", price: 5499, originalPrice: 11499, rating: 4.7, reviews: 145, category: "Women", sizes: [5, 6, 7] },
  { id: 6, image: "/men-3.jpg", name: "Classic Leather", brand: "Puma", price: 3499, originalPrice: 7999, rating: 4.5, reviews: 76, category: "Men", sizes: [8, 9, 10, 11] },
  { id: 7, image: "/kids-2.jpg", name: "Tiny Boost Jr", brand: "Adidas", price: 2499, originalPrice: 5999, rating: 4.7, reviews: 87, category: "Kids", sizes: [1, 2, 3] },
  { id: 8, image: "/women-3.jpg", name: "Blossom Runner", brand: "Puma", price: 3299, originalPrice: 7499, rating: 4.5, reviews: 88, category: "Women", sizes: [4, 5, 6] },
  { id: 9, image: "/men-4.jpg", name: "Speed Trainer Pro", brand: "Reebok", price: 4299, originalPrice: 9999, rating: 4.6, reviews: 55, category: "Men", sizes: [7, 8, 9] },
  { id: 10, image: "/kids-3.jpg", name: "Playzone Flex", brand: "Puma", price: 1799, originalPrice: 3999, rating: 4.5, reviews: 64, category: "Kids", sizes: [2, 3, 4] },
  { id: 11, image: "/women-4.jpg", name: "Aura Flex 3.0", brand: "Reebok", price: 3999, originalPrice: 9499, rating: 4.6, reviews: 67, category: "Women", sizes: [4, 5, 6] },
  { id: 12, image: "/men-5.jpg", name: "Street Glide 2.0", brand: "Nike", price: 5999, originalPrice: 11999, rating: 4.9, reviews: 210, category: "Men", sizes: [8, 9, 10, 11] },
];

const SALE_END = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000);

const useCountdown = (target) => {
  const calc = () => {
    const diff = Math.max(0, target - Date.now());
    return {
      h: Math.floor(diff / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const t = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(t);
  }, []);
  return time;
};

const TimeBox = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="glass-card rounded-xl w-14 h-14 flex items-center justify-center text-2xl font-black gradient-text-primary border-[#83A4D4]/20">
      {String(value).padStart(2, "0")}
    </div>
    <span className="text-white/40 text-[10px] uppercase tracking-widest mt-1">{label}</span>
  </div>
);

const ProductCard = ({ item, i }) => {
  const [wished, setWished] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const discount = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.05 }}
      className="group glass-card rounded-2xl overflow-hidden hover:border-red-400/20 transition-all duration-300 shadow-lg shadow-black/40"
    >
      <div className="relative aspect-square overflow-hidden bg-white/3">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-lg shadow-red-500/30">
          -{discount}% OFF
        </span>

        <button
          onClick={() => setWished(!wished)}
          className="absolute top-3 right-3 w-8 h-8 glass-card rounded-full flex items-center justify-center hover:border-red-400/40 transition-all"
        >
          <FiHeart size={14} className={wished ? "fill-red-400 text-red-400" : "text-white/50"} />
        </button>

        <span className="absolute bottom-3 left-3 glass-card text-white/60 text-[10px] px-2 py-1 rounded-lg border-white/10">
          {item.category}
        </span>

        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex gap-1 flex-wrap justify-end">
            {item.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border transition-all ${selectedSize === s ? "bg-red-500 text-white border-transparent" : "glass-card text-white/70 hover:border-red-400/40"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4">
        <p className="gradient-text-primary text-[10px] uppercase tracking-widest mb-1 font-semibold">{item.brand}</p>
        <h3 className="font-semibold text-sm text-white mb-2 truncate">{item.name}</h3>

        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, idx) => (
              <FiStar key={idx} size={10} className={idx < Math.floor(item.rating) ? "fill-yellow-400 text-yellow-400" : "text-white/20"} />
            ))}
          </div>
          <span className="text-white/40 text-[10px]">({item.reviews})</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="font-black text-red-400 text-base">₹{item.price.toLocaleString()}</span>
            <span className="text-white/30 text-xs line-through ml-2">₹{item.originalPrice.toLocaleString()}</span>
          </div>
          <Link to={`/products/${item.id}`}>
            <button className="w-8 h-8 bg-red-500 rounded-xl flex items-center justify-center hover:bg-red-400 transition-colors shadow-lg shadow-red-500/30">
              <FiShoppingBag size={14} className="text-white" />
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const Sales = () => {
  const { h, m, s } = useCountdown(SALE_END);
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Men", "Women", "Kids"];

  const filtered = activeFilter === "All" ? saleProducts : saleProducts.filter((p) => p.category === activeFilter);

  return (
    <div className="bg-dark text-white min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Hero Banner */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl overflow-hidden mb-14 glass-card border-red-500/20 shadow-2xl shadow-red-500/10">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-orange-500/5" />
          <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FiZap size={16} className="text-red-400" />
                <span className="text-red-400 text-xs uppercase tracking-widest font-bold">Flash Sale — Limited Time</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black mb-3">
                UP TO{" "}
                <span className="text-red-400">60% OFF</span>
              </h1>
              <p className="text-white/50 text-sm max-w-md">Premium sneakers at unbeatable prices. Grab your pair before the sale ends!</p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 text-white/50 text-xs uppercase tracking-widest">
                <FiClock size={12} />
                Sale ends in
              </div>
              <div className="flex items-center gap-3">
                <TimeBox value={h} label="Hrs" />
                <span className="text-2xl font-black text-white/30 mb-4">:</span>
                <TimeBox value={m} label="Min" />
                <span className="text-2xl font-black text-white/30 mb-4">:</span>
                <TimeBox value={s} label="Sec" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Offer Strips */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {[
            { icon: <FiTag size={16} />, title: "Extra 10% Off", desc: "On orders above ₹4,999", color: "border-[#83A4D4]/20 text-[#B6FBFF]" },
            { icon: <FiZap size={16} />, title: "Buy 2 Get 1 Free", desc: "On selected kids styles", color: "border-[#A1FFCE]/20 text-[#A1FFCE]" },
            { icon: <FiShoppingBag size={16} />, title: "Free Shipping", desc: "On all sale orders today", color: "border-orange-400/20 text-orange-400" },
          ].map((offer, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.08 }}
              className={`glass-card rounded-2xl p-5 flex items-center gap-4 ${offer.color}`}>
              <div className={`w-10 h-10 rounded-xl glass-card flex items-center justify-center ${offer.color}`}>
                {offer.icon}
              </div>
              <div>
                <p className="font-bold text-sm text-white">{offer.title}</p>
                <p className="text-white/40 text-xs">{offer.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Filter Tabs */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div className="flex gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${activeFilter === f ? "bg-red-500 text-white shadow-lg shadow-red-500/30" : "glass-btn text-white/50 hover:text-white"}`}
              >
                {f}
              </button>
            ))}
          </div>
          <p className="text-white/30 text-sm">{filtered.length} items on sale</p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((item, i) => <ProductCard key={item.id} item={item} i={i} />)}
        </div>

        {/* Bottom CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-16 glass-card rounded-3xl p-10 text-center border-red-500/15">
          <p className="text-red-400 text-xs uppercase tracking-widest font-bold mb-2">Don't Miss Out</p>
          <h2 className="text-3xl font-black mb-3">Sale Ends Soon!</h2>
          <p className="text-white/40 text-sm mb-6">New deals added every day. Check back often for more savings.</p>
          <Link to="/">
            <button className="bg-red-500 hover:bg-red-400 transition-colors text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-red-500/30">
              View All Products →
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Sales;
