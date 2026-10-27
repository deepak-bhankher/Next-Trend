import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiBox,
  FiAlertTriangle,
  FiUser,
  FiHeart,
  FiSmile,
} from "react-icons/fi";
import { toast } from "react-toastify";
import api from "../../utils/api";
import { getImageUrl } from "../../utils/imageUrl";

const categoryMeta = {
  men: {
    title: "Men's Shoes Collection",
    icon: FiUser,
    tag: "Men",
    addText: "Add Men Shoes",
  },
  women: {
    title: "Women's Shoes Collection",
    icon: FiHeart,
    tag: "Women",
    addText: " Add Women Shoes",
  },
  kids: {
    title: "Kids' Shoes Collection",
    icon: FiSmile,
    tag: "Kids",
    addText: " Add Kids Shoes",
  },
};

const AdminCategoryShoes = () => {
  const { category = "men" } = useParams();
  const meta = categoryMeta[category.toLowerCase()] || categoryMeta.men;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const fetchCategoryProducts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/products?category=${meta.tag}`);
      setProducts(data);
    } catch (error) {
      toast.error(`Failed to load ${meta.tag} products`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryProducts();
  }, [category]);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}" from ${meta.tag} collection?`)) {
      return;
    }

    setDeletingId(id);
    try {
      await api.delete(`/products/${id}`);
      toast.success("Shoe deleted successfully");
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredProducts = products.filter((item) => {
    const term = search.toLowerCase();
    return (
      item.name.toLowerCase().includes(term) ||
      item.brand.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            {meta.icon && (
              <div className="p-2 rounded-xl bg-gradient-to-br from-[#83A4D4]/20 to-[#A1FFCE]/20 text-[#A1FFCE]">
                <meta.icon size={22} />
              </div>
            )}
            <h1 className="text-3xl font-extrabold tracking-tight">{meta.title}</h1>
          </div>
          <p className="text-[var(--muted)] text-sm mt-1">
            Manage pricing, inventory, and styles exclusively for {meta.tag} ({products.length} items)
          </p>
        </div>

        <Link
          to={`/admin/category/${category}/new`}
          className="inline-flex items-center justify-center gap-2 gradient-primary text-[#080808] px-5 py-3 rounded-xl font-bold text-sm hover:scale-105 transition-transform shadow-md shadow-[#83A4D4]/20"
        >
          <FiPlus size={18} /> {meta.addText}
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <FiSearch
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
          size={17}
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Search ${meta.tag} shoes by name or brand...`}
          className="w-full bg-[var(--card-bg)] border border-[var(--border)] rounded-xl pl-11 pr-4 py-2.5 outline-none focus:border-[#83A4D4]/60 text-sm text-[var(--text)] placeholder:text-[var(--muted)] transition-colors"
        />
      </div>

      {/* Shoes Table */}
      <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="text-center py-20 text-[var(--muted)] text-sm">
            <div className="w-8 h-8 border-3 border-[#83A4D4] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            Loading {meta.tag} shoes...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 px-6">
            <FiBox size={44} className="mx-auto mb-3 text-[var(--muted)] opacity-50" />
            <h3 className="font-bold text-base">No {meta.tag} shoes found in database</h3>
            <p className="text-xs text-[var(--muted)] mt-1 max-w-sm mx-auto">
              {search
                ? "No shoes match your search term."
                : `You haven't uploaded any shoes to the ${meta.tag} section yet.`}
            </p>
            <Link
              to={`/admin/category/${category}/new`}
              className="inline-flex items-center gap-2 gradient-primary text-[#080808] px-4 py-2 rounded-xl text-xs font-bold mt-4"
            >
              <FiPlus /> {meta.addText}
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[var(--bg)] border-b border-[var(--border)] text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Shoe</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Stock</th>
                  <th className="py-3.5 px-4">Available Sizes</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                <AnimatePresence>
                  {filteredProducts.map((p) => {
                    const isOutOfStock = (p.countInStock || 0) <= 0;
                    const isLowStock = !isOutOfStock && p.countInStock <= 5;
                    const imageSrc =
                      p.images && p.images.length > 0 ? p.images[0] : "/men1.png";

                    return (
                      <motion.tr
                        key={p._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, height: 0 }}
                        className="hover:bg-white/[0.02] transition-colors"
                      >
                        {/* Thumbnail & Title */}
                        <td className="py-3.5 px-4 sm:px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-[var(--bg)] border border-[var(--border)] overflow-hidden flex-shrink-0">
                              <img
                                src={getImageUrl(imageSrc)}
                                alt={p.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = "/men1.png";
                                }}
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-sm truncate max-w-[180px] sm:max-w-xs">
                                {p.name}
                              </p>
                              <p className="text-[11px] text-[var(--muted)] uppercase font-medium">
                                {p.brand}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Price */}
                        <td className="py-3.5 px-4 font-bold text-sm">
                          <div>
                            ₹{p.price?.toLocaleString()}
                            {p.originalPrice > p.price && (
                              <span className="ml-1.5 text-xs text-[var(--muted)] line-through font-normal">
                                ₹{p.originalPrice?.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Stock */}
                        <td className="py-3.5 px-4">
                          {isOutOfStock ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full">
                              <FiAlertTriangle size={11} /> Out of stock
                            </span>
                          ) : isLowStock ? (
                            <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                              Only {p.countInStock} left
                            </span>
                          ) : (
                            <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                              {p.countInStock} in stock
                            </span>
                          )}
                        </td>

                        {/* Sizes */}
                        <td className="py-3.5 px-4">
                          <div className="flex flex-wrap gap-1 max-w-[140px]">
                            {p.sizes && p.sizes.length > 0 ? (
                              p.sizes.map((s) => (
                                <span
                                  key={s}
                                  className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-[var(--bg)] border border-[var(--border)]"
                                >
                                  {s}
                                </span>
                              ))
                            ) : (
                              <span className="text-xs text-[var(--muted)]">-</span>
                            )}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              to={`/admin/category/${category}/edit/${p._id}`}
                              className="p-2 rounded-lg border border-[var(--border)] hover:border-[#83A4D4]/50 hover:bg-[#83A4D4]/10 text-[var(--muted)] hover:text-[#83A4D4] transition-colors"
                              title="Edit Shoe"
                            >
                              <FiEdit2 size={15} />
                            </Link>

                            <button
                              onClick={() => handleDelete(p._id, p.name)}
                              disabled={deletingId === p._id}
                              className="p-2 rounded-lg border border-[var(--border)] hover:border-red-500/50 hover:bg-red-500/10 text-[var(--muted)] hover:text-red-400 transition-colors disabled:opacity-50"
                              title="Delete Shoe"
                            >
                              <FiTrash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCategoryShoes;
