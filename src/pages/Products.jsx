import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiSearch, FiFilter, FiShoppingBag, FiCheck } from "react-icons/fi";
import { toast } from "react-toastify";
import api from "../utils/api";
import { useCart } from "../context/CartContext";
import { getImageUrl } from "../utils/imageUrl";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialKeyword = searchParams.get("keyword") || "";
  const initialCategory = searchParams.get("category") || "all";

  const [keyword, setKeyword] = useState(initialKeyword);
  const [category, setCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("featured");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const [selectedSizes, setSelectedSizes] = useState({});

  useEffect(() => {
    setKeyword(searchParams.get("keyword") || "");
    setCategory(searchParams.get("category") || "all");
  }, [searchParams]);

  useEffect(() => {
    const fetchShoes = async () => {
      setLoading(true);
      try {
        const queryParams = [];
        if (keyword) queryParams.push(`keyword=${encodeURIComponent(keyword)}`);
        if (category && category !== "all") queryParams.push(`category=${encodeURIComponent(category)}`);
        const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";

        const { data } = await api.get(`/products${queryString}`);
        setProducts(data || []);
      } catch (error) {
        console.error("Failed to load products", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchShoes();
  }, [keyword, category]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = {};
    if (keyword.trim()) params.keyword = keyword.trim();
    if (category !== "all") params.category = category;
    setSearchParams(params);
  };

  const handleCategoryChange = (newCat) => {
    setCategory(newCat);
    const params = {};
    if (keyword.trim()) params.keyword = keyword.trim();
    if (newCat !== "all") params.category = newCat;
    setSearchParams(params);
  };

  const handleAddToCart = (item) => {
    const size = selectedSizes[item._id] || (item.sizes && item.sizes[0]);
    if (!size) {
      toast.error("Please select a size first");
      return;
    }

    const success = addToCart({
      product: item._id,
      name: item.name,
      image: item.images && item.images.length > 0 ? item.images[0] : item.image,
      price: item.price,
      size,
      qty: 1,
    });
    if (success) {
      toast.success(`Added ${item.name} (Size ${size}) to cart!`);
    }
  };

  // Sorting
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    return 0; // featured
  });

  return (
    <div className="bg-[var(--bg)] text-[var(--text)] min-h-screen pt-28 sm:pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 border-b border-[var(--border)] pb-6 sm:pb-8">
          <div>
            <p className="text-xs uppercase font-bold tracking-widest text-[var(--muted)] mb-2">
              Next Trend Footwear
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
              {keyword ? `Search: "${keyword}"` : "All Footwear Collection"}
            </h1>
            <p className="text-xs sm:text-sm text-[var(--muted)] mt-1 sm:mt-2">
              Showing {sortedProducts.length} shoe styles available in store
            </p>
          </div>

          {/* Search bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center bg-[var(--card-bg)] border border-[var(--border)] rounded-full px-4 py-2.5 w-full md:w-80 shadow-sm"
          >
            <FiSearch size={16} className="text-[var(--muted)] mr-2.5 flex-shrink-0" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search sneakers, Nike, Air Max..."
              className="bg-transparent outline-none text-xs w-full text-[var(--text)] placeholder:text-[var(--muted)]"
            />
            {keyword && (
              <button
                type="button"
                onClick={() => {
                  setKeyword("");
                  setSearchParams(category !== "all" ? { category } : {});
                }}
                className="text-[var(--muted)] hover:text-[var(--text)] text-xs ml-2"
              >
                Clear
              </button>
            )}
          </form>
        </div>

        {/* Filter Badges & Sort Dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {["all", "Men", "Women", "Kids", "Running", "Casual", "Sports"].map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold capitalize transition-all ${
                  category.toLowerCase() === cat.toLowerCase()
                    ? "gradient-primary text-[#080808] shadow-md scale-105"
                    : "bg-[var(--card-bg)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)]"
                }`}
              >
                {cat === "all" ? "All Styles" : cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs text-[var(--muted)] font-semibold">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl px-3 py-1.5 text-xs text-[var(--text)] outline-none focus:border-[#83A4D4]"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-28 text-[var(--muted)]">
            <div className="w-10 h-10 border-4 border-[#83A4D4] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            Loading sneakers...
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="text-center py-24 bg-[var(--card-bg)] border border-[var(--border)] rounded-3xl p-8">
            <FiSearch size={48} className="mx-auto mb-4 text-[var(--muted)] opacity-40" />
            <h2 className="text-xl font-bold">No matching shoes found</h2>
            <p className="text-sm text-[var(--muted)] mt-1 max-w-md mx-auto">
              We couldn't find anything matching your search. Try checking your spelling or browsing all styles.
            </p>
            <button
              onClick={() => {
                setKeyword("");
                setCategory("all");
                setSearchParams({});
              }}
              className="mt-6 gradient-primary text-[#080808] px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider"
            >
              View All Shoes
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {sortedProducts.map((item, i) => {
              const imageSrc =
                item.images && item.images.length > 0
                  ? item.images[0]
                  : item.image || "/men1.png";
              const discount =
                item.originalPrice && item.originalPrice > item.price
                  ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
                  : 0;

              // Size selection for this card
              const currentSize =
                selectedSizes[item._id] || (item.sizes && item.sizes[0]);

              return (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="group bg-[var(--card-bg)] border border-[var(--border)] hover:border-[#83A4D4]/40 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl"
                >
                  <div>
                    {/* Shoe Image */}
                    <Link
                      to={
                        item.category?.toLowerCase() === "men"
                          ? `/men/${item.id || item._id}`
                          : item.category?.toLowerCase() === "women"
                          ? `/women/${item.id || item._id}`
                          : item.category?.toLowerCase() === "kids"
                          ? `/kids/${item.id || item._id}`
                          : `/men/${item.id || item._id}`
                      }
                      className="block relative aspect-square overflow-hidden bg-black/5"
                    >
                      <img
                        src={getImageUrl(imageSrc)}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = "/men1.png";
                        }}
                      />

                      {discount > 0 && (
                        <span className="absolute top-2.5 right-2.5 text-[9px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          -{discount}%
                        </span>
                      )}
                    </Link>

                    {/* Shoe Info */}
                    <div className="p-3.5 sm:p-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] mb-1">
                        {item.brand}
                      </p>
                      <h3 className="font-bold text-xs sm:text-sm text-[var(--text)] truncate">
                        {item.name}
                      </h3>

                      <div className="flex items-center gap-2 mt-2">
                        <span className="font-black text-sm text-[var(--text)]">
                          ₹{item.price?.toLocaleString()}
                        </span>
                        {item.originalPrice > item.price && (
                          <span className="text-xs text-[var(--muted)] line-through">
                            ₹{item.originalPrice?.toLocaleString()}
                          </span>
                        )}
                      </div>

                      {/* Sizes Selector */}
                      {item.sizes && item.sizes.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-[var(--border)]">
                          <p className="text-[10px] text-[var(--muted)] uppercase font-semibold mb-1.5">
                            Size (UK):
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {item.sizes.slice(0, 5).map((sz) => (
                              <button
                                key={sz}
                                type="button"
                                onClick={() =>
                                  setSelectedSizes((prev) => ({ ...prev, [item._id]: sz }))
                                }
                                className={`w-6 h-6 rounded-md text-[10px] font-bold transition-all ${
                                  currentSize === sz
                                    ? "bg-[var(--text)] text-[var(--bg)]"
                                    : "border border-[var(--border)] text-[var(--muted)] hover:border-[var(--text)]"
                                }`}
                              >
                                {sz}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Add to Cart button */}
                  <div className="p-3.5 sm:p-4 pt-0">
                    <button
                      type="button"
                      onClick={() => handleAddToCart(item)}
                      className="w-full flex items-center justify-center gap-1.5 gradient-primary text-[#080808] py-2 rounded-xl text-xs font-bold hover:scale-[1.02] transition-transform shadow-sm"
                    >
                      <FiShoppingBag size={13} /> Add to Cart
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
