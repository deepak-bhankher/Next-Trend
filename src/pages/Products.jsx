import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../utils/api";
import ShoeCard from "../components/ShoeCard";

const categories = ["All", "Running", "Casual", "Sports", "Formal"];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "All";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const query = activeCategory !== "All" ? `?category=${activeCategory}` : "";
        const { data } = await api.get(`/products${query}`);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [activeCategory]);

  const handleCategoryClick = (cat) => {
    if (cat === "All") setSearchParams({});
    else setSearchParams({ category: cat });
  };

  return (
    <div className="bg-dark text-white min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <p className="uppercase tracking-[0.4em] gradient-text-primary text-xs mb-2 font-medium">Explore</p>
          <h1 className="text-4xl font-bold text-white">All Sneakers</h1>
        </motion.div>

        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "gradient-primary text-[#080808] font-bold accent-glow"
                  : "glass-btn text-white/50 hover:text-white hover:border-[#83A4D4]/25"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center text-white/30 py-20">Loading shoes...</div>
        ) : products.length === 0 ? (
          <div className="text-center text-white/30 py-20">No shoes found in this category.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <ShoeCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
