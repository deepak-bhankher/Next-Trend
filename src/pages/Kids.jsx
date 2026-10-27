import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiFilter, FiChevronDown, FiPackage } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import api from "../utils/api";
import { getImageUrl } from "../utils/imageUrl";

const sorts = [
  "Featured",
  "Price: Low to High",
  "Price: High to Low",
];

const ProductCard = ({ item, i }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const { addToCart } = useCart();
  const discount =
    item.originalPrice > item.price
      ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
      : 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    const success = addToCart({
      product: `kids-${item.id}`,
      name: item.name,
      image: item.image,
      price: item.price,
      size: selectedSize,
      qty: 1,
    });
    if (success) {
      toast.success("Added to cart!");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.06 }}
      className="group glass-card rounded-2xl overflow-hidden hover:border-yellow-400/20 transition-all duration-300 shadow-lg shadow-black/40 flex flex-col justify-between"
    >
      <div>
        <Link to={`/kids/${item.id}`}>
          <div className="relative aspect-square overflow-hidden bg-white/3">
            <img
              src={getImageUrl(item.image)}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              onError={(e) => {
                e.currentTarget.src = "/kids1.png";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {discount > 0 && (
              <span className="absolute top-3 right-3 bg-rose-600 text-white font-black text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full shadow-sm tracking-wide">
                -{discount}%
              </span>
            )}
          </div>
        </Link>

        <div className="p-3 sm:p-4">
          <p className="text-amber-700 dark:text-amber-400 text-[11px] uppercase tracking-wider mb-1 font-bold">
            {item.brand}
          </p>
          <h3 className="font-semibold text-sm text-[var(--text)] mb-3 truncate">
            {item.name}
          </h3>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mt-2 pt-2 border-t border-[var(--border)]/40">
            <div className="flex items-baseline flex-wrap gap-1.5">
              <span className="font-black text-amber-700 dark:text-amber-400 text-sm sm:text-base">
                ₹{item.price?.toLocaleString()}
              </span>
              {item.originalPrice && item.originalPrice !== item.price && (
                <span className="text-[var(--muted)] text-[11px] line-through font-normal">
                  ₹{item.originalPrice?.toLocaleString()}
                </span>
              )}
            </div>
            <Link
              to={`/kids/${item.id}`}
              className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[var(--text)]/80 group-hover:text-[var(--text)] transition-colors inline-flex items-center gap-0.5"
            >
              View →
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Kids = () => {
  const [itemsList, setItemsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("Featured");
  const [showSort, setShowSort] = useState(false);

  useEffect(() => {
    const fetchDbShoes = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/products?category=Kids");
        if (data) {
          const dbItems = data.map((d) => ({
            id: d._id,
            name: d.name,
            brand: d.brand,
            price: d.price,
            originalPrice: d.originalPrice || d.price,
            sizes: d.sizes || [1, 2, 3, 4, 5],
            image: d.images && d.images.length > 0 ? d.images[0] : "/shoes5.png",
          }));
          setItemsList(dbItems);
        }
      } catch (e) {
        console.error("Failed to fetch kids shoes from API", e);
      } finally {
        setLoading(false);
      }
    };
    fetchDbShoes();
  }, []);

  const sorted = [...itemsList].sort((a, b) => {
    if (sort === "Price: Low to High") return a.price - b.price;
    if (sort === "Price: High to Low") return b.price - a.price;
    return 0;
  });

  return (
    <div className="bg-[var(--bg)] text-[var(--text)] min-h-screen pt-28 sm:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 sm:mb-10"
        >
          <p className="uppercase tracking-[0.3em] text-[var(--muted)] text-xs mb-2">
            Collection
          </p>
          <div className="flex items-start sm:items-end justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Kids' Shoes</h1>
              <p className="text-[var(--muted)] text-xs sm:text-sm mt-1 sm:mt-2">
                {itemsList.length} products
              </p>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowSort(!showSort)}
                className="glass-btn flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors"
              >
                <FiFilter size={14} />
                {sort}
                <FiChevronDown
                  size={14}
                  className={`transition-transform ${showSort ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {showSort && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute left-0 sm:left-auto sm:right-0 top-11 sm:top-12 glass-card rounded-xl overflow-hidden z-30 min-w-[190px] shadow-xl shadow-black/50 border border-[var(--border)]"
                  >
                    {sorts.map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setSort(s);
                          setShowSort(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-[var(--card-bg)] ${sort === s ? "text-amber-700 dark:text-amber-400 font-bold" : "text-[var(--muted)]"}`}
                      >
                        {s}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="py-24 flex justify-center items-center text-[var(--muted)]">
            <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin mr-3" />
            Loading Kids' Shoes...
          </div>
        ) : sorted.length === 0 ? (
          <div className="text-center py-20 px-6 border border-dashed border-[var(--border)] rounded-3xl bg-[var(--card-bg)] max-w-xl mx-auto my-8">
            <FiPackage size={44} className="mx-auto mb-3 text-amber-600 dark:text-amber-400 opacity-60" />
            <h3 className="text-lg font-bold text-[var(--text)] mb-1">No Kids' Shoes Added Yet</h3>
            <p className="text-sm text-[var(--muted)]">
              Admin panel se naya joota add karein, wo turant yahan live show hoga.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {sorted.map((item, i) => (
              <ProductCard key={item.id} item={item} i={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Kids;
