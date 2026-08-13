import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiSearch, FiArrowLeft } from "react-icons/fi";
import { menProducts, womenProducts, kidsProducts } from "../data/products";

const dataMap = {
  men: menProducts,
  women: womenProducts,
  kids: kidsProducts,
};

const titleMap = {
  men: "Men's Shoes",
  women: "Women's Shoes",
  kids: "Kids' Shoes",
};

const Browse = ({ category }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const list = dataMap[category] || [];

  const filtered = list.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.brand.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bg-dark text-white min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <button
          onClick={() => navigate(`/${category}`)}
          className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors"
        >
          <FiArrowLeft size={16} /> Back to {titleMap[category]}
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold mb-6">Browse All {titleMap[category]}</h1>

          <div className="relative max-w-md">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or brand..."
              className="w-full bg-white/5 border border-white/10 rounded-full pl-12 pr-4 py-3 outline-none focus:border-white/30 text-sm placeholder:text-white/30"
            />
          </div>
        </motion.div>

        {filtered.length === 0 ? (
          <div className="text-center text-white/30 py-20">No products found.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Link to={`/${category}/${item.id}`} className="group block">
                  <div className="aspect-square bg-white/5 border border-white/10 rounded-2xl overflow-hidden mb-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <p className="text-white/40 text-xs uppercase tracking-wide mb-1">{item.brand}</p>
                  <h3 className="font-semibold text-sm truncate">{item.name}</h3>
                  <p className="font-bold">₹{item.price.toLocaleString()}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;